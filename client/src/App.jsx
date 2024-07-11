import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import TangCollection from './pages/TangCollection';
import SongCi from './pages/SongCi';
import ShijingPoem from './pages/ShijingPoem';
import About from './pages/About';
import SearchPage from './pages/SearchPage';
import ScrollToUp from './components/ScrollToUp';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow mt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tang" element={<TangCollection />} />
            <Route path="/song" element={<SongCi />} />
            <Route path="/shi_jing" element={<ShijingPoem />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
      <ScrollToUp />
    </Router>
  );
};

export default App;