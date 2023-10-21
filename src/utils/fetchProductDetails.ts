import axios from "axios";
import { ItemDetailsProps } from "../props/ShopProps";

export const fetchProductDetails = async (id: string) => {
  const options = {
    method: "GET",
    url: "https://asos2.p.rapidapi.com/products/v3/detail",
    params: {
      id: id,
      lang: "en-US",
      store: "US",
      sizeSchema: "US",
      currency: "USD",
    },
    headers: {
      "X-RapidAPI-Key": "643a28fbbemshc9bec1b30771e8ap1b9cddjsn540e1d217731",
      "X-RapidAPI-Host": "asos2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data as ItemDetailsProps;
  } catch (error) {
    throw new Error("Server error, couldn't fetch data.");
  }
};
