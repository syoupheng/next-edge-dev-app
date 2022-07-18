import PostFeed from "../../shared/posts/PostFeed";
import { collection, getFirestore, query, orderBy } from "firebase/firestore";
import { auth } from "../../../utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const PostList = () => {
  let ref;
  let postQuery;
  if (auth.currentUser) {
    ref = collection(getFirestore(), "users", auth.currentUser?.uid, "posts");
    postQuery = query(ref, orderBy("createdAt"));
  }

  const [querySnapshot] = useCollection(postQuery);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4 mt-2">
        Manage your Posts
      </h1>
      <PostFeed posts={posts} admin />
    </>
  );
};

export default PostList;
