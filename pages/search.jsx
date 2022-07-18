import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/shared/Loader";
import PostFeed from "../components/shared/posts/PostFeed/PostFeed";
import { index } from "../utils/algoliasearch";

const SearchPage = () => {
  const [posts, setPosts] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { q: query } = router.query;

  useEffect(() => {
    if (query) {
      setLoading(true);
      index.search(query)
      .then(({ hits }) => {
        console.log(hits);
        setLoading(false);
        setPosts(hits);
      })
      .catch((err) => {
        console.error(err.message);
        setLoading(false);
        setError(err.message);
      });
    }
  }, [query]);

  if (loading) return <Loader show />;

  if (error) return (
    <div className="container pt-6 px-52 mx-auto">
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error ! {error}</span>
        </div>
      </div>
    </div>
  );

  return posts && (
    <div className="container pt-6 px-52 mx-auto">
      <h2>You searched &quot;{query}&quot; : {posts.length || "No"} results</h2>
      <PostFeed posts={posts} />
    </div>
  );
}
 
export default SearchPage;