import { NavLink } from "react-router-dom";
import Search from "../components/MainNavigation/Search";
import Tagbar from "../components/General-UI/Tagbar";
import { useUserFn } from "../hooks/useUserFn";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import Button from "../components/General-UI/Button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../main";
import { setUser } from "../context/userSlice";
import { setSearchTerm } from "../context/searchTermSlice";
import { setNetwork } from "../context/networkSlice";
import Toast from "../components/General-UI/Toast";
import Menu from "../components/MainNavigation/Menu";
import CartContainer from "../components/MainNavigation/CartContainer";

const MainNavigation = () => {
  const { authChange, logout } = useUserFn();
  const user = useSelector((state: RootState) => state.user);
  const online = useSelector((state: RootState) => state.network);
  const action = useDispatch();
  const path = window.location.pathname;
  useEffect(() => {
    const getUser = (data: {
      auth: string;
      uid: string;
      displayName: string;
    }) => {
      action(
        setUser({
          auth: data.auth,
          uid: data.uid,
          displayName: data.displayName,
        })
      );
    };
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const data = {
          auth: token,
          uid: user.uid,
          displayName: user.displayName as string,
        };
        getUser(data);
      }
    });
    authChange();
  }, [action, authChange]);

  useEffect(() => {
    function changeStatus() {
      action(setNetwork({ online: navigator.onLine }));
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    console.log(navigator.onLine);
    console.log(online.online);

    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, [action, navigator.onLine]);

  return (
    <>
      <header
        id="nav"
        className="w-full p-2 text-center text-indigo-600 transition-all duration-150 bg-indigo-200 h-fit md:py-3 lg:py-4 lg:text-lg"
      >
        Your <span className="font-semibold underline">One-Stop Shop</span> for
        Endless Possibilities {online.online && "You are online"}
      </header>
      <nav className="w-full gap-6 px-4 py-6 bg-white h-fit md:px-6 lg:px-10">
        <section className="flex flex-row items-center justify-between w-full">
          <section className="flex flex-col items-start w-full gap-6 md:flex-row md:justify-between md:items-center">
            <section className="flex flex-row justify-between w-full md:w-fit">
              <div className="flex flex-row gap-4">
                <Menu />
                <NavLink
                  to="./"
                  className="text-2xl font-bold text-transparent bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400 bg-clip-text"
                >
                  SAVVY
                </NavLink>
              </div>
              <div className="flex flex-row gap-4 md:hidden">
                <CartContainer />
              </div>
            </section>
            <Search />
            <section className="flex-row items-center hidden gap-3 md:flex whitespace-nowrap">
              {user.auth === "" ? (
                <>
                  <NavLink
                    to={"/auth/login"}
                    className="px-4 py-2 text-base font-medium transition-all duration-150 rounded-full focus:ring-2 bg-slate-50 hover:bg-slate-200 ring-indigo-400 focus:outline-none lg:px-5 lg:py-3 md:text-lg"
                    state={{ path: path }}
                    onClick={() => action(setSearchTerm(""))}
                  >
                    login
                  </NavLink>
                  <NavLink
                    onClick={() => action(setSearchTerm(""))}
                    to={"auth/signup"}
                    className="px-4 py-2 text-base font-medium transition-all duration-150 rounded-full focus:ring-2 bg-slate-50 hover:bg-slate-200 ring-indigo-400 focus:outline-none lg:px-5 lg:py-3 md:text-lg"
                    state={{ path: path }}
                  >
                    Sign up
                  </NavLink>
                </>
              ) : (
                <>
                  <Button clickHandler={() => logout()}>Logout</Button>

                  {user.displayName && (
                    <p className="font-semibold md:text-lg">
                      Welcome, {user.displayName.split(" ")[0]}
                    </p>
                  )}
                </>
              )}
              <CartContainer />
            </section>
          </section>
        </section>
      </nav>
      <Tagbar />
      {online.online === false && (
        <Toast title="Network offline ☹️" status="error" />
      )}
      {online.online === true && (
        <Toast title="network restored 👍" status="successful" />
      )}
    </>
  );
};

export default MainNavigation;
