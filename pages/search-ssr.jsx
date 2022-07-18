import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import axios from "axios";
import PostFeed from "../components/shared/posts/PostFeed/PostFeed";

export const config = {
  runtime: 'experimental-edge',
};

export const getServerSideProps = async ({ query }) => {
  console.log(process.env.NEXT_RUNTIME);
  // const algoliasearch = require("algoliasearch");

  // const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);
  // const index = client.initIndex("your_index_name");
  const { q } = query;
  if (query) {
    const axiosInstance = axios.create({
      adapter: fetchAdapter
    });

    const { data } = await axiosInstance.get(`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/posts?query=${q}`, {
      headers: {
        'X-Algolia-API-Key': process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
        'X-Algolia-Application-Id': process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
      }
    });
    
    return {
      props: {
        posts: data.hits,
        query: q
      }
    }
  }
}

const SearchPageSsr = ({ posts, query }) => {
  return posts && (
    <div className="container pt-6 px-52 mx-auto">
      <h2>You searched &quot;{query}&quot; : {posts.length || "No"} results</h2>
      <PostFeed posts={posts} />
    </div>
  );
}
 
export default SearchPageSsr;