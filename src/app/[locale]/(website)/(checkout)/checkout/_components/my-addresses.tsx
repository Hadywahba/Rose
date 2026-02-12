// import { AddressesModal } from './addresses-modal';
import { getUserAddresses } from '@/lib/services/addresses/get-user-addresses';
import { AddressesModalFlow } from './addresses-modal-flow';

export default async function MyAddresses() {
  const userAddresses = await getUserAddresses();

  const selectedAddressId = undefined;
  console.log("Selected Address ID:", selectedAddressId);
  

  return (
    <AddressesModalFlow
      userAddresses={userAddresses}
      selectedAddressId={selectedAddressId}
    />
  );
}
