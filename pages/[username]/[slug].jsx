import { useRouter } from 'next/router';
import Loader from '../../components/shared/Loader';
import PostContent from '../../components/shared/posts/PostContent';
import { getUserWithUsername, postToJSON } from '../../utils/firebase';
import { doc, getDocs, getDoc, collectionGroup, query, limit, getFirestore } from 'firebase/firestore';
import MetaTags from '../../components/shared/seo/MetaTags';

export const getStaticPaths = async () => {
  const q = query(
    collectionGroup(getFirestore(), 'posts'),
    limit(10)
  )
  const snapshot = await getDocs(q);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;

  if (userDoc) {
    const postRef = doc(getFirestore(), userDoc.ref.path, 'posts', slug);
    post = postToJSON(await getDoc(postRef) );
  }

  if (!post || post.createdAt === 0) {
    return { notFound: true };
  }

  return {
    props: { post },
    // revalidate: 100,
  };
}

const PostPage = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader show />
  }

  // const { user: currentUser } = useContext(UserContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 container mx-auto pt-2">
      <MetaTags title={post.title} description={post.title} />
      <section className="bg-white bord border border-gray-200 rounded-lg px-16 py-10 col-span-3 mb-4 md:mb-0">
        <PostContent post={post} />
      </section>
      <aside className="col-span-1 w-full">
        <div className="bg-white bord border border-gray-200 rounded-lg py-4 px-4 flex flex-col items-center justify-center md:fixed md:min-w-[23%]">
          <p className="mb-4">
            <strong>{post.heartCount || 0} 🤍</strong>
          </p>
          <button className="btn">Follow</button>
        </div>
      </aside>

      {/* <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button className="btn-blue">Edit Post</button>
          </Link>
        )}
      </aside> */}
    </div>
  );
}
 
export default PostPage;