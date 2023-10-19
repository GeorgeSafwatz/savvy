import { useRouteError } from "react-router-dom";
import MainNavigation from "../MainNavigation";
import PageContent from "../Error/PageContent";

interface ErrorPageProps {
  status: number;
  data: {
    message: string;
  };
}

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorPageProps;

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  if (error.status === 401) {
    title = "Sever error ☹️!";
    message = error.data.message;
  }

  if (error.status === 403) {
    title = `Access denied!`;
    message = error.data.message;
  }
  return (
    <>
      <MainNavigation />
      <main className="grid grid-cols-2 absolute left-1/2 -translate-x-1/2 top-1/2 md:-translate-y-1/4 -translate-y-1/2">
        <PageContent title={title}>
          <p className="whitespace-nowrap">{message}</p>
        </PageContent>
      </main>
    </>
  );
};

export default ErrorPage;
