
export const ErrorModal=({error,unsetError})=>{

    return <div className="error-moadl">
        {error}
        <button onClick={unsetError}>Close</button>
    </div>
}