import useProjects from "./useProjects"
import useAuth from "./useAuth"

const useAdmin = () => {
  const { auth } = useAuth()
  const { project } = useProjects()
  return project.createdBy === auth._id
}

export default useAdmin