export type Address = {
  id: string;
  userId: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: string;
  longitude: string;
  createdAt: string;
  updatedAt: string;
};

export type AddressesPayload = {
  addresses: Address[];
};

export type AddAddressPayload = {
  address: Address;
};

export type UpdateAddressPayload = {
  address: Address;
};
