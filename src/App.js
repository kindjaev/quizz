import FirstPage from "./components/FirstPage"
import SecondPage from "./components/SecondPage"
import {useState} from "react"

function App() {
  const [start, setStart] = useState(false)
    function handleClick(){
        setStart(prev => !prev)
    }
    return (
        <div className="container">
            <img src="img/blob_yellow.png" alt="" className="yellow"/>
            {!start ? <FirstPage click={handleClick}/> : <SecondPage />}
            <img src="img/blob_blue.png" alt="" className="blue"/>  
        </div>
    )
}

export default App;
