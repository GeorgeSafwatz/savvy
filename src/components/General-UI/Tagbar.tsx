import Tags from "./Tags";

const Tagbar = () => {
  return (
    <section className="sticky top-0 z-20 hidden w-full px-4 bg-white border-b-2 h-fit md:px-6 lg:px-10 border-b-slate-200 md:block">
      <div
        className={`w-fit flex flex-row gap-4
      `}
      >
        <Tags
          items={[
            "All Clothing",
            "Dresses",
            "Hats",
            "Hoodies",
            "Leggings",
            "Skirts",
            "Socks",
            "Sweatpants",
            "Tank Tops",
            "T-Shirts",
          ]}
        >
          Clothes
        </Tags>
        <Tags
          items={[
            "Phone Cases",
            "Screen Protectors",
            "Chargers",
            "Headphones",
            "Bluetooth Speakers",
            "Power Banks",
            "Car Mounts",
            "Cables",
            "Wireless Chargers",
            "Smartwatches",
            "Fitness Trackers",
            "Phone Grips",
            "Popsockets",
            "Selfie Sticks",
            "Stylus Pens",
          ]}
        >
          Accessories
        </Tags>
        <Tags items={["Skincare", "Makeup", "Bags", "Lotion"]}>Gift</Tags>
        <Tags
          items={[
            "Leggings",
            "Joggers",
            "Tank Tops",
            "Crop Tops",
            "Sports Bras",
            "Sports Vest",
            "Sports Sweatpants",
          ]}
        >
          Sportswear
        </Tags>
      </div>
    </section>
  );
};

export default Tagbar;
