import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



export default function FD(props) {



    const [amount, setAmount] = useState('');
    const [percent, setPercent] = useState('');
    const [years, setYears] = useState('');
    const [months, setMonths] = useState('');
    const [days, setDays] = useState('');

    const handleClick = () => {
        // show the computed schedule when user clicks
    }

    const handleInput = (e) => {
        const raw = e.target.value.replace(/\D/g, ""); // Remove non-digits
        const formatted = new Intl.NumberFormat('en-IN').format(raw);
        setAmount(raw === "" ? "" : formatted);
    };

    const formatINR = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            currencyDisplay: 'narrowSymbol',
        }).format(amount).replace('₹', ' ');
    };

    const numericAmount = parseFloat(amount.replaceAll(",", "")) || 0;
    const numericPercent = parseFloat(percent) || 0;
    const numericYears = parseFloat(years, 10) || 0;
    const numericMonths = parseInt(months, 10) || 0;
    const numericDays = parseInt(days, 10) || 0;

    // const formattedPrice = formatINR(numericAmount);
    // const annualReturn = numericAmount * numericPercent / 100;

    const schedule = [];
    let runningPrincipal = numericAmount;
    let totalInterest = 0;
    if (years && numericAmount > 0 && numericPercent >= 0 && numericYears > 0) {
        for (let y = 1; y <= numericYears; y++) {
            // const interestEarned = runningPrincipal * numericPercent / 100;
            const interestEarned = runningPrincipal * Math.pow(1 + (numericPercent / 400), 4) - runningPrincipal; // quarterly compounding
            const ending = runningPrincipal + interestEarned;
            schedule.push({ year: y, amount: runningPrincipal, interest: interestEarned, ending });
            totalInterest += interestEarned;
            runningPrincipal = ending; // compound for next year
        }
    }

    return (
        <>
            return for {days} days, is {(((schedule.length > 0 ? schedule[schedule.length - 1].ending : numericAmount) - amount.replaceAll(",", "")) / (years * 365)) * days}
            <div className='component'>
                <h4>{props.title} </h4>
                <div className="left-column">
                    <div className="mb-3">
                        <TextField id="amount" value={amount} onChange={handleInput}
                            sx={{ width: 170, maxWidth: '100%' }}
                            slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment>, }, }}
                            label="Amount" variant="outlined" placeholder="e.g. 2,00,000" />
                        &nbsp;&nbsp;&nbsp;
                        <TextField value={percent} onChange={(e) => setPercent(e.target.value)} id="percent" placeholder="e.g.. 8"
                            sx={{ width: 140, maxWidth: '100%' }}
                            slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment>, }, }}
                            label="Interest Rate" variant="outlined" />

                    </div>


                    <div className="mb-3">
                        <TextField value={years} onChange={(e) => { setYears(e.target.value); setMonths(e.target.value * 12); setDays(e.target.value * 365) }} id="years" placeholder="e.g. 1"
                            sx={{ width: 70, maxWidth: '100%' }}
                            label="Year" variant="outlined" />
                        <label style={{ fontSize: '30px' }}>=</label>
                        <TextField value={months} onChange={(e) => { setMonths(e.target.value); setYears(e.target.value / 12); setDays(e.target.value * 30) }} id="months" placeholder="12"
                            sx={{ width: 70, maxWidth: '100%' }}
                            label="Month" variant="outlined" />
                        <label style={{ fontSize: '30px' }}>=</label>
                        <TextField value={days} onChange={(e) => { setDays(e.target.value); setYears(e.target.value / 365); setMonths(e.target.value / 30) }} id="days" placeholder="365"
                            sx={{ width: 60, maxWidth: '100%' }}
                            label="Day" variant="outlined" />
                    </div>



                    <button className='btn btn-primary' onClick={handleClick}>Calculate</button>
                </div>
            </div>
           {amount && percent && years && (<span>Simple Interest Total Value = {formatINR((numericAmount.toFixed(0) * (Math.pow(1 + (numericPercent / 400), numericDays / 90))).toFixed(0))}</span>)}
           <br />
            {amount && percent && years && (<span>Quarterly Compound Interest Total Value = {formatINR(runningPrincipal)}</span>)}

            {amount && percent && years && (<table className="summary-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                <tbody>
                    <tr>
                        <td style={{ width: '10%' }}>
                            Simple Interest Return
                        </td>
                        <td style={{ width: '10%' }}>
                            {amount && percent && years && (
                                <div className="summary-cell-content">
                                    <span>Intrest Rate</span>
                                </div>
                            )}
                        </td>
                        <td style={{ width: '30%' }}>
                            {amount && percent && years && (
                                <div className="summary-cell-content">
                                    <span>Value</span>
                                </div>
                            )}
                        </td>

                    </tr>
                    <tr>
                        <td>{days < 30 && (<span> {days} Day</span>)}
                            {days > 30 && days < 365 && (<span> {numericMonths.toFixed(0)}  Month </span>)} {days > 30 && days < 365 && days - (numericMonths.toFixed(0) * 30) > 0 && (<span> and {days - (numericMonths.toFixed(0) * 30)} Day </span>)}
                            {days > 364 && (<span> {Math.floor(numericMonths / 12).toFixed(0)}  Year</span>)}  {days > 364 && numericMonths - (12 * Math.floor(numericMonths / (12)).toFixed(0)) > 0 && (<span> {numericMonths - (12 * Math.floor(numericMonths / (12)).toFixed(0))}  Month </span>)} {days > 364 && (days - (365 * numericYears.toFixed(0))) > 0 && (<span> and {days - (365 * numericYears.toFixed(0))} Day </span>)}
                        </td>
                        <td>{percent} %</td>
                        <td> {formatINR(((numericAmount * Math.pow(1 + (numericPercent / 400), numericDays / 90)) - numericAmount).toFixed(0))}</td>
                    </tr>
                    <tr>
                        <td>Yearly </td>
                        <td>{(percent * (12 * years) / months).toFixed(2)} %</td>
                        <td>{formatINR(numericAmount * (percent * (12 * years) / months).toFixed(2) / 100)}</td>
                    </tr>
                    <tr>
                        <td>Monthly </td>
                        <td>{((percent * (12 * years) / months) / 12).toFixed(2)} %</td>
                        <td>{formatINR((numericAmount * (percent * (12 * years) / months).toFixed(2) / 100) / 12)}</td>
                    </tr>
                    <tr>
                        <td>Daily </td>
                        <td>{(((percent * (12 * years) / months) / 12) / 30).toFixed(4)} %</td>
                        <td>{formatINR(numericAmount * (((percent * (12 * years) / months) / 12) / 30).toFixed(4) / 100)}</td>
                    </tr>
                    <tr>
                        <td>Hourly </td>
                        <td>{((percent * (12 * years) / months) / 12 / 30 / 24).toFixed(6)} %</td>
                        <td>{formatINR((numericAmount * (percent * (12 * years) / months).toFixed(2) / 100) / 8760)}</td>
                    </tr>
                    <tr>
                        <td>Minute </td>
                        <td>{((percent * (12 * years) / months) / 12 / 30 / 24 / 60).toFixed(8)} %</td>
                        <td>{formatINR((numericAmount * (percent * (12 * years) / months).toFixed(2) / 100) / 525600)}</td>
                    </tr>


                </tbody>
            </table>)}

            <div >

                {amount && percent && years && schedule.length > 0 && (
                    <div style={{ marginTop: 5 }}>
                        <h5><strong>Yearly Schedule (Quarterly Compounding)</strong></h5>
                        <table className="summary-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Amount (start)</th>
                                    <th>Interest Earned</th>
                                    <th>Amount (end)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map(row => (
                                    <tr key={row.year}>
                                        <td>{row.year}</td>
                                        <td>{formatINR(row.amount)}</td>
                                        <td>{formatINR(row.interest)}</td>
                                        <td>{formatINR(row.ending)}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td><strong>Totals</strong></td>
                                    <td></td>
                                    <td><strong>{formatINR(totalInterest)}</strong></td>
                                    <td><strong>{formatINR(runningPrincipal)}</strong></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                )}
            </div>

        </>
    )
}
