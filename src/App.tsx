import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import RootLayout from "./app/RootLayout";
import ErrorElement from "./app/Error/ErrorELement";
import { Provider } from "react-redux";
import { store } from "./context/store";
import HomePage from "./app/home/page";

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorElement />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/:searchTerm", element: <></> },
        { path: "/clothes", element: <></> },
        { path: "/mobile", element: <></> },
        { path: "/accessories", element: <></> },
        { path: "/kids", element: <></> },
        { path: "/office", element: <></> },
        { path: "/pets", element: <></> },
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
