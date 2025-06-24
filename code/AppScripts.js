
require('dotenv').config();
const url = process.env.API_KEY;

function fetchCoinGeckoData() {
var result = UrlFetchApp.fetch(url, {
  "muteHttpExceptions": true
});
  Logger.log(result.getContentText());
  return JSON.parse(result.getContentText());
}

function updateCurrentPrice(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Current Prices");
  sheet.clearContents();

  const headers = [
    "Coin ID", "Symbol", "Name", "Current Price (USD)", "Market Cap (USD)",
    "24h % Change", "Last Updated", "Last Synced"
  ];
  sheet.appendRow(headers);

  const now = new Date();
  
  data.forEach(crypto => {
    sheet.appendRow([
      crypto.id,
      crypto.symbol.toUpperCase(),
      crypto.name,
      crypto.current_price,
      crypto.market_cap,
      crypto.price_change_percentage_24h,
      crypto.last_updated,
      now.toISOString()
    ]);
  });
}

function updatePrice(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Price History");
  const timestamp = new Date().toISOString();

  data.forEach(crypto => {
    sheet.appendRow([
      timestamp,
      crypto.id,
      crypto.symbol.toUpperCase(),
      crypto.name,
      "", // Internal Ref Code (left blank)
      crypto.current_price,
      crypto.market_cap,
      crypto.price_change_percentage_24h
    ]);
  });
}

function runCrypto() {
  const data = fetchCoinGeckoData();
  updateCurrentPrice(data);
  updatePrice(data);
  Logger.log("Crypto sync completed at " + new Date().toISOString());
}

runCrypto()