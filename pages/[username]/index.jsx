import { collection, getDocs, getFirestore, limit, orderBy, where, query } from "firebase/firestore";
import PostFeed from "../../components/shared/posts/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJSON } from "../../utils/firebase";
import MetaTags from "../../components/shared/seo/MetaTags";

export const config = {
  runtime: 'experimental-edge',
};

export const getServerSideProps = async (context) => {
  console.log(process.env.NEXT_RUNTIME);
  const { username } = context.query;
  const userDoc = await getUserWithUsername(username);
  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();

    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }
  }
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <>
      <MetaTags
        title={user.username}
        description={`${user.username}'s public profile`}
      />
      <div className="container pt-6 px-52 mx-auto">
        <UserProfile user={user} />
        <PostFeed posts={posts} />
      </div>
    </>
  );
}
 
export default UserProfilePage;