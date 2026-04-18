import React, { useState } from 'react';

export default function RentTaxCalculator() {
  const [income, setIncome] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [propertyValue, setPropertyValue] = useState('');

  const handleAmount = (e) => {
    const raw1 = e.toString().replaceAll(",", ""); // Remove non-digits
    const raw = raw1.toString().replaceAll(/\D/g, ""); // Remove non-digits
    const formatted = new Intl.NumberFormat('en-IN').format(raw);
    return (raw === "" ? "" : formatted);
  };

  const slabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 0.05 },
    { min: 800000, max: 1200000, rate: 0.10 },
    { min: 1200000, max: 1600000, rate: 0.15 },
    { min: 1600000, max: 2000000, rate: 0.20 },
    { min: 2000000, max: 2400000, rate: 0.25 },
    { min: 2400000, max: Infinity, rate: 0.30 },
  ];

  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(value);
  };

  const rebate = income.replaceAll(",", "") * 0.3;
  const numericIncome = parseFloat(income.replaceAll(",", "") - rebate) || 0;

  // compute breakdown using a for loop
  const breakdown = [];
  let totalTax = 0;
  let totalTaxable = 0;
  for (let i = 0; i < slabs.length; i++) {
    const s = slabs[i];
    const taxableInSlab = Math.max(0, Math.min(numericIncome, s.max) - s.min);
    const taxForSlab = taxableInSlab * s.rate;
    breakdown.push({
      range: s.max === Infinity ? `Above ${formatINR(s.min)}` : `${formatINR(s.min + 1)} - ${formatINR(s.max)}`,
      taxable: taxableInSlab,
      rate: s.rate,
      tax: taxForSlab,
    });
    totalTax += taxForSlab;
    totalTaxable += taxableInSlab;
  }

  const cess = totalTax * 0.04; // 4% health and education cess
  const taxWithCess = totalTax + cess;
  const afterTaxIncome = numericIncome + rebate - taxWithCess;

  return (
    <div className="component">
      <h3>Rent Tax Calculator(New Regime)</h3>

<div className="left-column">
      <div className="mb-3" >
        <label htmlFor="income">Enter Annual Income (₹)</label>
        <input
          id="income"
          className="input"
          value={income}
          onChange={(e) => { setIncome(handleAmount(e.target.value)); setMonthlyIncome(handleAmount(((e.target.value).replaceAll(",", "") / 12).toFixed(0))) }}
          placeholder="e.g. 5,71,452"
        />
       

      </div>
      {propertyValue && <div style={{ color: 'red', fontSize: '10px', marginTop: '-18px' }}>Note: Annual Income should be in ( 4% - 6% ) : {(propertyValue.replaceAll(",", "") * 0.048).toFixed(0)} - {(propertyValue.replaceAll(",", "") * 0.072).toFixed(0)}.</div>}
      <h1>OR</h1>
      <div className="mb-3">
        <label htmlFor="monthlyIncome">Enter Monthly Income</label>
        <input
          id="monthlyIncome"
          className="input"
          value={monthlyIncome}
          onChange={(e) => { setIncome(handleAmount((e.target.value).replaceAll(",", "") * 12)); setMonthlyIncome(handleAmount((e.target.value))) }}
          placeholder="e.g. 47,621"
        />
      </div>
       {propertyValue && <div style={{ color: 'red', fontSize: '10px', marginTop: '-18px' }}>Note: Monthly Income should be in ( 4% - 6% ) : {(propertyValue.replaceAll(",", "") * 0.004).toFixed(0)} - {(propertyValue.replaceAll(",", "") * 0.006).toFixed(0)}.</div>}

      </div>
     
       <label htmlFor="propertyValue">Property value (₹)</label>
        <input
          id="propertyValue"
          className="input"
          value={propertyValue}
          onChange={(e) => { setPropertyValue(handleAmount(e.target.value)); }}
          placeholder="e.g. 5,71,452"
        />
      {income && <h3>{`Less 30% of Deductions: ${formatINR(rebate)}`}</h3>}

      {income && <table className="table">
        <thead>
          <tr>
            <th>Slab</th>
            <th>Taxable Amount</th>
            <th>Rate</th>
            <th>Tax for Slab</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((r, idx) => (
            <tr key={idx}>
              <td>{r.range}</td>
              <td>{formatINR(r.taxable)}</td>
              <td>{r.rate === 0 ? 'Nil' : `${(r.rate * 100).toFixed(0)}%`}</td>
              <td>{formatINR(r.tax)}</td>
            </tr>
          ))}
          <tr>
            <td><strong>Totals</strong></td>
            <td><strong>{formatINR(totalTaxable)}</strong></td>
            <td></td>
            <td><strong>{formatINR(totalTax)}</strong></td>
          </tr>
        </tbody>
      </table>}

      <div >
        {income && <h3>Summary</h3>}
        {income && <h6>Gross Income: {formatINR(numericIncome + rebate)}</h6>}
        {totalTax > 0 && <h6>Total Tax: {formatINR(totalTax)}</h6>}
        {cess > 0 && <h6>Cess (4%): {formatINR(cess)}</h6>}
        {taxWithCess > 0 && <h6>Total Tax with Cess: {formatINR(taxWithCess)}</h6>}
        {taxWithCess > 0 && <h6>After-tax Income: {formatINR(afterTaxIncome)}</h6>}
        {propertyValue && income && <h6>Rental Yield (4% - 6%) : ${((afterTaxIncome) / (propertyValue.replaceAll(",", "")) * 100).toFixed(2)}%</h6>}
        {taxWithCess > 0 && <h6>After-tax Monthly Income: {formatINR((afterTaxIncome / 12).toFixed(0))}</h6>}
      </div>
    </div>
  );
}
