import React, { useState, useEffect } from 'react';
import './component.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

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
    <div className="component">
      <h3>{props.title}</h3>
      <div className="left-column">
        <div className="mb-3">
          <TextField id="km" value={km} placeholder="e.g. 60" onChange={(e) => setKm(e.target.value)}
            sx={{ width: 90, maxWidth: '100%' }}
            label="Km" variant="outlined" />
          &nbsp;&nbsp;&nbsp;
          <TextField id="average" value={average} placeholder="e.g. 12" onChange={(e) => setAverage(e.target.value)}
            sx={{ width: 90, maxWidth: '100%' }}
            label="Average" variant="outlined" />
          &nbsp;&nbsp;&nbsp;
          <TextField id="price" value={price} placeholder="e.g. 92" onChange={(e) => setPrice(e.target.value)}
            sx={{ width: 90, maxWidth: '100%' }}
            label="Price" variant="outlined" />
        </div>

        <button className='btn btn-primary' onClick={handleClick}>Calculate</button>
      </div>

      <table className="summary-table" style={{ width: '100%', tableLayout: 'fixed' }}>
        <thead>
          <tr>
              {petrolNeeded && <td width='60%'><h6><spam className="summary-cell-key">Fuel Needed</spam><br/> {petrolNeeded.toFixed(2)} ( kg or L )</h6></td>}
              {result && <td><h6><spam className="summary-cell-key">Per Km Rate</spam><br/> ₹ {result}</h6></td>}
              {total && <td><h6><spam className="summary-cell-key">Total Fuel Cost</spam><br/> ₹ {total}</h6></td>}
          </tr>
          <tr>
              {Tax && <td><h6><spam className="summary-cell-key">60% GTS Tax Paid for fuel</spam><br/> ₹ {Tax.toFixed(0)}</h6></td>}
          
            {ActFuelCost && <td><h6><spam className="summary-cell-key">Fuel Cost without GST TAX</spam><br/> ₹ {ActFuelCost.toFixed(0)}</h6></td>}
          </tr>
          <tr>
            {Tax && <td><h6><spam className="summary-cell-key">30% Income Tax Paid to Earn <br/><b>(₹ {total})</b></spam><br/> ₹ {((30 / 100) * total).toFixed(0)}</h6></td>}
            {Tax && <td><h6><spam className="summary-cell-key">Fuel Cost without GST & Income TAX</spam> <br/> ₹ {total - (((30 / 100) * total) + Tax).toFixed(0)}</h6></td>}
         
          </tr>
          <tr>
            {Tax && <td><h6><spam className="summary-cell-key">Total Tax Paid</spam><br/> ₹ {(((30 / 100) * total) + Tax).toFixed(0)}</h6></td>}
          </tr>
      
        </thead>
      </table>


      {/* {petrolNeeded && <h6>Fuel Needed : {petrolNeeded.toFixed(2)} ( kg , L )</h6>}
      {result && <h6>Per Km Rate: ₹ {result}</h6>}
      {total && <h6>Total Fuel Cost: ₹ {total}</h6>}
      {petrol && <h6>Petrol Needed (in litres): {petrol.toFixed(2)} L</h6>}

      {ActFuelCost && <h6>Fuel Cost without TAX: ₹ {ActFuelCost.toFixed(0)}</h6>}
      {Tax && <h6>30% Tax Paid to Earn (₹ {total}): ₹ {((30 / 100) * total).toFixed(0)}</h6>}
      {Tax && <h6>60% Tax Paid for Pertol: ₹ {Tax.toFixed(0)}</h6>}
      {Tax && <h6>Total Tax Paid: ₹ {(((30 / 100) * total) + Tax).toFixed(0)}</h6>} */}

      {/* {error && <h6 style={{ color: 'red' }}>{error}</h6>} */}

    </div >
  );
}