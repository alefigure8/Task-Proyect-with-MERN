import {useState, useEffect, createContext} from 'react';
import {useNavigate} from 'react-router-dom';
import clientAxios from '../config/clientAxios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {

      const token = localStorage.getItem('token');

      // if the token is null
      if (!token) {
        setLoading(false);
        return;
      }

      // if the token is not null
      try {
        const url = '/users/perfil';
        const {data} = await clientAxios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(data);
        //navigate('/projects');
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }

    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider};

export default AuthContext;