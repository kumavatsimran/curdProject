import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './component/Form'
import Tablepage from './component/Tablepage'
import EditPage from './component/EditPage'
import Navbar from './component/Navbar';

function App() {

  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Form/>}></Route>
    <Route path="/TablePage" element={<Tablepage/>}></Route>
    <Route path="/Editpage/:id" element={<EditPage/>}></Route>

   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
