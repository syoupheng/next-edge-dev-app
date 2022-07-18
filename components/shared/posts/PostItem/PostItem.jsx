import Link from 'next/link';
import Image from 'next/image';

const PostItem = ({ post, admin = false }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  return (
    <div className="mb-2 bg-white p-4 border border-gray-200 rounded-lg">
      <Link href={`/${post.username}`}>
        <a className="flex items-center mb-2">
          <Image
            className="rounded-full"
            width="30px"
            height="30px"
            src={"/hacker.png"}
            alt="Profile picture"
          />
          <span className="ml-2">By @{post.username}</span>
        </a>
      </Link>
      <div className="pl-10">
        <Link href={`/${post.username}/${post.slug}`}>
          <h2 className="font-bold text-2xl mb-2 hover:text-indigo-800 cursor-pointer">
            <a>{post.title}</a>
          </h2>
        </Link>

        <footer className='mb-2'>
          <span className="text-sm text-gray-500 mr-2">
            {wordCount} words. {minutesToRead} min read
          </span>
          <span className="text-sm text-gray-500">
            💗 {post.heartCount || 0} Hearts
          </span>
        </footer>

        {/* If admin view, show extra controls for user */}
        {admin && (
          <div className='flex justify-between items-center'>
            <Link href={`/admin/${post.slug}`}>
              <button className="btn">Edit</button>
            </Link>

            {post.published ? (
              <p className="text-success font-bold">Live</p>
            ) : (
              <p className="text-red-600 font-bold">Unpublished</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
 
export default PostItem;