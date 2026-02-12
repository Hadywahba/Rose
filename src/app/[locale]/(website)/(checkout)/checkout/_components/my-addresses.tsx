import { getUserAddresses } from '@/lib/services/addresses/get-user-addresses';
import { AddressesModalFlow } from './addresses-modal-flow';

export default async function MyAddresses() {
  const userAddresses = await getUserAddresses();  

  return (
    <AddressesModalFlow
      userAddresses={userAddresses}
    />
  );
}
