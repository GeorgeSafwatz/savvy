export interface AutoCompleteProps {
  suggestionGroups: {
    suggestions: {
      searchTerm: string;
      numberOfResults: number;
    }[];
  }[];
}

export interface ProductDetails {
  id: number;
  name: string;
  price: {
    current: {
      value: number;
      text: string;
    };
    previous: {
      value: number;
      text: string;
    };
    currency: string;
  };
  imageUrl: string;
  brandName: string;
  additionalImageUrls: string[];
}
export interface ItemsListProps {
  searchTerm: string;
  itemCount: number;
  products: ProductDetails[];
}

export interface ItemDetailsProps {
  id: number;
  name: string;
  description: string;
  gender: string;
  brand: {
    name: string;
    description: string;
  };
  isOneSize: boolean;
  isInStock: boolean;
  media: {
    images: {
      url: string;
      colour: string;
    }[];
  };
  info: {
    aboutMe: string;
    careInfo: string;
  };
  price: {
    current: {
      value: number;
      text: string;
    };
    previous: {
      value: number;
      text: string;
    };
    currency: string;
  };
  productType: {
    name: string;
  };
  localisedData: {
    locale: string;
    title: string;
    pdpUrl: string;
  }[];
}
