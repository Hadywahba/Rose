export type Addresses = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
};

export type AddressesResponse = {
  addresses: Addresses[];
};
