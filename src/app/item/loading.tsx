import { repeat } from "../../utils/repeat";
import Button from "../../components/General-UI/Button";

const LoadingItem = () => {
  return (
    <article className="flex flex-col gap-4 md:grid md:grid-cols-2 transition-all duration-150 relative">
      <section className="flex flex-col md:flex-row gap-2 transition-all duration-150">
        <ul className="w-fit flex-row flex md:flex-col gap-4 ">
          {repeat(
            10,
            <li>
              <div
                className={`object-scale-down object-center h-16 w-[4.5rem] md:h-[4.5rem] md:w-16 bg-slate-200 rounded-md animate-pulse`}
              />
            </li>
          )}
        </ul>
        <div className="object-cover object-center w-full h-72 md:h-80 lg:h-[22rem] bg-slate-200 rounded-md transition-all duration-150 animate-pulse" />
      </section>
      <section className="flex flex-col gap-4 md:gap-6">
        <section className="flex flex-col gap-2">
          <p className="w-10 h-2 bg-slate-200 animate-pulse"></p>
          <p className="w-1/3 bg-slate-200 h-2 animate-pulse"></p>
        </section>
        <p className="w-1/3 h-2 bg-slate-200 animate-pulse"></p>
        <section className="flex flex-col">
          <p className="text-lg font-semibold">Description</p>
          <p className="w-3/4 h-2 bg-slate-200 animate-pulse" />
        </section>
        <p className="w-10 h-2 bg-slate-200 animate-pulse"></p>
        <section className="flex flex-col gap-2">
          <section className="flex flex-col gap-4">
            <p className="font-semibold text-lg">About Product:</p>
            <p className="w-3/4 h-2 bg-slate-200 animate-pulse" />
          </section>
          <section className="flex flex-col gap-4">
            <p className="font-semibold text-lg">Size:</p>
            <p className="w-3/4 h-2 bg-slate-200 animate-pulse" />
          </section>
          <section className="flex flex-col gap-4">
            <p className="font-semibold text-lg">Care Info:</p>
            <p className="w-3/4 h-2 bg-slate-200 animate-pulse" />
          </section>
        </section>
      </section>
      <section className="flex flex-row justify-between sticky bottom-0 md:relative bg-white p-3 md:col-start-2">
        <p className="w-3/4 h-3 bg-slate-200 animate-pulse"></p>
        <Button secondary>add to cart</Button>
      </section>
    </article>
  );
};

export default LoadingItem;
