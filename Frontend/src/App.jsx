
import './App.css'
import DoorList from '../backfront/Connection'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './Add';



function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DoorList/>}></Route>
        <Route path='/Add' element={<Add/>}></Route>
      </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
