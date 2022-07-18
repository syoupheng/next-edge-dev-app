import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import SignInButton from "../components/auth/SignInButton";
import SignOutButton from "../components/auth/SignOutButton";
import UsernameForm from "../components/auth/UsernameForm";
import { UserContext } from "../utils/userContext";
import Loader from '../components/shared/Loader'

const LoginPage = () => {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user && username) {
      router.push('/');
    }
  }, [user, username]);

  return (
    <div className="container mx-auto flex justify-center pt-8">
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <Loader show />
        )
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export default LoginPage;