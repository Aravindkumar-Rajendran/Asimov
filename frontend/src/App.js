import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/home';
import ChatBox from './pages/chatBox';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/random_vocabulary" element={<ChatBox Label="Random Vocabylary"/>} />
          <Route path="/grammar_builder" element={<ChatBox Label="Grammar Builder"/>} />
          <Route path="/dialogues" element={<ChatBox Label="Dialogues"/>} />
          <Route path="/free_flow_conversations" element={<ChatBox Label="Free Flow Conversations"/>} />
          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
