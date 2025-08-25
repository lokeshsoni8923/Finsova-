import UserList from '@views/apps/user/list'
import { getUserData } from '@/app/server/actions'

const UserListApp = async () => {
  
  const data = await getUserData()

  return <UserList userData={data} />
}

export default UserListApp
