import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from '../../../utils/userContext';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { serverTimestamp, doc, getFirestore, setDoc } from 'firebase/firestore';
import { auth } from '../../../utils/firebase';

const CreatePostForm = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = doc(getFirestore(), 'users', uid, 'posts', slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    try {
      await setDoc(ref, data);
      toast.success('Post created!');
      router.push(`/admin/${slug}`);
      // const res = await fetch(`/api/revalidate-home-isr?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`);
      // const msg = await res.json();
      // console.log('isr revalidation : ', msg);
    } catch (err) {
      console.error(err);
      toast.error(`Something went wrong...`);
    }
  };

  return (
    <form onSubmit={createPost}>
      <h2 className='text-2xl font-bold mb-4 mt-4'>Add a new post</h2>
      <div className='flex'>
        <input
          className="input input-bordered mr-2 mb-2 basis-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Article!"
        />
        <button
          type="submit"
          disabled={!isValid}
          className="btn bg-blue-500 text-white hover:bg-blue-600 border-0"
        >
          Create New Post
        </button>
      </div>
      <p>
        <strong>Slug:</strong> {slug}
      </p>
    </form>
  );
}
 
export default CreatePostForm;