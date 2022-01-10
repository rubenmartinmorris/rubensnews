import './App.css';
import { Nav } from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DisplayArticles } from './components/DisplayArticles';
import { Header } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Nav />
        <Routes>
          <Route path='/' element={<DisplayArticles />} />
          <Route path='/coding' element={<DisplayArticles page='coding' />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;