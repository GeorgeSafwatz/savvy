import { motion } from "framer-motion";
import { SearchIcon } from "../../assets/icons/icons";
const Search = () => {
  const submitHandler = () => {};
  return (
    <form
      onSubmit={submitHandler}
      className="w-full overflow-hidden rounded-md relative"
    >
      <motion.input
        type="text"
        className="relative focus:outline-none bg-slate-100 text-black font-medium border-2 focus:border-indigo-400 px-2 py-3 w-full peer "
        id="search"
        name="search"
        required
        initial={{
          borderImage:
            "linear-gradient(to bottom right, #f050ff, #00f2ff, #7300ff)",
          borderImageSlice: 1,
          borderImageWidth: "3px",
          borderImageOutset: 0,
          borderRadius: "8px",
        }}
        animate={{
          borderImage:
            "linear-gradient(to bottom right, #7650ff, #ffbb00, #aa00ff)",
          borderImageSlice: 1,
          borderImageWidth: "3px",
          borderImageOutset: 0,
          borderRadius: "8px",
        }}
        whileFocus={{
          borderImage:
            "linear-gradient(to bottom right , #9c81ff, #9c81ff, #9c81ff)",
          borderImageSlice: 1,
          borderImageWidth: "3px",
          borderImageOutset: 0,
          borderRadius: "10px",
          transition: {
            duration: 1,
          },
        }}
        transition={{
          duration: 2.25,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
      <motion.div
        className="absolute flex flex-col gap-7 md:gap-6 top-4 md:top-3 left-3 font-medium text-slate-500 peer-focus:hidden cursor-text text-sm md:text-base"
        initial={{ y: 0 }}
        animate={{ y: [0, -48, -48, -48 * 2] }}
        transition={{
          duration: 3,
          delay: 2.5,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 1.5,
        }}
      >
        <label htmlFor="search">Discover Great Deals</label>
        <label htmlFor="search">Search for Your Next Purchase</label>
        <label
          htmlFor="search"
          className="w-72 md:w-full text-ellipsis overflow-hidden whitespace-nowrap"
        >
          Search for Brands, Products, and More
        </label>
      </motion.div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-50 hover:bg-slate-200 reflect scale-x-[-1] focus:ring-2 focus:ring-indigo-400"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
