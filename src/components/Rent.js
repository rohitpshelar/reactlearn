import React, { useState } from 'react'

export default function Rent(props) {
    const [amount, setAmount] = useState('');
    const [months, setMonths] = useState('');
    const [deposit, setDeposit] = useState('');

    const handleInput = (e) => {

    };

    const handleAmount = (e) => {
        const raw = e.target.value.replace(/\D/g, ""); // Remove non-digits
        const formatted = new Intl.NumberFormat('en-IN').format(raw);
        return (raw === "" ? "" : formatted);
    };

    const formatINR = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0, // Set to 2 if you want paise (.00)
        }).format(amount);
    };

    return (
        <>
            <div className='component'>
                <h1>{props.title} </h1>
                <div className="mb-3">
                    Amount<input className="input" aria-label='Amount' value={amount} onChange={(e) => setAmount(handleAmount(e))} id="amount" rows="1"></input>
                </div>
                <div className="mb-3">
                    Months<input className="input" aria-label='Months' value={months} onChange={(e) => setMonths(e.target.value)} id="months" rows="1"></input>
                </div>
                <div className="mb-3">
                    Deposit<input className="input" aria-label='Deposit' value={deposit} onChange={(e) => setDeposit(handleAmount(e))} id="deposit" rows="1"></input>
                </div>
            </div>

            <div className="component">
                <h1>
                    Details
                </h1>
                {amount && <h3>Amount : {amount}</h3>}
                {months && <h3> Month : {months}</h3>}
                {amount && months && <h3> Total Rent : {formatINR(amount.replaceAll(",", "") * months)}</h3>}
                {months && <h3> Yearly Rent : {formatINR(amount.replaceAll(",", "") * 12)}</h3>}

            </div>
        </>
    )
}
