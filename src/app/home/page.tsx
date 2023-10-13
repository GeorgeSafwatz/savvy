import heroImage from "../../assets/23Q316_GM_PROMO_Deal_Days-20_Off_Sitewide-compelling_OnSite_Homepage_Desktop_Hero_4800x1440.jpeg";
import Button from "../../components/General-UI/Button";
import CategoryCard from "../../components/home/CategoryCard";
import {
  accessoriesImage,
  clothesImage,
  kidsSupImage,
  mobileImage,
  officeSupImage,
  petsSupImage,
} from "../../assets/images";
import ProductCard from "../../components/General-UI/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ItemsListProps } from "../../props/ShopProps";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProductCardLoading from "../../components/loading/ProductCardLoading";
import { repeat } from "../../utils/repeat";

const HomePage = () => {
  const mobileRef = useRef<HTMLUListElement | null>(null);
  const mobileInView = useInView(mobileRef);
  const tshirtRef = useRef<HTMLUListElement | null>(null);
  const tshirtInView = useInView(tshirtRef);
  const getProduct = async (search: string) => {
    const options = {
      method: "GET",
      url: "https://asos2.p.rapidapi.com/products/v2/list",
      params: {
        store: "US",
        offset: "0",
        categoryId: "0",
        limit: "10",
        country: "US",
        sort: "",
        q: search,
        currency: "USD",
        sizeSchema: "US",
        lang: "en-US",
      },
      headers: {
        "X-RapidAPI-Key": "8290fcf14bmsh71b447a7c3053ebp14a6e9jsn831685ff95f0",
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data as ItemsListProps;
    } catch (error) {
      throw new Error("Cannot fetch data");
    }
  };
  const {
    data,
    isLoading: mobileLoading,
    isError: mobileError,
    isPaused: mobileRetrying,
  } = useQuery<ItemsListProps, Error>({
    queryKey: ["mobile"],
    queryFn: () => getProduct("phone"),
    refetchOnWindowFocus: false,
    enabled: mobileInView,
  });

  const {
    data: tshirtData,
    isLoading: tshirtLoading,
    isError: tshirtError,
    isPaused: tshirtRetrying,
  } = useQuery<ItemsListProps, Error>({
    queryKey: ["tshirt"],
    queryFn: () => getProduct("t-shirt"),
    refetchOnWindowFocus: false,
    enabled: tshirtInView,
  });

  return (
    <article className="flex flex-col gap-2 transition-all duration-150 lg:gap-6">
      <section className="relative w-full h-64 overflow-hidden text-center transition-all duration-150 rounded-md md:rounded-lg lg:h-96">
        <h1 className="w-1/3 m-auto my-auto mt-2 mb-4 font-serif text-xl font-medium transition-all duration-150 md:mb-6 md:mt-4 md:text-3xl lg:text-5xl">
          Get exclusive deals on millions of one-of-a-kind products.
        </h1>
        <Button dropshadow={true}>Explore</Button>
        <img
          src={heroImage}
          alt="Hero Image - Sales"
          className="absolute top-0 left-0 object-fill w-full rounded-md h-[95%] lg:h-full md:object-cover md:object-center md:rounded-lg -z-10 transition-all duration-150"
        />
      </section>
      <section className="flex flex-col w-full space-y-2 transition-all duration-150 lg:space-y-4">
        <h3 className="text-2xl font-semibold transition-all duration-150 lg:text-3xl">
          Shop Product Range
        </h3>
        <section className="grid grid-cols-2 gap-2 transition-all duration-150 lg:grid-cols-3 md:gap-4">
          <CategoryCard image={clothesImage}>Shop Clothes</CategoryCard>
          <CategoryCard image={mobileImage}>Shop Mobiles</CategoryCard>
          <CategoryCard image={accessoriesImage} takesTwoGrid>
            Shop Accessories
          </CategoryCard>
          <CategoryCard image={kidsSupImage}>Shop Kids</CategoryCard>
          <CategoryCard image={officeSupImage}>Shop Office</CategoryCard>
          <CategoryCard image={petsSupImage} takesTwoGrid>
            Shop Pets
          </CategoryCard>
        </section>
      </section>
      <section className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-2xl font-semibold transition-all duration-150 lg:text-3xl">
          Mobile Accessories
        </h3>
        <ul
          ref={mobileRef}
          className="grid grid-cols-2 gap-2 transition-all duration-150 md:grid-cols-3 lg:grid-cols-5 md:gap-4"
        >
          {mobileLoading && repeat(10, <ProductCardLoading />)}
          {mobileError && <p>Something went wrong!</p>}
          {mobileRetrying && <div className="loader animate-spin"></div>}
          {data &&
            data.products.map((product) => {
              return <ProductCard productDetail={product} />;
            })}
        </ul>
      </section>
      <section className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-2xl font-semibold transition-all duration-150 lg:text-3xl">
          T-Shirts
        </h3>
        <ul
          ref={tshirtRef}
          className="grid grid-cols-2 gap-2 transition-all duration-150 md:grid-cols-3 lg:grid-cols-5 md:gap-4"
        >
          {tshirtLoading && repeat(10, <ProductCardLoading />)}
          {tshirtError && <p>Something went wrong!</p>}
          {tshirtRetrying && <div className="loader animate-spin"></div>}
          {tshirtData &&
            tshirtData.products.map((product) => {
              return <ProductCard productDetail={product} />;
            })}
        </ul>
      </section>
    </article>
  );
};

export default HomePage;
