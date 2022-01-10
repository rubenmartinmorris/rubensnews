import './App.css';
import { Nav } from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DisplayArticles } from './components/DisplayArticles';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Nav />
        <Routes>
          <Route path='/' element={<DisplayArticles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
