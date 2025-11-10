import React, { useState, useEffect } from 'react';

const FuelPrices = () => {
  const [fuelData, setFuelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuelPrices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          'https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/maharashtra',
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': 'f4c6267d87msh1495f859735b887p147c5cjsn82c68fcea9d3',
              'X-RapidAPI-Host': 'daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com'
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFuelData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching fuel prices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFuelPrices();
  }, []);

  // Helper function to get today's fuel prices
  const getTodayFuelPrices = () => {
    if (!fuelData ) {
      return null;
    }
    
    // Get the first entry (today's prices)
    return fuelData.fuel;
  };

  const todayFuel = getTodayFuelPrices();

  if (loading) {
    return (
      <div className="fuel-prices-loading">
        <p>Loading fuel prices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fuel-prices-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="fuel-prices">
      <h2>Today's Fuel Prices in {fuelData?.stateName}</h2>
      <p className="date">Applicable on: {fuelData.applicableOn}</p>
      
      {todayFuel ? (
        <div className="fuel-prices-grid">
          <div className="fuel-price-item">
            <h3>Petrol</h3>
            <p className="price">₹{todayFuel.petrol?.retailPrice || 'N/A'}</p>
        
          </div>
          
          <div className="fuel-price-item">
            <h3>Diesel</h3>
            <p className="price">₹{todayFuel.diesel?.retailPrice || 'N/A'}</p>
           
          </div>
          
          <div className="fuel-price-item">
            <h3>CNG</h3>
            <p className="price">₹{todayFuel.cng?.retailPrice || 'N/A'}</p>
           
          </div>
        </div>
      ) : (
        <p>No fuel price data available</p>
      )}
    </div>
  );
};

export default FuelPrices;