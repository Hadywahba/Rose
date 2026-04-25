
import { getAddresses } from '../_hooks/get-address';
import { AddressesModalFlow } from './addresses-modal-flow';

export default async function MyAddresses() {
  const {address , addressError} = await getAddresses();

  return <AddressesModalFlow userAddresses={address} addressError={addressError} />;
}
