import { useQuery } from "@tanstack/react-query";
import { ItemsListProps } from "../../props/ShopProps";
import { getProduct } from "../../utils/fetchProduct";
import { useLoaderData, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import {
  setPriceMax,
  setPriceMin,
  setSort,
} from "../../context/fetchPropsSlice";
import ProductCard from "../../components/General-UI/ProductCard";
import ProductCardLoading from "../../components/loading/ProductCardLoading";
import { repeat } from "../../utils/repeat";
import { SortProps } from "../../props/fetchProductProps";
import ChevronDown from "../../assets/icons/ChevronDown";
import { Helmet } from "react-helmet";
const SearchResults = () => {
  const pricePropse = useSelector((state: RootState) => state.priceProps);
  const action = useDispatch();
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);
  const [changed, setChanged] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(true);
  const { searchTerm } = useParams();
  const initialData = useLoaderData() as ItemsListProps;
  const { data, isLoading, isError, isPaused } = useQuery<
    ItemsListProps,
    Error
  >({
    initialData,
    queryKey: [
      "search",
      searchTerm as string,
      pricePropse.maxValue,
      pricePropse.minValue,
      pricePropse.sort,
    ],
    queryFn: () =>
      getProduct(
        searchTerm?.replace("+", " ") as string,
        30,
        pricePropse.sort,
        pricePropse.minValue,
        pricePropse.maxValue
      ),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (changed) {
      const timeout = setTimeout(() => {
        if (maxRef.current) {
          action(setPriceMax(+maxRef.current.value));
          localStorage.setItem("maxPrice", maxRef.current.value);
          // queryClient.invalidateQueries(["search"]);
        }
        if (minRef.current) {
          action(setPriceMin(+minRef.current.value));
          localStorage.setItem("minPrice", minRef.current.value);
          // queryClient.invalidateQueries(["search"]);
        }
        setChanged(false);
      }, 1000 * 2);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [action, changed]);

  const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    action(setSort(e.target.value as SortProps));
    // queryClient.invalidateQueries(["search"]);
  };
  const title = `${searchTerm?.replace("+", " ")} - Search Results | Savvy`;
  return (
    <article className="grid md:grid-cols-4">
      <Helmet>
        <title>{title}</title>

        <meta
          name="description"
          content={`Search results for ${searchTerm} on Savvy online store. Browse relevant products for your search.`}
        />

        <meta property="og:title" content={title} />

        <meta
          property="og:description"
          content={`Search results for ${searchTerm} on Savvy online store. Browse relevant products for your search.`}
        />
      </Helmet>
      <section className={`md:col-span-1 py-2 flex flex-col gap-3 items-start`}>
        <h3
          onClick={() => setToggle(!toggle)}
          className="md:text-2xl text-lg font-semibold flex flex-row items-center gap-3 "
        >
          Filters{" "}
          <i className="block md:hidden  ">
            <ChevronDown />
          </i>
        </h3>
        <section
          className={`${!toggle && "hidden"} flex flex-row md:flex-col gap-3`}
        >
          <section className="flex flex-col gap-2 items-start">
            <label htmlFor="priceMin" className="font-semibold lg:text-lg">
              Price minimum
            </label>
            <input
              defaultValue={pricePropse.minValue}
              min={0}
              ref={minRef}
              onChange={() => setChanged(true)}
              type="number"
              name="priceMin"
              id="priceMin"
              className=" focus:outline-none px-3 py-1 ring-2 ring-slate-400 focus:ring-indigo-400 rounded-md bg-slate-100 focus:bg-indigo-100 w-20"
            />
          </section>
          <section className="flex flex-col gap-2 items-start">
            <label htmlFor="priceMax" className="font-semibold lg:text-lg ">
              Price maximum
            </label>
            <input
              defaultValue={pricePropse.maxValue}
              max={1000}
              ref={maxRef}
              onChange={() => setChanged(true)}
              type="number"
              name="priceMax"
              id="priceMax"
              className=" focus:outline-none px-3 py-1  ring-2 ring-slate-400 focus:ring-indigo-400 rounded-md bg-slate-100 focus:bg-indigo-100 w-20"
            />
          </section>
        </section>
      </section>
      <section className="md:col-span-3 space-y-3">
        <section className="flex flex-row justify-between ">
          <h3 className="md:text-2xl text-lg font-semibold">Results</h3>
          <select
            defaultValue={"freshness"}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => selectHandler(e)}
            className="focus:outline-none focus:ring-2 ring-indigo-400 font-medium p-2 rounded-md "
          >
            <optgroup className="bg-indigo-100 p-2">
              <option value="pricedesc">Price decrease</option>
              <option value="priceasc">Price increase</option>
              <option value="freshness">Fresh Data</option>
            </optgroup>
          </select>
        </section>
        {isError && <p>Something went wrong</p>}
        {isPaused && <p>Waiting for internet connection</p>}
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {isLoading && repeat(20, <ProductCardLoading />)}
          {data &&
            data.products.map((item) => {
              return (
                <li key={item.id}>
                  <ProductCard productDetail={item} />
                </li>
              );
            })}
        </ul>
      </section>
    </article>
  );
};

export default SearchResults;
