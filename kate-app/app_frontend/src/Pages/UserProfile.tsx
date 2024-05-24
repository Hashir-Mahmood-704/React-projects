import { useParams } from "react-router-dom"
const UserProfile = () => {
  const { userId } = useParams()
  return (
    <div>
      UserProfile {userId}
      <div></div>
    </div>
  )
}

export default UserProfile
