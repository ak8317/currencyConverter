import React, { useState, useEffect } from 'react';

const Converter = () => {
  const [fromInput, setFromInput] = useState('');
  const [toInput, setToInput] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function getCurrencies() {
      try {
        const response = await fetch(
          'https://api.ratesapi.io/api/latest?base=USD'
        );
        const result = await response.json();
        //console.log(result.rates);
        const currencyAr = [];
        for (const key in result.rates) {
          currencyAr.push(key);
        }
        setCurrencies(currencyAr);

        //console.log(result.rates);
        //console.log(currencyAr);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCurrencies();
  }, []);
  const convertCurrency = async () => {
    try {
      const response = await fetch(
        `https://api.ratesapi.io/api/latest?base=${fromCurrency}&symbols=${toCurrency}`
      );

      const result = await response.json();

      setToInput((fromInput * result.rates[toCurrency]).toFixed(2));

      //console.log(result.rates);
    } catch (error) {
      console.log(error.message);
    }
  };
  const convertFrom = async () => {
    try {
      const response = await fetch(
        `https://api.ratesapi.io/api/latest?base=${fromCurrency}&symbols=${toCurrency}`
      );

      const result = await response.json();

      setToInput((fromInput * result.rates[toCurrency]).toFixed(2));

      //console.log(result.rates);
    } catch (error) {
      console.log(error.message);
    }
  };
  const convertTo = async () => {
    try {
      const response = await fetch(
        `https://api.ratesapi.io/api/latest?base=${fromCurrency}&symbols=${toCurrency}`
      );

      const result = await response.json();

      setFromInput((toInput / result.rates[toCurrency]).toFixed(2));

      //console.log(result.rates);
    } catch (error) {
      console.log(error.message);
    }
  };
  const selectHandler = (e) => {
    if (e.target.name === 'from') {
      setFromCurrency(e.target.value);
    } else if (e.target.name === 'to') {
      setToCurrency(e.target.value);
    }
  };
  return (
    <div className='converter'>
      <h1>Currency Converter</h1>
      <div className='container'>
        <div className='from'>
          <input
            name='fromI'
            type='number'
            step='any'
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            onKeyUp={(e) => {
              convertFrom();
            }}
          />
          <select
            name='from'
            onChange={(e) => selectHandler(e)}
            value={fromCurrency}
            onClick={() => convertCurrency()}
          >
            {currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
        <div className='equal'>=</div>
        <div className='to'>
          <input
            name='toI'
            type='number'
            step='any'
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            onKeyUp={(e) => {
              convertTo();
            }}
          />
          <select
            name='to'
            onChange={(e) => selectHandler(e)}
            value={toCurrency}
            onClick={() => convertCurrency()}
          >
            {currencies.map((cur) => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
export default Converter;
