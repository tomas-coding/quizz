export interface Pregunta {
    id: number;
    pregunta: string;
    codigo: string;
    respuestas: string[];
    respuestaCorrecta:number;
    userSelectedAnswer?:number;
    isCorrectSelectedAnswer?:boolean;

}