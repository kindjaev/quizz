const FirstPage = (props) => {
    return ( 
        <div className="first">
            <div className="sub-first">
                <h1>Quizzical</h1>
                <p>Description</p>
                <button onClick={props.click}>Start quiz</button>
            </div>
        </div>
     );
}
 
export default FirstPage;