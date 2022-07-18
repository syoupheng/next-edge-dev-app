import PostFeed from '../components/shared/posts/PostFeed';
import Loader from '../components/shared/Loader';
import { postToJSON } from '../utils/firebase';
import { Timestamp, query, where, orderBy, limit, collectionGroup, getDocs, startAfter, getFirestore } from 'firebase/firestore';

import { useState } from 'react';
import MetaTags from '../components/shared/seo/MetaTags';
import { useEffect } from 'react';
import { useRef } from 'react';
import useOnScreen from '../utils/hooks/useOnScreen';

// Max post to query per page
const LIMIT = 5;

export const config = {
  runtime: 'experimental-edge',
};

export const getServerSideProps = async () => {
  console.log(process.env.NEXT_RUNTIME);
  const ref = collectionGroup(getFirestore(), 'posts');
  const postsQuery = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT),
  )

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
 
  return {
    props: { posts },
  };
}

const HomePage = ({ posts }) => {
  const [postList, setPostList] = useState(posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const ref = useRef();
  const atBottom = useOnScreen(ref);

  // Get next page in pagination query
  const getMorePosts = async () => {
    if (!postsEnd && postList?.length >= LIMIT) {
      setLoading(true);
      const last = postList[postList.length - 1];

      const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

      const ref = collectionGroup(getFirestore(), 'posts');
      const postsQuery = query(
        ref,
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        startAfter(cursor),
        limit(LIMIT),
      )

      const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

      setPostList([...postList, ...newPosts]);
      setLoading(false);

      if (newPosts.length < LIMIT) {
        setPostsEnd(true);
      }
    }
  };

  useEffect(() => {
    if (atBottom) {
      getMorePosts();
    }
  }, [atBottom]);

  return (
    <>
      <MetaTags
        title="Home Page"
        description="Get the latest posts on our site"
      />
      <div className="container pt-6 px-52 mx-auto">
        <PostFeed posts={postList} />
        {!postsEnd && (
          <div className="flex justify-center mt-6">
            <button ref={ref} onClick={getMorePosts} className="btn">Suivant</button>
          </div>
        )}
        <Loader show={loading} />
        {postsEnd && <p className='text-center mt-6 font-bold'>You have reached the end!</p>}
      </div>
    </>
  );
}

export default HomePage;
