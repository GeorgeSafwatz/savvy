import { FC, useState, useEffect } from "react";
import { ProductDetails } from "../../props/ShopProps";
import { CartIcon } from "../../assets/icons/icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../context/store";
import { addItem, removeItem } from "../../context/cartSlice";

const ProductCard: FC<{ productDetail: ProductDetails }> = ({
  productDetail,
}) => {
  const cart = useSelector((state: RootState) => state.cart);
  const [iExist, setiExist] = useState<boolean | null>(null);
  const action = useDispatch();
  const sale =
    (1 -
      productDetail.price.current.value / productDetail.price.previous.value) *
    100;

  useEffect(() => {
    if (cart.cartValue.length !== 0) {
      for (const item of cart.cartValue) {
        if (item.id === productDetail.id) {
          setiExist(true);
          break;
        } else {
          setiExist(false);
        }
      }
    }
  }, [cart.cartValue, productDetail.id, iExist]);

  useEffect(() => {
    const cartList = JSON.stringify(cart.cartValue);
    localStorage.setItem("cart", cartList);
  }, [cart.cartValue, iExist]);

  const CartHandler = () => {
    if (iExist) {
      action(removeItem(productDetail));
      setiExist(false);
    } else {
      action(addItem(productDetail));
      setiExist(true);
    }
  };
  return (
    <section className="group relative">
      <div
        onClick={CartHandler}
        className={`absolute hidden p-1  rounded-full top-3 right-3 group-hover:block  group/item z-30 cursor-pointer ${
          iExist ? "bg-red-200" : "hover:bg-slate-300 bg-white"
        }`}
      >
        <CartIcon />{" "}
        <p
          className={`absolute top-8 md:top-0 hidden px-3 py-1 font-medium capitalize rounded-full right-0 md:right-10 whitespace-nowrap group-hover/item:block ${
            iExist ? "bg-red-200" : "bg-white"
          }`}
        >
          {iExist ? "remove from cart" : "add to cart"}
        </p>
      </div>
      <NavLink
        to={`/item/${productDetail.id}`}
        key={productDetail.id}
        className=" flex flex-col gap-3 overflow-hidden rounded-md "
      >
        <img
          src={`https://${productDetail.imageUrl}`}
          alt={productDetail.name}
          className="object-cover object-center h-48 md:h-56 bg-slate-300"
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
            <p className="overflow-hidden text-sm font-medium md:text-base text-ellipsis line-clamp-2">
              {productDetail.name}
            </p>
            <p className="text-sm md:text-base text-ellipsis line-clamp-1">{`by ${productDetail.brandName}`}</p>
          </div>
          <div className="flex flex-col ">
            <p className="text-base text-indigo-600 md:text-lg ">{`${productDetail.price.current.value
              .toFixed(2)
              .toLocaleString()} ${productDetail.price.currency}`}</p>
            {productDetail.price.previous.value &&
              productDetail.price.current.value <
                productDetail.price.previous.value && (
                <p className="text-sm md:text-base ">
                  <span className="line-through">
                    {productDetail.price.previous.value
                      .toFixed(2)
                      .toLocaleString()}
                  </span>{" "}
                  {`(${sale.toFixed(0)}% off)`}
                </p>
              )}
          </div>
        </div>
      </NavLink>
    </section>
  );
};

export default ProductCard;
