import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect } from "react";
import CreatePostForm from "../../components/admin/CreatePostForm";
import PostList from "../../components/admin/PostList";
import AuthCheck from "../../components/auth/AuthCheck";
import { UserContext } from "../../utils/userContext";

const AdminPostsPage = () => {
  return (
    <AuthCheck>
      <div className="container mx-auto px-52">
        <PostList />
        <CreatePostForm />
      </div>
    </AuthCheck>
  );
}
 
export default AdminPostsPage;