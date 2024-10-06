import { CreateDataContext } from "./CreateDataContext";

function DataContext(props){
    return(
        <>
            <CreateDataContext.Provider value={{}}>
                {props.children}
            </CreateDataContext.Provider>
        </>
    )
}

export default DataContext;