import PostManager from "../../components/admin/PostManager";
import AuthCheck from "../../components/auth/AuthCheck";

const AdminPostEdit = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}
 
export default AdminPostEdit;