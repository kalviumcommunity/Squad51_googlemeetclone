
import DoorList from '../backfront/Connection'
import { BrowserRouter, Routes, Route, UNSAFE_DataRouterContext } from 'react-router-dom';
import Add from './Add';
import Update from './Update';
import Signup from '../Login';




function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DoorList/>}></Route>
        <Route path='/Add' element={<Add/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
