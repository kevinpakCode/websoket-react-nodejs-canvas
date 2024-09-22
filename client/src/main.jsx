import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import {BrowserRouter as Router, Routes, Route, redirect} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path='/:id' element={<App/>}/>
        {/* {redirect(`f${+new Date().toString(16)}`)} */}
        {/* <Redirect to={`f${+new Date().toString(16)}`}/> */}
      </Routes>
    </Router>

)
