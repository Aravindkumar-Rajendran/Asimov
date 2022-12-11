import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/home';
import RandomVocabulary from './pages/random_vocabulary';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/random_vocabulary" element={<RandomVocabulary/>} />
          <Route path="/grammar_builder" element={<>grammar_builder</>} />
          <Route path="/dialogues" element={<>dialogues</>} />
          <Route path="/free_flow_conversations" element={<>free_flow_conversations</>} />
          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
