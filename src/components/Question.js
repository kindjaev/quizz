
import {useEffect, useState} from "react"
import {nanoid} from "nanoid"

const blue = "#D6DBF5"
const red = "#F8BCBC"
const green = "#94D7A2"

const Question = (props) => {

    const [answers, setAnswers] = useState([])

    const allAnswers = [props.correct, ...props.incorrect]
    const decodedAnswers = allAnswers.map(el => {
        return {
            text: decodeURIComponent(el),
            id: nanoid(),
            selectedBtn: false,
            selectedAnswer: "",
            active: false,
        }
    })
    const decodedCorrect = decodeURIComponent(props.correct)

    // shuffle answers and save it in state:
    useEffect(() => {
        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
          }
        setAnswers(shuffle(decodedAnswers))
    }, [])

    function handleClick(ev, id){
        setAnswers(prev => prev.map(el => {
            return el.id === id 
            ? {...el, selectedBtn: !el.selectedBtn, selectedAnswer: ev.target.innerText} 
            : {...el, selectedBtn: false}
        }))
    }

    function style(selectedBtn, complete, selectedAnswer){
        let styles
        if(selectedBtn){
            styles = {backgroundColor: blue}
        }
        if(complete){
            styles = {backgroundColor: decodedCorrect === selectedAnswer ? green : red}
        }
        return styles
    }

    return ( 
        <div>
            <h2 className="title">{decodeURIComponent(props.title)}</h2>
            {answers && answers.map(answ => {
                return (
                    <button 
                        className="btn"
                        key={answ.id}
                        id={answ.id}
                        onClick={(ev) => {handleClick(ev, answ.id); props.selectedAnswer(ev)}}
                        style={style(answ.selectedBtn, props.complete, answ.selectedAnswer)}
                        disabled={props.complete ? true : false}
                    >{answ.text}</button>
                )}       
            )}
            <hr className="hr"/>
        </div>
     );
}
 
export default Question;