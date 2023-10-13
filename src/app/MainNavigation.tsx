import { NavLink } from "react-router-dom";
import Search from "../components/MainNavigation/Search";
import Tagbar from "../components/General-UI/Tagbar";

const MainNavigation = () => {
  return (
    <>
      <header className="w-full p-3 text-center text-indigo-600 bg-indigo-200 h-fit md:py-4 lg:py-6">
        Your <span className="font-semibold underline">One-Stop Shop</span> for
        Endless Possibilities
      </header>
      <nav className="w-full gap-6 px-4 py-6 bg-white h-fit md:px-6 lg:px-10">
        <section className="flex flex-row items-center justify-between w-full">
          <section className="flex flex-row items-center w-full gap-6">
            <NavLink
              to="./"
              className="text-2xl font-bold text-transparent bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 bg-clip-text"
            >
              SAVVY
            </NavLink>
            <Search />
          </section>
        </section>
      </nav>
      <Tagbar />
    </>
  );
};

export default MainNavigation;
