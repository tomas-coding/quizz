
import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './JavaScriptLogo'
import { Start } from './start'
import { useQuestionStore } from './store/questions'
import { Game } from './Game'
import { Footer } from './Footer'



function App() {
  const preguntas = useQuestionStore(state => state.preguntas)
  console.log(preguntas)
  return (
    <main>
      <Container maxWidth='sm'>
        <Typography variant='h2' component='h1'>
          <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
            <JavaScriptLogo/>
            
           JavaScript Quizz
          </Stack>
          {preguntas.length === 0 && <Start/>}
          {preguntas.length > 0 && <Game/>}
          <Footer/>
        </Typography>
      </Container>
    </main>
  )
}

export default App
