
import DoorList from '../backfront/Connection'
import { BrowserRouter, Routes, Route, UNSAFE_DataRouterContext } from 'react-router-dom';
import Add from './Add';
import Update from './Update';
import Signup from '../Login';
import Signupp from '../Signup';
import Logout from './logout';




function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DoorList/>}></Route>
        <Route path='/Add' element={<Add/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/login' element={<Signup/>}></Route>
        <Route path='/signup' element={<Signupp/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
