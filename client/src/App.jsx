import { useState } from 'react'
import Canvas from './components/Canvas'
import { SettingBar } from './components/SettingBar'
import Toolbar from './components/Toolbar'

import './styles/App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Toolbar />
      <SettingBar/>
      <Canvas />
    </div>

    
  )
}

export default App
