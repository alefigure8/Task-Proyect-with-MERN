import {useState, useEffect, createContext} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import clientAxios from '../config/clientAxios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const url = '/users/perfil';
        const {data} = await clientAxios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuth(data);

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