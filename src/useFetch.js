import {useState, useEffect} from "react"
import {nanoid} from "nanoid"

const useFetch = (url) => {
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)
    const [quizz, setQuizz] = useState([])
    const [isComplete, setIsComplete] = useState(false)
    const [isStart, setIsStart] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const abortController = new AbortController()
        
        fetch(url, {signal: abortController.signal})
        .then(res => {
            if(!res.ok){
                throw Error("Couldn't find the data")
            }
            return res.json()
        })
        .then(data => {
            setQuizz(data.results.map(el => {
                return {
                    ...el,
                    id: nanoid(),
                    selected: "",
                }
            }))
            setPending(false)
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log("Fetch Aborted")
            } else {
                setError(err.message)
                setPending(false)
            }
        })
        return () => abortController.abort()
    },[isStart])
    
    function selectedAnswer(ev, id){
        setQuizz(prev => prev.map(el => (
            el.id === id ? {...el, selected: ev.target.innerText} : el
        )))
    }

    function checked(){
        const allSelected = quizz.every(el => el.selected)
        setIsComplete(allSelected ? true : false)
        const cor = quizz.filter(el => el.selected === decodeURIComponent(el.correct_answer))
        setCount(cor.length)
    }

    function newQuizz(){
        setIsComplete(false)
        setIsStart(prev => !prev)
        setPending(true)
    }
    return {count, pending, quizz, error, isComplete, checked, selectedAnswer, newQuizz};
}
 
export default useFetch;