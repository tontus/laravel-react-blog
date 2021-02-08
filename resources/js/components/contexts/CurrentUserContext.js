import React, {useState} from "react";
import {checkAuth} from "../../services/AuthService";

export const CurrentUserContext = React.createContext("light");

export const CurrentUserProvider = (props) =>{
    const[currentUser,setCurrentUser] = useState(() => {
        if (checkAuth()) {
            return checkAuth()
        } else return null
    })
    return(
        <>
            <CurrentUserContext.Provider value={[currentUser,setCurrentUser]}>
                {props.children}
            </CurrentUserContext.Provider>
        </>
    )
}

