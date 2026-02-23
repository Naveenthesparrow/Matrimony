const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };
  
  const loader = (
    <div className={`spinner ${sizes[size]} border-4`}></div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center p-8">
      {loader}
    </div>
  );
};

export default Loader;
