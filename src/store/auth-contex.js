import React , {useState , useEffect }from "react";


const AuthContext = React.createContext({
    isLoggedIn : false,
    onLogout : ()=>{},
    onLogin : (email , password)=>{}
});


export const AuthContextProvider = (props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loginHandler = (email, password) => {
        localStorage.setItem("isuserlogin","1");
        setIsLoggedIn(true);
      };
      useEffect(()=>{
        const storedUserLoggedinInformation = localStorage.getItem("isuserlogin");
    
    if(storedUserLoggedinInformation=== '1'){
      setIsLoggedIn(true)
    }
    
      },[])
      const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isuserlogin")
      };
    return(
        <AuthContext.Provider value={{
            isLoggedIn : isLoggedIn,
            onLogout : logoutHandler,
            onLogin : loginHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;