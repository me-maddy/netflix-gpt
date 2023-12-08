const Footer = () => {
  return (
    <footer className="absolute lg:gap-x-16 md:gap-x-12 gap-x-2 min-[450px]:gap-x-4 sm:gap-x-6 pl-4 min-[450px]:pl-8 sm:pl-28 py-3 lg:py-4 text-xs min-[450px]:text-base sm:text-lg text-slate-400 flex w-full bottom-0 items-center left-0 bg-black bg-opacity-70 min-[450px]:pr-0 pr-2">
      <h3 className="text-red-600 sm:w-4/12 font-bold lg:w-6/12 text-base min-[450px]:text-lg sm:text-xl mr-[3%] sm:mr-0">
        Netflix India
      </h3>
      <p className="cursor-pointer">Help Center</p>
      <p className="cursor-pointer">Terms of Use</p>
      <p className="cursor-pointer">Privacy</p>
    </footer>
  );
};

export default Footer;
