import AdminProfile from "./_component/admin-profile";
import { getProfile } from './_actions/get-profile';


export default async function Page() {
    const data = await getProfile();

  return<>
 <AdminProfile   initialData={data}/>
  </>
}
