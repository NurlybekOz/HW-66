import { Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from "./components/NavBar/NavBar.tsx";
import Home from "./containers/Home/Home.tsx";
import EditFood from "./containers/EditFood/EditFood.tsx";
import NewFood from "./containers/NewFood/NewFood.tsx";

const App = () => {

  return (
      <>
        <header>
          <NavBar/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/meals' element={<Home/>}></Route>
              <Route path='/meals/:idFood/edit' element={<EditFood/>}></Route>
              <Route path='/meals/new-meal' element={<NewFood/>}></Route>


          </Routes>
        </main>
      </>
  )
};

export default App
