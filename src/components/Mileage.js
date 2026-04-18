import React, { useState, useEffect } from 'react';
import './component.css';
// import FuelRate from './FuelRate';

// state


export default function Mileage(props) {
  const [km, setKm] = useState('');
  const [price, setPrice] = useState('');
  const [average, setAverage] = useState('');
  const [result, setResult] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);
  const [petrol, setPetrol] = useState(null);
  const [petrolNeeded, setPetrolNeeded] = useState(null);
  const [Tax, setTax] = useState(null);
  const [ActFuelCost, setActFuelCost] = useState(null);


  useEffect(() => {
    if ((km || average || price)) {
      handleClick();
    }
  }, [km, average, price]);

  const handleClick = () => {

    const kmVal = parseFloat(km);
    const priceVal = parseFloat(price);
    const avgVal = parseFloat(average);

    if (!isNaN(kmVal) && !isNaN(priceVal) && !isNaN(avgVal) && avgVal !== 0) {
      const fuelUsed = kmVal / avgVal;
      const cost = fuelUsed * priceVal;
      const perKmRate = cost / kmVal;
      setTotal(cost.toFixed(0));
      setResult(perKmRate.toFixed(2));
      setPetrolNeeded(km / average);
      setActFuelCost(cost.toFixed(2) / (1 + 0.60));
      setTax(cost.toFixed(2) - (cost.toFixed(2) / (1 + 0.60)));
      setError(null);
    }
    else if (!isNaN(kmVal) && !isNaN(avgVal) && avgVal !== 0) {
      setPetrolNeeded(km / average);
      setError(null);
      setTotal(null);
      setResult(null);
      setPetrol(null);
      setTax(null);
      setActFuelCost(null);

    } else {
      setError('Insert any two values to calculate the third one correctly.');
      setTotal(null);
      setResult(null);
      setPetrol(null);
      setTax(null);
      setActFuelCost(null);
      setPetrolNeeded(null);
    }
  };

  return (
    // <div className='two-column-grid'>
    <div className="component">
      <h3>{props.title}</h3>
      <div className="left-column">
        <div className="mb-3">
          <label htmlFor="Distance">Distance (km)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input className="input" value={km} onChange={(e) => setKm(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="average">Car Mileage (km/l)</label>
          <input className="input" value={average} onChange={(e) => setAverage(e.target.value)} rows="1" />
        </div>
        <div className="mb-3">
        <label htmlFor="price">Fuel Price Per Liter</label>
        <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} rows="1" />
      </div>
      <h3 />
      <button className='btn btn-primary' onClick={handleClick}>Calculate</button>
    </div>
      { petrolNeeded && <h6>Petrol Needed (in litres): {petrolNeeded.toFixed(2)} L</h6> }
  { result && <h6>Per Km Rate: ₹{result}</h6> }
  { total && <h6>Total Fuel Cost: ₹{total}</h6> }
  { petrol && <h6>Petrol Needed (in litres): {petrol.toFixed(2)} L</h6> }

  { ActFuelCost && <h6>Fuel Cost without TAX: ₹{ActFuelCost.toFixed(2)}</h6> }
  { Tax && <h6>30% Tax Paid to Earn (₹{total}): ₹{(30 / 100) * total}</h6> }
  { Tax && <h6>60% Tax Paid for Pertol: ₹{Tax.toFixed(2)}</h6> }
  { Tax && <h6>Total Tax Paid: ₹{((30 / 100) * total) + Tax}</h6> }

  { error && <h6 style={{ color: 'red' }}>{error}</h6> }

    </div >
    // {/* <div className="right-column"><FuelRate /></div> */}
    // {/* </div> */}
  );
}