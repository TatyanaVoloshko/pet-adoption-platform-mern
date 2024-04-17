//frontend/src/hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
/*^^imports the AuthContext defined, which holds authentication state and functions.*/


const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
