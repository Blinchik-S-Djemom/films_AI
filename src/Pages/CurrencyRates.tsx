import React, { useState, useEffect } from "react";
import { fetchCurrencyRates, type CurrencyRate } from "./currencyService";
import "./Styles/CurrencyRates.css";

const CurrencyRates: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"code" | "value">("code");

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        setLoading(true);
        const data = await fetchCurrencyRates();
        setCurrencies(data);
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить курсы валют.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrencies();
    const interval = setInterval(loadCurrencies, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCurrencies = currencies
    .filter(
      (currency) =>
        currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "code") {
        return a.code.localeCompare(b.code);
      } else {
        return a.value - b.value;
      }
    });

  const formatValue = (value: number, nominal: number) => {
    return (value / nominal).toFixed(4);
  };

  if (loading) {
    return (
      <div className="currency-rates-page">
        <div className="loading-container">
          <h1>Курсы валют</h1>
          <div className="loading-spinner"></div>
          <p>Загрузка данных с ЦБ РФ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="currency-rates-page">
      <div className="currency-rates-header">
        <h1>Курсы валют ЦБ РФ</h1>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск по коду или названию валюты..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="sort-controls">
          <label>Сортировка:</label>
          <select
            style={{ color: "Black" }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "code" | "value")}
            className="sort-select"
          >
            <option value="code">По коду валюты</option>
            <option value="value">По значению курса</option>
          </select>
        </div>
      </div>

      <div className="currency-rates-container">
        <div className="rates-header">
          <div className="header-code">Код</div>
          <div className="header-name">Валюта</div>
          <div className="header-nominal">Номинал</div>
          <div className="header-rate">Курс к RUB</div>
          <div className="header-unit">За 1 единицу</div>
        </div>

        <div className="rates-list">
          {filteredCurrencies.map((currency) => (
            <div key={currency.code} className="rate-item">
              <div className="item-code">
                <span className="currency-symbol">
                  {getCurrencySymbol(currency.code)}
                </span>
                {currency.code}
              </div>
              <div className="item-name">{currency.name}</div>
              <div className="item-nominal">{currency.nominal}</div>
              <div className="item-rate">{currency.value.toFixed(4)} RUB</div>
              <div className="item-unit">
                {formatValue(currency.value, currency.nominal)} RUB
              </div>
            </div>
          ))}
        </div>

        {filteredCurrencies.length === 0 && (
          <div className="no-results">
            Не найдено валют по запросу "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

const getCurrencySymbol = (code: string): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    RUB: "₽",
  };
  return symbols[code] || "¤";
};

export default CurrencyRates;
