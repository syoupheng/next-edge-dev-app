import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

const PostContent = ({ post }) => {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div>
      <div>
        <Link href={`/${post.username}/`}>
          <a className="flex items-center mb-2 group">
            <Image
              className="rounded-full"
              width="30px"
              height="30px"
              src={"/hacker.png"}
              alt="Profile picture"
            />
            <span className='ml-2'>
              <p className="font-bold text-sm group-hover:text-indigo-800">By @{post.username}</p>
              <p className="text-xs font-light text-gray-400">
                posted on {createdAt.toISOString().slice(0, 10)}
              </p>
            </span>
          </a>
        </Link>
      </div>
      <h1 className="font-bold text-5xl leading-[4rem] mb-4">{post?.title}</h1>
      <ReactMarkdown className="text-xl font-light leading-8">
        {post?.content}
      </ReactMarkdown>
    </div>
  );
}
 
export default PostContent;