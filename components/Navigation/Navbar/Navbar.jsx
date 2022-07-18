import Link from 'next/link';
import Image from 'next/image';
import BrandLogo from '../../../public/dev-ecosystem.svg';
import { useContext } from 'react';
import { UserContext } from '../../../utils/userContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import Searchbar from '../Searchbar';

const Navbar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="shadow-sm fixed top-0 left-0 right-0 bg-white z-10">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="flex items-center">
          <Link href="/">
            <a className="h-12 mr-6">
              <Image
                src={BrandLogo}
                alt="Dev unofficial logo"
                width={50}
                height={50}
              />
            </a>
          </Link>
          <Searchbar />
          {/* <input
              className="input border-r-0 border-gray-300 text-lg font-light"
              type="text"
              placeholder="Search..."
            />
            <FiSearch /> */}
        </div>
        {username && (
          <div className="flex items-center">
            <Link href="/home-isr">
              <button className="mr-2 btn btn-outline">Home ISR</button>
            </Link>
            <button onClick={() => signOut(auth)} className="btn mr-3">
              Sign Out
            </button>
            <Link href="/admin">
              <button className="btn mr-4 bg-blue-500 text-white hover:bg-blue-600 border-0">
                Write Posts
              </button>
            </Link>
            <Link href={`/${username}`}>
              <a>
                <Image
                  src={"/hacker.png"}
                  className="rounded-full"
                  width="40px"
                  height="40px"
                  alt="Profile picture"
                />
              </a>
            </Link>
          </div>
        )}
        <div>
          {!username && (
            <div>
              <Link href="/home-isr">
                <button className="mr-2 btn btn-outline">Home ISR</button>
              </Link>
              <Link href="/enter">
                <button className="btn bg-transparent text-gray-600 border-0 normal-case font-light text-base hover:text-indigo-500 hover:bg-indigo-100 hover:underline">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;