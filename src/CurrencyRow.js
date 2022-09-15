import React from "react";

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeHandler,
}) => {
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeHandler}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyRow;
