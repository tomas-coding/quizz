import {create} from 'zustand'
import {Pregunta} from '../types'
import confetti from 'canvas-confetti' 

interface State {
    preguntas: Pregunta[]
    preguntaActual: number;
    fetchPreguntas: (limit:number) => Promise<void>
    preguntaSeleccionada: (preguntaId:number, respuestaIndex:number) => void
    goNextQuestion: () => void
    goPrevQuestion: () => void
}
export const useQuestionStore = create<State>((set, get) => {
    return{
        loading:false,
        preguntas:[],
        preguntaActual: 0,

        fetchPreguntas: async (limit:number) => {
            const res = await fetch('https://quizz-pi-coral.vercel.app/data.json')
            const json = await res.json()
            const preguntas = json.sort(() => Math.random() - 0.5).slice(0, limit)
            set({preguntas})
        },
        preguntaSeleccionada:(preguntaId:number, respuestaIndex:number) =>{
            const {preguntas} = get()

            const newPreguntas = structuredClone(preguntas)
            const preguntaIndex= newPreguntas.findIndex(q=>q.id === preguntaId)
            const preguntaInfo = newPreguntas[preguntaIndex]
            const isCorrectSelectedAnswer = preguntaInfo.respuestaCorrecta === respuestaIndex
            if(isCorrectSelectedAnswer) confetti()

            newPreguntas[preguntaIndex] = {
                ...preguntaInfo,
                isCorrectSelectedAnswer,
                userSelectedAnswer: respuestaIndex
            }
            set({preguntas: newPreguntas})
        },
        goNextQuestion: () =>{
            const {preguntaActual, preguntas} = get()
            const nextQuestion = preguntaActual + 1
            if(nextQuestion< preguntas.length) {
                set({preguntaActual:nextQuestion})
            }
        },
        goPrevQuestion: () =>{
            const {preguntaActual} = get()
            const prevQuestion = preguntaActual - 1
            if(prevQuestion>= 0) {
                set({preguntaActual:prevQuestion})
            }
        }
    }
})