import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./app/RootLayout";
import ErrorElement from "./app/Error/ErrorELement";
import { Provider } from "react-redux";
import { store } from "./context/store";
import HomePage from "./app/home/page";
import Category from "./app/categories/page";
import { loader as searchLoader } from "./app/search/loader";
import SearchResults from "./app/search/pages";
import Login from "./app/auth/login/page";
import SignUp from "./app/auth/signup/page";
import ItemDetails from "./app/item/page";
import { loader as itemLoader } from "./app/item/loader";
import { loader as authLoader } from "./app/auth/loader";

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorElement />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/search/:searchTerm",
          element: <SearchResults />,
          loader: searchLoader(queryClient),
        },
        {
          path: "/item/:itemId",
          element: <ItemDetails />,
          loader: itemLoader(queryClient),
        },
        { path: "/auth/login", element: <Login />, loader: authLoader },
        { path: "/auth/signup", element: <SignUp />, loader: authLoader },
        { path: "/clothes", element: <Category name="clothes" /> },
        { path: "/gift", element: <Category name="gift" /> },
        { path: "/accessories", element: <Category name="accessories" /> },
        { path: "/sportswear", element: <Category name="sportswear" /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
