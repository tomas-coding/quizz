import { useQuestionStore } from "./store/questions"
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const Footer = () =>{
    const preguntas = useQuestionStore(state => state.preguntas)
    
    let correct = 0
    let incorrect = 0
    let unanswered = 0
    preguntas.forEach(pregunta =>{ 
        if (pregunta.userSelectedAnswer == null) unanswered++;
        else if (pregunta.userSelectedAnswer == pregunta.respuestaCorrecta) correct++;
        else incorrect++;
    })
    return(
        <footer style={{marginTop: "16px"}}>
            <strong style={{fontSize:"16px"}}><CheckCircleOutlineSharpIcon style={{color:"green", paddingTop:"10px"}} />{`Correctas: ${correct}  - `}
            <NotInterestedIcon style={{color:"red", paddingTop:"10px"}}/>{` Incorrectas: ${incorrect}  - `}<QuestionMarkIcon style={{ paddingTop:"10px"}}/>{`Sin Responder: ${unanswered} `}</strong>
        </footer>
    )
}