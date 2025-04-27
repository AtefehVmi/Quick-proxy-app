type Plan = {
  id: string;
  name: string;
  price: number;
};

type Product = {
  id: string;
  name: string;
  types: {
    name: string;
    plans: Plan[];
  }[];
};

export type PriceListResponse = {
  currency: string;
  products: Product[];
};

export type ApiResponse<T> = {
  data: T;
};

export type PriceListApiResponse = ApiResponse<PriceListResponse>;

// countries
type Country = {
  id: number;
  name: string;
  out_of_stock: boolean;
};

export type CountriesResponse = { data: Country[] };
