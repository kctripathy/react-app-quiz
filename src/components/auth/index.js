export const login = () =>{

};

export const authenticate = () => {

};


export const register = () => {

};


/**
 * This method will check if user has logged into the system or not
 */
export const isAuthenticated = () =>{
    
    if (typeof window === "undefined"){
       return false;
    }
    if (localStorage.getItem('accessToken')){
       return JSON.parse(localStorage.getItem('accessToken'));
    }
    else
    {
       return false; 
    }
 };