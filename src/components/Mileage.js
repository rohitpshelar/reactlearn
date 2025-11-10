import React, {useState} from 'react'

// state


export default function Mileage(props) {
 const [km, setKm] = useState('');
  const [price, setPrice] = useState('');
  const [average, setAverage] = useState('');
  const [result, setResult] = useState(null);
  const [total, setTotal] = useState(null);
  const [error, setError] = useState(null);
  

  const handleClick = () => {
    const kmVal = parseFloat(km);
    const priceVal = parseFloat(price);
    const avgVal = parseFloat(average);

    if (!isNaN(kmVal) && !isNaN(priceVal) && !isNaN(avgVal) && avgVal !== 0) {
      const fuelUsed = kmVal / avgVal;
      const cost = fuelUsed * priceVal;
      const perKmRate = cost / kmVal;
      setTotal(cost.toFixed(2));
      setResult(perKmRate.toFixed(2));
      setError(null);
    } else {
      setError('Invalid input');
      setTotal(null);
      setResult(null);
    }
  };

  return (
    <div className='component'>
      <h1>{props.title}</h1>
      <div className="mb-3">
        <h2>Km</h2>
        <textarea className="input" value={km} onChange={(e) => setKm(e.target.value)} rows="1" />
        <h2>Price</h2>
        <textarea className="input" value={price} onChange={(e) => setPrice(e.target.value)} rows="1" />
        <h2>Average</h2>
        <textarea className="input" value={average} onChange={(e) => setAverage(e.target.value)} rows="1" />
            <h3> </h3>
        <button className='btn btn-primary' onClick={handleClick}>Calculate</button>
        {result && <h3>Per Km Rate: ₹{result}</h3>}
        {total && <h3>Total Cost: ₹{total}</h3>}
        {error && <h3 style={{color: 'red'}}>{error}</h3>}
      </div>
    </div>
  );
}
