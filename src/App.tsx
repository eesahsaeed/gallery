
import {HashRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import NotFound404 from './components/NotFound404';
import GalleryList from './GalleryList';
import Footer from './components/Footer';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<GalleryList />}></Route>
            <Route path='*' element={<NotFound404 />}></Route>
          </Routes>
        </div>
        <Footer />
      </div >
    </HashRouter>
  );
}

export default App;
