import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, json } from "react-router-dom";
import { fetchProductDetails } from "../../utils/fetchProductDetails";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { itemId } = params;
    try {
      const data = await queryClient.ensureQueryData({
        queryKey: ["item-details", itemId],
        queryFn: () => fetchProductDetails(itemId as string),
      });
      return data;
    } catch (error) {
      throw json(`Server error, couldn't fetch data`, { status: 401 });
    }
  };
