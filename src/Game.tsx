import { Card, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionStore } from "./store/questions";
import { type Pregunta as TipoPregunta} from './types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import {gradientDark} from "react-syntax-highlighter/dist/esm/styles/hljs"
import { ArrowBack, ArrowForward,  } from "@mui/icons-material";

const Pregunta = ({info}: {info:TipoPregunta}) => {
    const preguntaSeleccionada= useQuestionStore(state => state.preguntaSeleccionada)
    const createHandleClick = (respuestaIndex:number) =>() => {
        preguntaSeleccionada(info.id,respuestaIndex)
    }
const getBackgroundColor = (index:number) => {
    const { userSelectedAnswer, respuestaCorrecta} = info
    if (userSelectedAnswer == null) return 'transparent'
    if (index!== respuestaCorrecta && index !== userSelectedAnswer) return 'transparent'   
    if (index=== respuestaCorrecta) return 'green'
    if(index=== userSelectedAnswer) return 'red'
    return 'transparent'
    
}
    return (
        <Card variant="outlined" sx={{textAlign:'left', p:'2', fontSize:"20px",bgcolor:"#333", marginTop:"4"}}>
            <Typography variant="h5">
                {info.pregunta}
            </Typography>
            <SyntaxHighlighter  language="javascript" style={gradientDark}>
                {info.codigo}

            </SyntaxHighlighter>

            <List sx={{ bgcolor:"#333"}} disablePadding>
                {info.respuestas.map((respuesta,index) =>(
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                        disabled={info.userSelectedAnswer != null }
                        onClick={createHandleClick(index)}
                        sx={{backgroundColor:getBackgroundColor( index)}}>
                            <ListItemText primary={respuesta} sx={{fontWeight:'bold', textAlign:'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )
}

export const Game = () =>{
    const preguntas = useQuestionStore(state => state.preguntas)
    const preguntaActual = useQuestionStore(state => state.preguntaActual)
    const preguntaInfo = preguntas[preguntaActual]
    const goNext = useQuestionStore(state => state.goNextQuestion)
    const goPrev = useQuestionStore(state => state.goPrevQuestion)
    return(
        <>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPrev} disabled={preguntaActual === 0}>
            <ArrowBack/>
        </IconButton>
        {preguntaActual + 1} / {preguntas.length}
        <IconButton onClick={goNext} disabled={preguntaActual >= preguntas.length -1}>
            <ArrowForward/>
        </IconButton>
        </Stack>
        <Pregunta info={preguntaInfo}/>
        </>
        )
}