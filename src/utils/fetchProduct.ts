import axios from "axios";
import { SortProps } from "../props/fetchProductProps";

export const getProduct = async (
  search: string,
  limit: number,
  sort?: SortProps,
  priceMin?: number,
  priceMax?: number,
  errorMsg?: string
) => {
  const options = {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v2/list",
    params: {
      store: "US",
      offset: "0",
      categoryId: "0",
      limit: limit.toLocaleString(),
      country: "US",
      sort: sort,
      q: search,
      currency: "USD",
      sizeSchema: "US",
      lang: "en-US",
      priceMin: priceMin || 0,
      priceMax: priceMax || 1000,
    },
    headers: {
      "X-RapidAPI-Key": "620b190598msh4c4876f14d0e4fcp1b5e87jsn18976f3fba24",
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(errorMsg || "Cannot fetch data");
  }
};
