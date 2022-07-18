import GlobalLayout from '../components/layouts/GlobalLayout';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../utils/userContext';
import { useUserData } from '../utils/hooks/useUserData';

const MyApp = ({ Component, pageProps }) => {
  // const userData = useUserData();
  return (
    <UserContext.Provider value={{ user: null, username: null }}>
      <GlobalLayout>
        <Component {...pageProps} />
        <Toaster />
      </GlobalLayout>
    </UserContext.Provider>
  );
}

export default MyApp
