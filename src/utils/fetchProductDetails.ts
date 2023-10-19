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
      "X-RapidAPI-Key": "620b190598msh4c4876f14d0e4fcp1b5e87jsn18976f3fba24",
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
