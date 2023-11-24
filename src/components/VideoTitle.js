const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" z-20 pt-52 px-16 absolute text-white">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="text-base w-1/3 my-4 font-medium">{overview}</p>
      <div>
        <button className="bg-white text-black py-2 px-6 mr-6 text-lg rounded font-medium">
          ▶ Play
        </button>
        <button className="text-white bg-gray-500 bg-opacity-60 py-2 px-6 text-lg rounded font-medium">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
