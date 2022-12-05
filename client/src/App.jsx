import React from 'react'
import { Routes, Route } from 'react-router'
import './App.css'
import { Homepage, Lobby, Leaderboardpage, Questionpage } from './pages'
import { NavBar } from './components'
import { useUpdateAppState } from './context'


const updateInitAppState = async () => {
  const [state, setState ] = useUpdateAppState()
  const scores = await fetch('http://localhost:8080/api/highscores').then(res => res.json())
  setState({type: 'UPDATE_LEADERBOARD', payload: scores})
}

function App() {
  updateInitAppState()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Homepage />}></Route>
          <Route path="lobby" element={<Lobby />}></Route>
          <Route path="leaderboard" element={<Leaderboardpage />}></Route>
          <Route path="question" element={<Questionpage />}></Route>
          {/* <Route path='play'></Route> */}
        </Route>
        <Route path="*" element={<h1>404</h1>}></Route>
      </Routes>
    </div>
  )
}

export default App
