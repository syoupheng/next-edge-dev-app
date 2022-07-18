import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../../utils/userContext';

// Component's children only shown to logged-in users
const AuthCheck = ({ children, fallback }) => {
  const { username } = useContext(UserContext);

  return username
    ? children
    : fallback || (
        <div className='flex justify-center mt-8'>
          <Link href="/enter">
            <button className="btn">You must be signed in</button>
          </Link>
        </div>
      );
}

export default AuthCheck;