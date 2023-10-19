import { FC, useRef } from "react";
import TransparentButton from "../../components/General-UI/TransparentButton";
import {
  accessoriesHero,
  clothesHero,
  giftHero,
  giftLipCategory,
  sportsweaSubCategory,
} from "../../assets/images";
import {
  hatSubCategory,
  hoodieSubCategory,
  skirtSubCategory,
  socksSubCategory,
} from "../../assets/images";
import {
  necklaseSubCategory,
  braceleteSubCategory,
  totebagSubCategory,
  headbandSubCategory,
} from "../../assets/images";
import {
  bagSubCategory,
  skincareSubCategory,
  hairSubCategory,
} from "../../assets/images";
import {
  sportsweaCroptTopCategory,
  sportsweaJoggerCategory,
  sportsweaLeggingsCategory,
  sportsweaSportingBraCategory,
} from "../../assets/images";
import { ChevronDown } from "../../assets/icons/icons";
import SubCategoryCard from "../../components/category/SubCategoryCard";
import { CategoryNamesProp, SubCategoryProp } from "../../props/CategoryProps";
import { repeat } from "../../utils/repeat";
import ProductCardLoading from "../../components/loading/ProductCardLoading";
import { UseQueryResult, useQueries } from "@tanstack/react-query";
import { getProduct } from "../../utils/fetchProduct";
import { useInView } from "framer-motion";
import { ItemsListProps } from "../../props/ShopProps";
import ProductCard from "../../components/General-UI/ProductCard";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const Category: FC<{ name: CategoryNamesProp }> = ({ name }) => {
  const refOne = useRef<HTMLUListElement | null>(null);
  const refTwo = useRef<HTMLUListElement | null>(null);
  const refThree = useRef<HTMLUListElement | null>(null);
  const refFour = useRef<HTMLUListElement | null>(null);

  const oneIsInView = useInView(refOne, { once: true });
  const twoIsInView = useInView(refOne, { once: true });
  const threeIsInView = useInView(refOne, { once: true });
  const fourIsInView = useInView(refOne, { once: true });

  const quote =
    name === "clothes"
      ? "Stay stylish with our latest clothing collection. From trendy t-shirts to cozy sweaters, our unique designs will keep you looking sharp"
      : name === "accessories"
      ? "Accessorize your life with our wide range of stylish accessories. From jewelry to handbags, find the perfect complement to your outfit."
      : name === "gift"
      ? "Discover the secrets of self-care and beauty. Our wellness and beauty gifts will keep you connected to the latest trends in health and relaxation."
      : name === "sportswear" &&
        "Celebrate an active lifestyle with our high-quality sportswear. Our collection of athletic apparel is designed to help you reach your fitness goals while keeping you stylish and comfortable.";

  const heroImg =
    name === "accessories"
      ? accessoriesHero
      : name === "clothes"
      ? clothesHero
      : name === "gift"
      ? giftHero
      : name === "sportswear" && sportsweaSubCategory;

  const subcategory: SubCategoryProp =
    name === "clothes"
      ? [
          { title: "Caps", img: hatSubCategory, ref: refOne },
          { title: "Skirt", img: skirtSubCategory, ref: refTwo },
          { title: "Hoodie", img: hoodieSubCategory, ref: refThree },
          { title: "Socks", img: socksSubCategory, ref: refFour },
        ]
      : name === "accessories"
      ? [
          { title: "Tote Bags", img: totebagSubCategory, ref: refOne },
          { title: "Necklaces", img: necklaseSubCategory, ref: refTwo },
          { title: "Hairbands", img: headbandSubCategory, ref: refThree },
          { title: "Bracelets", img: braceleteSubCategory, ref: refFour },
        ]
      : name === "gift"
      ? [
          {
            title: "Skincare",
            img: skincareSubCategory,
            ref: refOne,
          },
          { title: "Bags", img: bagSubCategory, ref: refTwo },
          {
            title: "Hair",
            img: hairSubCategory,
            ref: refThree,
          },
          { title: "Lipstick", img: giftLipCategory, ref: refFour },
        ]
      : name === "sportswear"
      ? [
          { title: "Leggings", img: sportsweaLeggingsCategory, ref: refOne },
          { title: "Joggers", img: sportsweaJoggerCategory, ref: refTwo },
          { title: "Crop Top", img: sportsweaCroptTopCategory, ref: refThree },
          {
            title: "Sports Bra",
            img: sportsweaSportingBraCategory,
            ref: refFour,
          },
        ]
      : [{}];

  const categoriesData = useQueries<
    [
      UseQueryResult<ItemsListProps>,
      UseQueryResult<ItemsListProps>,
      UseQueryResult<ItemsListProps>,
      UseQueryResult<ItemsListProps>
    ]
  >({
    queries: [
      {
        queryKey: [subcategory[0].title],
        queryFn: () => getProduct(subcategory[0].title as string, 10),
        refetchOnWindowFocus: false,
        enabled: oneIsInView,
      },
      {
        queryKey: [subcategory[1].title],
        queryFn: () => getProduct(subcategory[1].title as string, 10),
        refetchOnWindowFocus: false,
        enabled: twoIsInView,
      },
      {
        queryKey: [subcategory[2].title],
        queryFn: () => getProduct(subcategory[2].title as string, 10),
        refetchOnWindowFocus: false,
        enabled: threeIsInView,
      },
      {
        queryKey: [subcategory[3].title],
        queryFn: () => getProduct(subcategory[3].title as string, 10),
        refetchOnWindowFocus: false,
        enabled: fourIsInView,
      },
    ],
  });

  return (
    <article className="flex flex-col gap-2 md:gap-4 w-full">
      <Helmet>
        <title>{`${name[0].toUpperCase()}${name.substring(1)}`} - Savvy</title>

        <meta
          name="description"
          content={`Shop ${name} products on Savvy. Browse our wide selection of ${name} including trends, deals, and more.`}
        />

        <meta
          name="keywords"
          content={`${name}, ${name} products, ${name} trends`}
        />

        <meta property="og:title" content={`${name} - Savvy`} />

        <meta
          property="og:description"
          content={`Shop ${name} products on Savvy. Browse our wide selection of ${name} including trends, deals, and more.`}
        />
      </Helmet>
      <section className="flex flex-col md:flex-row  md:items-center rounded-md overflow-hidden bg-yellow-600/30 gap-3 md:gap-5">
        <img
          src={heroImg as string}
          alt={name.toUpperCase()}
          className="order-1 md:order-2 w-full md:w-1/2 h-72 lg:h-80 object-cover object-center bg-white"
        />
        <div className="w-full md:w-1/2 flex flex-col order-2 md:order-1 px-3 gap-3 items-center md:items-start py-2">
          <h3 className="text-2xl md:text-4xl font-semibold capitalize">
            {name}
          </h3>
          <p className="text-center md:text-start text-lg md:text-xl w-3/4 md:w-[90%]">
            {quote}
          </p>
          <a href="#one">
            <TransparentButton>
              Shop {name} <ChevronDown />
            </TransparentButton>
          </a>
        </div>
      </section>
      <ul className="grid grid-cols-2 lg:grid-cols-4  gap-3 lg:gap-5">
        {subcategory.map((subcategory, i) => {
          return (
            <li key={i}>
              <SubCategoryCard image={subcategory.img as string}>
                {subcategory.title as string}
              </SubCategoryCard>
            </li>
          );
        })}
      </ul>
      {subcategory.map((subcategory, index) => {
        return (
          <section
            key={index}
            id="one"
            className="flex flex-col gap-2 md:gap-4"
          >
            <section className="flex flex-row justify-between">
              <h3 className="text-2xl font-semibold transition-all duration-150 lg:text-3xl capitalize">
                {subcategory.title}
              </h3>
              <NavLink
                to={`/search/${subcategory.title
                  ?.replace(" ", "+")
                  .toLowerCase()}`}
                className="font-medium lg:text-xl underline capitalize px-3 py-1 hover:bg-slate-200/60 rounded-md focus:ring-2 ring-indigo-400 transition-all duration-150"
              >
                see all
              </NavLink>
            </section>
            <ul
              ref={subcategory.ref}
              className="grid grid-cols-2 gap-2 transition-all duration-150 md:grid-cols-3 lg:grid-cols-5 md:gap-4"
            >
              {categoriesData[index].isLoading &&
                repeat(10, <ProductCardLoading />)}
              {categoriesData[index].isError && <p>Something went wrong!</p>}
              {categoriesData[index].isPaused && (
                <div className="loader animate-spin"></div>
              )}
              {categoriesData[index].data &&
                categoriesData[index].data?.products.map((product, i) => {
                  return (
                    <li key={i}>
                      <ProductCard productDetail={product} />
                    </li>
                  );
                })}
            </ul>
          </section>
        );
      })}
    </article>
  );
};

export default Category;
