import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import PomodoroPage from './pages/PomodoroPage'
import StopwatchPage from './pages/StopwatchPage'
import TimerPage from './pages/TimerPage'
import NotFoundPage from './pages/NotFoundPage'



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* A rota padrão  será a página Pomodoro */}
        <Route index element={<PomodoroPage />} />
        <Route path='stopwatch' element={<StopwatchPage />} />
        <Route path='timer' element={<TimerPage />} />

        {/* Rota para qualquer outro caminho não definido */}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
