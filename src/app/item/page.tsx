import { useEffect, useState } from "react";
import { ItemDetailsProps, ProductDetails } from "../../props/ShopProps";
import Button from "../../components/General-UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../../context/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../utils/fetchProductDetails";
import { RootState } from "../../context/store";
import { Helmet } from "react-helmet";

const ItemDetails = () => {
  const [itemExists, setItemExists] = useState<boolean>(false);
  const action = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { itemId } = useParams();
  const initialData = useLoaderData() as ItemDetailsProps;
  const { data } = useQuery<ItemDetailsProps, Error>({
    initialData,
    queryKey: ["item", itemId],
    queryFn: () => fetchProductDetails(itemId as string),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 3,
  });

  const [imageNumber, setImageNumber] = useState(1);
  const priceOff =
    (1 - data.price.current?.value / data.price.previous.value) * 100;
  const itemDetails: ProductDetails = {
    id: data.id,
    price: data.price,
    name: data.name,
    brandName: data.brand.name,
    imageUrl: data.media.images[0].url,
  };

  useEffect(() => {
    for (const item of cart.cartValue) {
      if (item.id === data.id) {
        setItemExists(true);
        break;
      } else {
        setItemExists(false);
      }
    }
  }, [cart.cartValue, data.id, itemExists]);

  const handleCart = () => {
    if (itemExists) {
      action(removeItem(itemDetails));
      setItemExists(false);
    } else {
      action(addItem(itemDetails));
      setItemExists(true);
    }
  };
  useEffect(() => {
    const cartList = JSON.stringify(cart.cartValue);
    localStorage.setItem("cart", cartList);
  }, [cart.cartValue, itemExists]);

  return (
    <article className="flex flex-col gap-4 md:grid md:grid-cols-2 transition-all duration-150 relative">
      <Helmet>
        <title>{data.name} - Savvy</title>

        <meta
          name="description"
          content={`Details about ${data.name} including price, ratings, reviews, and product highlights. Shop now and get free shipping!`}
        />

        <meta
          name="keywords"
          content={`${data.brand.name}, ${data.name}, buy ${data.name}`}
        />

        <meta property="og:title" content={`${data.name} - Savvy`} />

        <meta
          property="og:description"
          content={`Details about ${data.name} including price, ratings, reviews, and product highlights. Shop now and get free shipping!`}
        />
      </Helmet>
      <section className="flex flex-col md:flex-row gap-2 transition-all duration-150">
        <ul className="w-fit flex-row flex md:flex-col gap-4 ">
          {data.media.images.map((img, index) => {
            return (
              <li key={index}>
                <img
                  src={`https://${img.url}`}
                  alt={data.name}
                  onClick={() => setImageNumber(index)}
                  className={`object-scale-down object-center h-16 w-[4.5rem] md:h-[4.5rem] md:w-16 bg-slate-200 rounded-md cursor-pointer ${
                    index !== imageNumber &&
                    "opacity-40 transition-all duration-150"
                  }`}
                />
              </li>
            );
          })}
        </ul>
        <img
          src={`https://${data.media.images[imageNumber].url}`}
          alt={data.name}
          className="object-cover object-center w-full h-72 md:h-80 lg:h-[22rem] bg-slate-200 rounded-md transition-all duration-150"
        />
      </section>
      <section className="flex flex-col gap-4 md:gap-6">
        <section className="flex flex-col gap-2">
          <p className="text-lg md:text-xl font-semibold capitalize">
            {data.name}
          </p>
          <p className="capitalize">
            sold by <span className="font-semibold">{data.brand.name}</span>
          </p>
        </section>
        <p className="md:text-2xl text-xl font-semibold space-x-6">
          <span>{`${data.price.current?.value.toFixed(2)}${
            data.price.currency
          }`}</span>
          {priceOff > 0 && (
            <span className="text-slate-400 line-through font-normal">{`(${priceOff.toFixed(
              2
            )}%) off`}</span>
          )}
        </p>
        <section className="flex flex-col">
          <p className="text-lg font-semibold">Description</p>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </section>
        <p className="space-x-2">
          <span
            className={`capitalize text-white px-3 py-1 text-sm rounded-full font-medium ${
              data.gender === "Men" ? "bg-black" : "bg-pink-400"
            }`}
          >
            {data.gender}
          </span>
          <span
            className={`capitalize text-white px-3 py-1 text-sm rounded-full font-medium ${
              data.isInStock ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {data.isInStock ? "in stock" : "out of stock"}
          </span>
        </p>
        <section className="flex flex-col gap-2">
          <section className="flex flex-col gap-4">
            <p className="font-semibold text-lg">About Product:</p>
            <p
              className="text-slate-400 text-sm"
              dangerouslySetInnerHTML={{ __html: data.info.aboutMe }}
            />
          </section>
          {data.info.sizeAndFit && (
            <section className="flex flex-col gap-4">
              <p className="font-semibold text-lg">Size:</p>
              <p
                className="text-slate-400 text-sm"
                dangerouslySetInnerHTML={{
                  __html: data.info.sizeAndFit,
                }}
              />
            </section>
          )}
          <section className="flex flex-col gap-4">
            <p className="font-semibold text-lg">Care Info:</p>
            <p
              className="text-slate-400 text-sm"
              dangerouslySetInnerHTML={{ __html: data.info.careInfo }}
            />
          </section>
        </section>
      </section>
      <section className="flex flex-row justify-between sticky bottom-0 md:relative bg-white p-3 md:col-start-2">
        <p className="font-semibold text-lg">{data.price.current?.text}</p>
        <Button clickHandler={handleCart} secondary={!itemExists}>
          {!itemExists ? "add to cart" : "remove item"}
        </Button>
      </section>
    </article>
  );
};

export default ItemDetails;
