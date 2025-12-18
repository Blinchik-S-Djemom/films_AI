import React, { useState, useEffect } from "react";
import "./Styles/Conventer.css";
import { fetchCurrencyRates, type CurrencyRate } from "./currencyService";

const Converter: React.FC = () => {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("RUB");
  const [toCurrency, setToCurrency] = useState<string>("USD");
  const [convertedAmount, setConvertedAmount] = useState<string>("0");
  const [exchangeRate, setExchangeRate] = useState<string>("0");
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrencyRates();
        setCurrencies(data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить курсы валют");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrencies();
  }, []);

  useEffect(() => {
    if (currencies.length === 0) return;

    const convert = () => {
      try {
        const numAmount = parseFloat(amount.replace(",", ".")) || 0;

        const fromRate =
          fromCurrency === "RUB"
            ? 1
            : currencies.find((c) => c.code === fromCurrency)?.value || 0;
        const toRate =
          toCurrency === "RUB"
            ? 1
            : currencies.find((c) => c.code === toCurrency)?.value || 0;

        if (fromRate && toRate) {
          const result = (numAmount / fromRate) * toRate;
          const rateForOne = toRate / fromRate;

          setConvertedAmount(result.toFixed(4));
          setExchangeRate(rateForOne.toFixed(6));
        }
      } catch (err) {
        console.error("Ошибка конвертации:", err);
      }
    };

    convert();
  }, [amount, fromCurrency, toCurrency, currencies]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*[.,]?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const popularCurrencies = [
    { code: "RUB", name: "Российский рубль" },
    { code: "USD", name: "Доллар США" },
    { code: "EUR", name: "Евро" },
    { code: "GBP", name: "Фунт стерлингов" },
    { code: "CNY", name: "Китайский юань" },
    { code: "JPY", name: "Японская иена" },
  ];

  const getCurrencyName = (code: string) => {
    if (code === "RUB") return "Российский рубль";
    const currency = currencies.find((c) => c.code === code);
    return currency ? `${currency.name} (${currency.code})` : code;
  };

  return (
    <div className="converter-page">
      <div className="converter-header">
        <h1>Конвертер валют</h1>
        <div className="last-update">{loading}</div>
      </div>

      <div className="converter-container">
        <div className="converter-input-section">
          <div className="amount-input">
            <label className="input-label">Сумма</label>
            <input
              type="text"
              className="amount-input-field"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Введите сумму"
            />
          </div>

          <div className="currency-selectors">
            <div className="currency-selector">
              <label className="input-label">Из</label>
              <select
                style={{ color: "Black" }}
                className="currency-dropdown"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="RUB">RUB - Российский рубль</option>
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="swap-button" onClick={handleSwapCurrencies}>
              ↔
            </button>

            <div className="currency-selector">
              <label className="input-label">В</label>
              <select
                style={{ color: "Black" }}
                className="currency-dropdown"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="USD">USD - Доллар США</option>
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="quick-currency-selection">
          <h3>Популярные валюты:</h3>
          <div className="quick-currency-buttons">
            {popularCurrencies.map((currency) => (
              <button
                key={currency.code}
                className={`quick-currency-btn ${
                  toCurrency === currency.code ? "active" : ""
                }`}
                onClick={() => setToCurrency(currency.code)}
              >
                {currency.code}
              </button>
            ))}
          </div>
        </div>

        <div className="conversion-result">
          <div className="result-main">
            <span className="result-amount">{amount || "0"}</span>
            <span className="result-currency">
              {getCurrencyName(fromCurrency)}
            </span>
            <span className="result-equals">=</span>
            <span className="result-converted">{convertedAmount}</span>
            <span className="result-currency">
              {getCurrencyName(toCurrency)}
            </span>
          </div>

          <div className="exchange-rate-info">
            1 {fromCurrency} = {exchangeRate} {toCurrency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
