const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" z-20 xl:pt-52 sm:pt-24 pt-16  lg:pt-36 md:px-12 px-5 sm:px-8 lg:px-16 absolute text-white">
      <h1 className="lg:text-6xl text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-0">
        {title}
      </h1>
      <p className="lg:text-base text-sm w-1/2 hidden sm:block sm:w-[46%] xl:w-1/3 my-1.5 sm:my-3 lg:my-4 font-medium">
        {overview}
      </p>
      <div>
        <button className="bg-white text-black py-1 lg:py-2 px-4  lg:px-6 mr-3 sm:mr-6 sm:text-base text-sm md:text-lg rounded font-medium hover:opacity-70 transition-opacity duration-200 ease-in">
          Play
        </button>
        <button className="text-white bg-gray-500 bg-opacity-60 py-1 lg:py-2 px-4 lg:px-6 text-sm sm:text-base md:text-lg rounded font-medium hover:opacity-70 transition-opacity duration-200 ease-in">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
