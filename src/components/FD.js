import React, { useState } from 'react'

export default function FD(props) {
    const [amount, setAmount] = useState('');
    const [percent, setPercent] = useState('');
    const [years, setYears] = useState('');

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
            minimumFractionDigits: 0, // Set to 2 if you want paise (.00)
        }).format(amount);
    };

    const numericAmount = parseFloat(amount.replaceAll(",", "")) || 0;
    const numericPercent = parseFloat(percent) || 0;
    const numericYears = parseInt(years, 10) || 0;

    const formattedPrice = formatINR(numericAmount);
    const annualReturn = numericAmount * numericPercent / 100;

    const schedule = [];
    let runningPrincipal = numericAmount;
    let totalInterest = 0;
    if (years && numericAmount > 0 && numericPercent >= 0 && numericYears > 0) {
        for (let y = 1; y <= numericYears; y++) {
            const interestEarned = runningPrincipal * numericPercent / 100;
            const ending = runningPrincipal + interestEarned;
            schedule.push({ year: y, amount: runningPrincipal, interest: interestEarned, ending });
            totalInterest += interestEarned;
            runningPrincipal = ending; // compound for next year
        }
    }

    return (
        <>
            <div className='component'>
                <h1>{props.title} </h1>
                <div className="mb-3">
                    Amount :  <input className="input" value={amount} onChange={handleInput} id="amount" rows="1"></input>
                </div>
                <div className="mb-3">
                    Interest Rate : <input className="input" value={percent} onChange={(e) => setPercent(e.target.value)} id="percent" rows="1"></input>
                </div>
                <div className="mb-3">
                    Years : <input className="input" value={years} onChange={(e) => setYears(e.target.value)} id="years" rows="1"></input>
                </div>
                <button className='btn btn-primary' onClick={handleClick}>Calculate</button>
            </div>

            <div >
                <h3>Details</h3>
                {amount && <h6>Amount: {formattedPrice}</h6>}
                {percent && <h6>Interest Rate: {percent}%</h6>}

                {amount && percent && years && <h6>Annual compounded Return: {formatINR(((schedule.length > 0 ? schedule[schedule.length - 1].ending : numericAmount) - amount.replaceAll(",", "")) / years)}</h6>}
                {amount && percent && !years && <h6>Annual Return: {formatINR(annualReturn)}</h6>}

                {amount && percent && years && <h6>Monthly compounded Return: {((((schedule.length > 0 ? schedule[schedule.length - 1].ending : numericAmount) - amount.replaceAll(",", "")) / years) / 12).toFixed(2)}</h6>}
                {amount && percent && !years && <h6>Monthly Return: {(annualReturn / 12).toFixed(2)}</h6>}

                {amount && percent && years && <h6>Daily compounded Return: {((((schedule.length > 0 ? schedule[schedule.length - 1].ending : numericAmount) - amount.replaceAll(",", "")) / years) / 365).toFixed(2)}</h6>}
                {amount && percent && !years && <h6>Daily Return: {(annualReturn / 365).toFixed(2)}</h6>}

                {amount && percent && years && <h6>For {years} years, simple (non-compounded) return would be {formatINR(annualReturn * numericYears)}.</h6>}
                {amount && percent && years && <h6>For {years} years, Interest compounded return would be {formatINR((schedule.length > 0 ? schedule[schedule.length - 1].ending : numericAmount) - amount.replaceAll(",", ""))}</h6>}

                {amount && percent && years && schedule.length > 0 && (
                    <div style={{ marginTop: 5 }}>
                        <h5><strong>Yearly Schedule</strong></h5>
                        <table className="table">
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
