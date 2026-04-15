import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Mileage from './components/Mileage';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import FD from './components/FD';

function App() {
  return (
    <>
      <BrowserRouter basename="/reactlearn">
        <Navbar />
        <Routes>
          <Route path="/textform" element={<Textform title={"Text Converter"} />} />
          <Route path="/mileage" element={<Mileage title={"Car Expense"} />} />
          <Route path="/FD" element={<FD title={"Fix Deposit"} />} />
          {/* <Route path="/fuel" element={<Fuel title={"Text Converter"} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
