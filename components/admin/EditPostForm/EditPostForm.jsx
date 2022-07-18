import { useForm } from 'react-hook-form';
import { updateDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { useState } from 'react';

const EditPostForm = ({ post, postRef, preview }) => {
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues: post
  });
  const { isValid, isDirty, errors } = formState;
  const router = useRouter();

  const [revalidating, setRevalidating] = useState(false);
  const updatePost = async ({ content, published }) => {
    try {
      await updateDoc(postRef, {
        content,
        published,
        updatedAt: serverTimestamp(),
      });
      toast.success('Post updated successfully!');
      setRevalidating(true);
      if (!post.published && published) {
        await Promise.all([
          fetch(`/api/revalidate-home-isr?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`),
          fetch(`/api/revalidate-post/${post.username}/${post.slug}?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`)
        ]);
        console.log("revalidated twice !");
      } else {
        const res = await fetch(`/api/revalidate-post/${post.username}/${post.slug}?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`);
        const msg = await res.json();
        console.log(msg);
      }
      setRevalidating(false);
      // router.push(`/${post.username}/${post.slug}`);
    } catch (err) {
      toast.error('Something went wrong...');
      console.error(err);
      setRevalidating(false);
    }
  };

  // useEffect(() => {
  //   const revalidatePost = async () => {
  //     try {
        
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }

  //   if (formState.isSubmitSuccessful) {
  //     revalidatePost()
  //     .then(() => {
  //       router.push(`/${post.username}/${post.slug}`);
  //     })
  //     toast.success('Post updated successfully!');
  //   }
  // }, [formState]);

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="my-4 preview-container">
          <ReactMarkdown>{watch("content")}</ReactMarkdown>
        </div>
      )}

      <div>
        {/* <ImageUploader /> */}

        <textarea
          className={`textarea textarea-bordered w-full text-xl mb-4 h-80 ${
            errors.content && "border-red-600"
          }`}
          name="content"
          {...register("content", {
            maxLength: { value: 20000, message: "content is too long" },
            minLength: { value: 10, message: "content is too short" },
            required: "content is required",
          })}
        />

        {errors.content && (
          <p className="text-red-600">{errors.content.message}</p>
        )}

        <div className="form-control mb-4">
          <label className="label cursor-pointer flex justify-start">
            <input
              type="checkbox"
              className="checkbox mr-2 text-blue-500"
              name="published"
              {...register("published")}
            />
            <span className="label-text">Published</span>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn"
            disabled={!isDirty || !isValid || revalidating}
          >
            {revalidating ? "Revalidating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
 
export default EditPostForm;