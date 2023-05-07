import './App.css';
import Form from './components/Form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path='/table' element={<Table />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
