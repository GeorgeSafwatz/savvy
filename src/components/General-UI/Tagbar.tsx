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
          Clothing
        </Tags>
        <Tags
          items={[
            "Oppo",
            "IPhone",
            "Samsung",
            "Huawei",
            "Xiaomi",
            "OnePlus",
            "LG",
            "Nokia",
            "Lenovo",
            "Google",
          ]}
        >
          Mobile
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
        <Tags
          items={[
            "Toys",
            "Kids Books",
            "Kids Clothing",
            "Kids Shoes",
            "School Supplies",
            "Art and Craft",
            "Sports Equipment",
            "Board Games",
            "Puzzles",
            "Electronics",
            "Baby Gear",
          ]}
        >
          Kids
        </Tags>
        <Tags
          items={[
            "Desk Accessories",
            "Office Supplies",
            "Writing Instruments",
            "Paper Products",
            "Office Furniture",
            "Conference Room Equipment",
            "Breakroom Supplies",
            "Cleaning and Janitorial",
            "Safety and Security",
            "Printers and Scanners",
            "Shredders",
            "Presentation Tools",
          ]}
        >
          Office
        </Tags>
        <Tags
          items={[
            "Dog Supplies",
            "Cat Supplies",
            "Bird Supplies",
            "Fish Supplies",
            "Small Animal Supplies",
            "Reptile Supplies",
            "Pet Food",
            "Pet Treats",
            "Pet Toys",
            "Pet Beds",
            "Pet Carriers",
            "Pet Grooming",
            "Pet Training",
            "Pet Apparel",
            "Pet Health and Wellness",
            "Pet Accessories",
          ]}
        >
          Pets
        </Tags>
      </div>
    </section>
  );
};

export default Tagbar;
