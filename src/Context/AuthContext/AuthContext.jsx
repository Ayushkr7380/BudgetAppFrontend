import { CreateAuthContext } from "./CreateAuthContext";

function AuthContext(props){
    return(
        <>
            <CreateAuthContext.Provider value={{}}>
                {props.children}
            </CreateAuthContext.Provider>
        </>
    )
}

export default AuthContext;