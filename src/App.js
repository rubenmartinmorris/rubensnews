import './App.css';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DisplayArticles } from './components/DisplayArticles';
import { Header } from './components/Header';
import { DisplayArticle } from './components/DisplayArticle';
import { UserProvider } from './contexts/UserContext';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className='App' className='justify-content-center'>
          <Container fluid='md'>
            <Header />

            <NavBar />
            <Routes>
              <Route path='/' element={<DisplayArticles page='home' />} />
              <Route path='/topics/:topic' element={<DisplayArticles />} />
              <Route
                path='/articles/:article_id'
                element={<DisplayArticle />}
              />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
