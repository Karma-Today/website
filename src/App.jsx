import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Faq from './pages/faq/faq.jsx';
import SEO from './components/Seo/Seo.jsx';
function App() {
  return (
    <Router>
        <SEO
        title="Karma"
        description="Karma white paper - donation"
        keywords="react, seo, helmet"
        image="https://example.com/image.jpg"
        url="https://example.com"
        type="website"
      />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faq" element={<Faq />} />
        </Routes>
    </Router>
  );
}

export default App;