import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="px-4 py-4 md:px-6 lg:px-10">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
