
import DoorList from '../backfront/Connection'
import { BrowserRouter, Routes, Route, UNSAFE_DataRouterContext } from 'react-router-dom';
import Add from './Add';
import Update from './Update';




function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DoorList/>}></Route>
        <Route path='/Add' element={<Add/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
    

    </>
  )
}

export default App
