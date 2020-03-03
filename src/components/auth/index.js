import { API_URL } from '../../config';
import { DEFAULT_ACCOUNT_ID } from '../../config';

/******************************************************************
 *  This method will allow users to login to the application
 * @param {*} next 
 *****************************************************************/
export const login = (user) => {
   console.log("user in login method is: ", user);
   const url = `${API_URL}/users/login`;
   return fetch(url, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
   })
      .then(response => {
         return response.json()
      })
      .catch(err => {
         console.log(err)
      })
};


/******************************************************************
 * 
 * @param {*} next 
 *****************************************************************/
export const logout = (next) => {
   if (typeof window !== "undefined") {
      localStorage.removeItem('accessToken');
      next();

      fetch(`${API_URL}/users/logout`, {
         method: "GET"
      })
         .then(response => {
            console.log(response);
         })
         .catch(err => {
            console.log(err);
         })
   }
};

/*****************************************************************
 * This method will set the local storage after successful login
 * @param {*} data 
 * @param {*} next 
 *****************************************************************/
export const authenticate = (data, next) => {
   if (typeof window !== "undefined") {
      localStorage.setItem('accessToken', JSON.stringify(data.result));
      next();
   }
};


/*****************************************************************
 * This method will check if user has logged into the system or not
 * @param {*} user information 
 ****************************************************************/
export const register = (user) => {
   // DEFAULT ACCOUNT 
   if (user.AccountId === 0) {
      user.AccountId = DEFAULT_ACCOUNT_ID;
   }
   debugger;
   return fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
   })
      .then(response => {
         return response.json()
      })
      .catch(err => {
         console.log(err)
      })
};


/*****************************************************************
 * This method will check if user has logged into the system or not
 ****************************************************************/
export const isAuthenticated = () => {
   if (typeof window === "undefined") {
      return false;
   }
   //debugger;
   if (localStorage.getItem('accessToken')) {
      var user = JSON.parse(localStorage.getItem('accessToken'));
      return user;
   }
   else {
      return false;
   }
}



export const isAdmin = () => {
   if (typeof window === "undefined") {
      return false;
   }
   //debugger;
   if (localStorage.getItem('accessToken')) {
      var user = JSON.parse(localStorage.getItem('accessToken'));
      if (user.accessLevel === 10)
         return user
      else
         return false;
   }
   else {
      return false;
   }
};


export const isSuperAdmin = () => {
   if (typeof window === "undefined") {
      return false;
   }
   //debugger;
   if (localStorage.getItem('accessToken')) {
      var user = JSON.parse(localStorage.getItem('accessToken'));
      if (user.accessLevel === 1)
         return user
      else
         return false;
   }
   else {
      return false;
   }
}