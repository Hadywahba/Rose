
import { getAddresses } from '../_hooks/get-address';
import { AddressesModalFlow } from './addresses-modal-flow';

export default async function MyAddresses() {
  const {data , error} = await getAddresses();

  return <AddressesModalFlow userAddresses={data} addressError={error} />;
}
