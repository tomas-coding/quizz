import {Button} from "@mui/material"
import { useQuestionStore } from "./store/questions"
export const Start = () => {
    const LIMIT_QUESTIONS = 10;
    const fetchQuestions = useQuestionStore(state=>state.fetchPreguntas)
    const handleClick = () => {fetchQuestions(LIMIT_QUESTIONS)}
    return(
            <Button onClick={handleClick} variant="contained">
                ¡Empezar!
                </Button>
    )
}