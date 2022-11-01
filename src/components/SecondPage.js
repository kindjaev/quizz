import Question from "./Question"
import useFetch from "../useFetch"

const SecondPage = () => {
    
    const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986"

    const {count, quizz, pending, error, isComplete, checked, selectedAnswer, newQuizz} = useFetch(url)

    const quizzEl = quizz.map(el => {
        return (
            <Question 
                count={count}
                key={el.id}
                id={el.id}
                question={el.question}
                correct={el.correct_answer}
                incorrect={el.incorrect_answers}
                title={el.question}
                complete={isComplete}
                selectedAnswer={(ev) => selectedAnswer(ev, el.id)}
            />
        )
    })
    const btn = 
        <div className="check-btn">{
                !isComplete 
                ? <button onClick={checked}>Check Answers</button> 
                : <div className="newQuizz-btn">
                    <button onClick={newQuizz}>Start new quizz</button>
                    <h3>You scored {count}/10 correct asnwers</h3>
                </div>
        }</div>

    const loading = 
        <div className="load">
            <div className="load-text">Loading...</div>
            <div className="load-icon"></div>
        </div>

   return (
     
        <div className="second">
            {error && <div>{error}</div>}
            {pending ? loading : quizzEl}
            {!pending && btn}
            
        </div>
 
   )
}
 
export default SecondPage;