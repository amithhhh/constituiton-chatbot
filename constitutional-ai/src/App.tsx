import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/home/Home';
import ChatInterface from './components/chat/ChatInterface';
import ArticleGrid from './components/articles/ArticleGrid';
import About from './components/about/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10 selection:text-primary">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/articles" element={<ArticleGrid />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
