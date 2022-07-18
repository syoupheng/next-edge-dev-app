const Loader = ({ show }) => {
  return (
    show && (
      <div className="w-10 h-10 border-8 border-blue-500 rounded-full border-t-transparent animate-spin mx-auto my-4"></div>
    )
  );
}

export default Loader;