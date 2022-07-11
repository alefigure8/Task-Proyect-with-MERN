import {useState, useEffect, createContext} from 'react'
import clientAxios from '../config/clientAxios';

const ProjectContext = createContext();

const ProjectProvider = ({children}) => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      try {
        const {data} = await clientAxios.get('/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProjects(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider};

export default ProjectContext;