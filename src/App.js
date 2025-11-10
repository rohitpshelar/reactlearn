import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Mileage from './components/Mileage';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Fuel from './components/FuelRate';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Textform" element={<Textform title={"Text Converter"} />} />
          <Route path="/Mileage" element={<Mileage title={"Car Expense"} />} />
          <Route path="/Fuel" element={<Fuel title={"Text Converter"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
