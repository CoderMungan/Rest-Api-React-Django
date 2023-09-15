import { Routes, Route } from 'react-router-dom';
import './App.css';



// sayfalarımız
import Home from './Pages/Home';
import SingleNote from './Pages/SingleNote';



function App() {
  return (
  
    <>


      <Routes>


        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/notlar/:id' element={<SingleNote></SingleNote>}></Route>
      </Routes>

    </>
  );
}

export default App;
