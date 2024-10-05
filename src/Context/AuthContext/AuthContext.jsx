import { CreateAuthContext } from "./CreateAuthContext";

function AuthContent(props){
    return(
        <>
            <CreateAuthContext.Provider value={{}}>
                {props.children}
            </CreateAuthContext.Provider>
        </>
    )
}

export default AuthContent;