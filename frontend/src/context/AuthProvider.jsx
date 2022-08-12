import {useState, useEffect, createContext} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import clientAxios from '../config/clientAxios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
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
        console.log(data);
        //navigate('/projects');
        setLoading(false);

      } catch (error) {
        console.log(error);
      }

    }

    authUser();
  }, []);

  const logout = () => {
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        logout,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider};

export default AuthContext;