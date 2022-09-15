import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import axios from "axios";

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [date, setDate] = useState();

  const fromAmountChangeHandler = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };
  const toAmountChangeHandler = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  let fromAmount, toAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    const getCurrencyConverter = async () => {
      const response = await axios.get(
        `https://api.apilayer.com/exchangerates_data/latest?`,
        {
          headers: {
            apikey: "lR3Ub4ODQJ1iNpsQTFs9JiBIaxLJpcfC" /* To be hidden */,
          },
        }
      );
      setCurrencyOptions([
        response.data.base,
        ...Object.keys(response.data.rates),
      ]);
      const firstCurrency = Object.keys(response.data.rates)[0];

      setFromCurrency(response.data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(response.data.rates[firstCurrency]);
      setDate(response.data.date);
    };

    getCurrencyConverter();
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      const getCurrencyConverter2 = async () => {
        const response2 = await axios.get(
          `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`,
          {
            headers: {
              apikey: "lR3Ub4ODQJ1iNpsQTFs9JiBIaxLJpcfC",
            },
          }
        );

        setExchangeRate(response2.data.rates[toCurrency]);
      };
      getCurrencyConverter2();
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <p>Rate as of {date}</p>

      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeHandler={fromAmountChangeHandler}
      />
      <div className="equal">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeHandler={toAmountChangeHandler}
      />
    </div>
  );
};

export default App;
