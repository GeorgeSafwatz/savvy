const ProductCardLoading = () => {
  return (
    <section className="flex flex-row gap-3 overflow-hidden rounded-md md:flex-col">
      <div className="object-cover object-center h-40 md:h-56 bg-slate-300 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="w-full h-2 md:h-3 bg-slate-300 animate-pulse "></div>
        <div className="w-3/4 h-2 md:h-3 bg-slate-300 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-1/4 h-2 md:h-3 bg-slate-300 animate-pulse"></div>
        <div className="w-1/2 h-2 md:h-3 bg-slate-300 animate-pulse"></div>
      </div>
    </section>
  );
};

export default ProductCardLoading;
