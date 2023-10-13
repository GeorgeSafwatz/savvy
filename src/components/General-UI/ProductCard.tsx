import { FC } from "react";
import { ProductDetails } from "../../props/ShopProps";
import { CartIcon, FavouriteIcon } from "../../assets/icons/icons";

const ProductCard: FC<{ productDetail: ProductDetails }> = ({
  productDetail,
}) => {
  const sale =
    (productDetail.price.current.value / productDetail.price.previous.value) *
    100;
  return (
    <section
      key={productDetail.id}
      className="relative flex flex-row gap-3 overflow-hidden rounded-md md:flex-col group"
    >
      <div className="absolute hidden p-1 bg-white rounded-full top-3 right-3 group-hover:block hover:bg-slate-200 group/item">
        <FavouriteIcon />
        <p className="absolute top-0 hidden px-3 py-1 font-medium capitalize bg-white rounded-full right-10 whitespace-nowrap group-hover/item:block">
          add to favorites
        </p>
      </div>
      <div className="absolute hidden p-1 bg-white rounded-full top-14 right-3 group-hover:block hover:bg-slate-200 group/item">
        <CartIcon />{" "}
        <p className="absolute top-0 hidden px-3 py-1 font-medium capitalize bg-white rounded-full right-10 whitespace-nowrap group-hover/item:block">
          add to cart
        </p>
      </div>
      <img
        src={`https://${productDetail.imageUrl}`}
        alt={productDetail.name}
        className="object-cover object-center h-40 md:h-56"
      />
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
                {productDetail.price.previous.value.toFixed(2).toLocaleString()}
              </span>{" "}
              {`(${sale.toFixed(0)}% off)`}
            </p>
          )}
      </div>
    </section>
  );
};

export default ProductCard;
