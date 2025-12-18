export interface CurrencyRate {
  code: string;
  name: string;
  value: number;
  nominal: number;
  date: string;
}

const CACHE_DURATION = 5 * 60 * 1000;
let cachedRates: CurrencyRate[] | null = null;
let lastFetchTime: number | null = null;

export const fetchCurrencyRates = async (): Promise<CurrencyRate[]> => {
  if (
    cachedRates && //////
    lastFetchTime &&
    Date.now() - lastFetchTime < CACHE_DURATION
  ) {
    return cachedRates;
  }

  try {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const currencies: CurrencyRate[] = [];
    const date = new Date(data.Date).toLocaleDateString("ru-RU");

    for (const [code, currencyData] of Object.entries(data.Valute as any)) {
      const curr = currencyData as any;
      currencies.push({
        code: curr.CharCode,
        name: curr.Name,
        value: curr.Value,
        nominal: curr.Nominal,
        date: date,
      });
    }

    cachedRates = currencies;
    lastFetchTime = Date.now();

    return currencies;
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    throw error;
  }
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: CurrencyRate[]
): number => {
  if (fromCurrency === toCurrency) return amount;

  let fromRate = 1;
  let toRate = 1;

  if (fromCurrency !== "RUB") {
    const fromCurrencyData = rates.find((c) => c.code === fromCurrency);
    if (!fromCurrencyData)
      throw new Error(`Currency ${fromCurrency} not found`);
    fromRate = fromCurrencyData.value / fromCurrencyData.nominal;
  }

  if (toCurrency !== "RUB") {
    const toCurrencyData = rates.find((c) => c.code === toCurrency);
    if (!toCurrencyData) throw new Error(`Currency ${toCurrency} not found`);
    toRate = toCurrencyData.value / toCurrencyData.nominal;
  }

  return (amount / fromRate) * toRate;
};
