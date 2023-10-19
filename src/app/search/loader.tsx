import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, json } from "react-router-dom";
import { getProduct } from "../../utils/fetchProduct";
import { ItemsListProps } from "../../props/ShopProps";

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { searchTerm } = params;
    try {
      const result = await queryClient.ensureQueryData<ItemsListProps, Error>({
        queryKey: ["search", searchTerm],
        queryFn: () => getProduct(searchTerm?.replace("+", "") as string, 50),
      });
      return result;
    } catch (error) {
      throw json({ message: "Couldn't fetch data" }, { status: 401 });
    }
  };
