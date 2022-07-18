import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../../utils/firebase';
import Image from "next/image";

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="btn bg-white text-gray-600 border-0 hover:bg-gray-400"
        onClick={signInWithGoogle}
      >
        <Image
          className="rounded-full"
          width="30px"
          height="30px"
          src={"/google.png"}
          alt="Google logo"
        />
        <span className='ml-2'>Sign in with Google</span>
      </button>
      {/* <button className='btn bg-red-400 border-red-400' onClick={() => signInAnonymously(auth)}>
        Sign in Anonymously
      </button> */}
    </div>
  );
}
 
export default SignInButton;