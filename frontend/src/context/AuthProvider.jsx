import {useState, useEffect, createContext} from 'react';
import clientAxios from '../config/clientAxios';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authUser = async () => {

      const token = localStorage.getItem('token');

      // if the token is null
      if (!token) {
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
    }
    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider};

export default AuthContext;