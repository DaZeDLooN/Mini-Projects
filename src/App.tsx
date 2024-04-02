import { Routes, Route } from "react-router-dom";
import {Signin, Signup} from './views'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
