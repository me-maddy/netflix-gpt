import Header from "./Header";

const Browse = () => {
  return (
    <div className="w-full relative">
      <Header browse={true} />
      <div>
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="bg_Img"
        />
      </div>
    </div>
  );
};

export default Browse;
