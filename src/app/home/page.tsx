import heroImage from "../../assets/23Q316_GM_PROMO_Deal_Days-20_Off_Sitewide-compelling_OnSite_Homepage_Desktop_Hero_4800x1440.jpeg";
import Button from "../../components/General-UI/Button";
import CategoryCard from "../../components/home/CategoryCard";
import {
  accessoriesImage,
  clothesImage,
  sportswearCategory,
  giftHero,
} from "../../assets/images";
import ProductCard from "../../components/General-UI/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ItemsListProps } from "../../props/ShopProps";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ProductCardLoading from "../../components/loading/ProductCardLoading";
import { repeat } from "../../utils/repeat";
import { getProduct } from "../../utils/fetchProduct";
import { Helmet } from "react-helmet";
const HomePage = () => {
  const accessoriesRef = useRef<HTMLUListElement | null>(null);
  const accessoriesInView = useInView(accessoriesRef);
  const tshirtRef = useRef<HTMLUListElement | null>(null);
  const tshirtInView = useInView(tshirtRef);

  const {
    data,
    isLoading: accessoriesLoading,
    isError: accessoriesError,
    isPaused: accessoriesRetrying,
  } = useQuery<ItemsListProps, Error>({
    queryKey: ["Accessories"],
    queryFn: () => getProduct("accessories", 10),
    refetchOnWindowFocus: false,
    enabled: accessoriesInView,
  });

  const {
    data: tshirtData,
    isLoading: tshirtLoading,
    isError: tshirtError,
    isPaused: tshirtRetrying,
  } = useQuery<ItemsListProps, Error>({
    queryKey: ["tshirt"],
    queryFn: () => getProduct("t-shirt", 10),
    refetchOnWindowFocus: false,
    enabled: tshirtInView,
  });

  return (
    <article className="flex flex-col gap-2 transition-all duration-150 lg:gap-6">
      <Helmet>
        <Helmet>
          <title>Savvy - Ecommerce Homepage</title>
          <meta
            name="description"
            content="Savvy is an online ecommerce store with amazing deals on  fashion, accessories, home goods, and more. Visit our homepage to browse featured products."
          />

          <meta
            name="keywords"
            content="ecommerce, online shopping, accessories, fashion, gifts, clothes"
          />

          <meta property="og:title" content="Savvy - Ecommerce Homepage" />

          <meta
            property="og:description"
            content="Savvy is an online ecommerce store with amazing deals on  fashion, accessories, home goods, and more. Visit our homepage to browse featured products."
          />

          <meta property="og:url" content="https://www.savvy.com/" />

          <meta property="og:type" content="website" />
        </Helmet>
      </Helmet>
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
          <CategoryCard image={giftHero}>Shop Gift</CategoryCard>
          <CategoryCard image={accessoriesImage}>Shop Accessories</CategoryCard>
          <CategoryCard image={sportswearCategory} takesTwoGrid>
            Shop Sportswear
          </CategoryCard>
        </section>
      </section>
      <section className="flex flex-col gap-2 md:gap-4">
        <h3 className="text-2xl font-semibold transition-all duration-150 lg:text-3xl">
          Accessories
        </h3>
        <ul
          ref={accessoriesRef}
          className="grid grid-cols-2 gap-2 transition-all duration-150 md:grid-cols-3 lg:grid-cols-5 md:gap-4"
        >
          {accessoriesLoading && repeat(10, <ProductCardLoading />)}
          {accessoriesError && <p>{}</p>}
          {accessoriesRetrying && <div className="loader animate-spin"></div>}
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
