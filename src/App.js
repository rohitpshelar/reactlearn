import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Mileage from './components/Mileage';
import Navbar from './components/Navbar';
import Textform from './components/Textform';
import Fuel from './components/FuelRate';

function App() {
  return (
    <>
      <BrowserRouter basename="/reactlearn">
        <Navbar />
        <Routes>
          <Route path="/textform" element={<Textform title={"Text Converter"} />} />
          <Route path="/mileage" element={<Mileage title={"Car Expense"} />} />
          {/* <Route path="/fuel" element={<Fuel title={"Text Converter"} />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
