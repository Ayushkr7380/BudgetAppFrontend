import { CreateDataContext } from "./CreateDataContext";

function dataContext(props){
    return(
        <>
            <CreateDataContext.Provider value={{}}>
                {props.children}
            </CreateDataContext.Provider>
        </>
    )
}

export default dataContext;