import { auth } from '../../../utils/firebase';
import { signOut } from 'firebase/auth';

const SignOutButton = () => {
  return <button className="btn bg-green-400" onClick={() => signOut(auth)}>Sign Out</button>;
}
 
export default SignOutButton;