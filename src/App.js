import "./App.css";
import { DashtoonProvider } from "./Hooks/useDashtoonContext";
import Home from "./Pages/Home/Home";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <DashtoonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DashtoonProvider>
  );
}

export default App;
