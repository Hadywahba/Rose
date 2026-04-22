
import { getAddresses } from '../_hooks/get-address';
import { AddressesModalFlow } from './addresses-modal-flow';

export default async function MyAddresses() {
  const {dataAddress , error} = await getAddresses();

  return <AddressesModalFlow userAddresses={dataAddress} addressError={error} />;
}
