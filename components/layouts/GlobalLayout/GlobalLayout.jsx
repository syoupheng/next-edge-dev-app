import Footer from "../../Footer";
import Navbar from "../../Navigation/Navbar";

const GlobalLayout = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="pt-20 pb-10 bg-gray-100 grow shrink-0 basis-auto">{children}</main>
      <Footer />
    </div>
  );
}
 
export default GlobalLayout;