import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MusicPage from './pages/music';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/music' element={<MusicPage />} />


        </Routes>
      </Router>
    </>

    
  );
}

export default App;
