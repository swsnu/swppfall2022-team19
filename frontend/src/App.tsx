import './App.css';

import HeroList from './containers/HeroList/HeroList';
import RealDetail from './components/RealDetail/RealDetail';
import NewHero from './containers/HeroList/NewHero/NewHero';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { ConnectedRouter } from 'connected-react-router';

function App() {
  return (
    <BrowserRouter>
      <div className="App" >
        <Routes>
          <Route path='/heros' element={<HeroList title={"MY FAVORITE HEROS"} />} />
          <Route path='/heros/:id' element={<RealDetail />} />
          <Route path='/new-hero' element={<NewHero />}  />
          <Route path='/' element={<Navigate replace to={'heros'} />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </div >
    </BrowserRouter>
  );
}

export default App;