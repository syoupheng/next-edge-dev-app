import Image from "next/image";

const UserProfile = ({ user }) => {
  return (
    <div className="mb-4">
      <div className="w-fit mx-auto">
        <Image
          alt="Profile picture"
          src={"/hacker.png"}
          width="170px"
          height="170px"
        />
      </div>
      <p className="text-center mt-2">
        <i>@{user.username}</i>
      </p>
      <h1 className="text-center font-bold">{user.displayName}</h1>
    </div>
  );
}
 
export default UserProfile;