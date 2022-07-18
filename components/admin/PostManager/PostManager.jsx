import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../../utils/firebase";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import EditPostForm from "../EditPostForm";
import Link from "next/link";

const PostManager = () => {
  const [preview, setPreview] = useState(false);

  const router = useRouter();
  const { slug } = router.query;
  
  let post;
  let postRef;
  if (auth.currentUser) {
    postRef = doc(getFirestore(), "users", auth.currentUser.uid, "posts", slug);
  }

  [post] = useDocumentData(postRef);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 container mx-auto pt-2">
      {post && postRef && (
        <>
          <section className="bg-white bord border border-gray-200 rounded-lg px-16 py-10 col-span-3 mb-4 md:mb-0">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="mb-2">ID: {post.slug}</p>

            <EditPostForm post={post} postRef={postRef} preview={preview} />
          </section>

          <aside className="col-span-1 w-full">
            <div className="bg-white bord border border-gray-200 rounded-lg py-8 px-4 flex flex-col items-center justify-center md:fixed md:min-w-[23%]">
              <h3 className="text-lg font-bold mb-2">Tools</h3>
              <button className="btn w-5/6 mb-2" onClick={() => setPreview(!preview)}>
                {preview ? "Edit" : "Preview"}
              </button>
              <Link href={`/${post.username}/${post.slug}`}>
                <button className="btn bg-blue-500 text-white hover:bg-blue-600 border-0 w-5/6">
                  Live view
                </button>
              </Link>
              {/* <DeletePostButton postRef={postRef} /> */}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
 
export default PostManager;