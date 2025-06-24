# CoinGecko-Coin-Rate-Checker

This project syncs cryptocurrency market data from the CoinGecko API into Google Sheets using Google Apps Script.

It performs two core tasks:

  1. Current Prices Tab: Updates real-time prices of the top 15 cryptocurrencies every 30 minutes.

  2. Price History Tab: Appends a snapshot of prices every 30 minutes for historical tracking.


📂 Google Sheet Structure

	Sheet 1: Current Prices
		| Coin ID | Symbol | Name | Current Price (USD) | Market Cap (USD) | 24h % Change | Last Updated | Last Synced |

	Overwrites every 30 minutes

	Last Synced = timestamp of sync run

	Sheet 2: Price History
		| Timestamp | Coin ID | Symbol | Name | Internal Ref Code | Current Price (USD) | Market Cap (USD) | 24h % Change |


Appends data every 30 minutes

~48 entries per coin per 24 hours

🛠 How to Run
🔧 Manual Run (for testing):

      1. Open the Google Apps Script Editor
      2. Select function runCrypto
      3. Click ▶️ Run

🔁 Automated Trigger:
  A time-driven trigger is set up to run every 30 minutes.

Trigger configured in Apps Script → Triggers

🧠 Script Files & Functions

  	1. fetchCoinGeckoData()
  		Fetches data from the CoinGecko markets API and logs full response (useful during rate limiting or debugging).

	2. updateCurrentPrice(data)
  		Clears & writes the top 15 live prices to the Current Prices sheet.

	3. updatePrice(data)
  		Appends timestamped rows to Price History for hourly tracking.

	4. runCrypto()
  		Main function that coordinates the process. Logs timestamp on completion.

Notes & Limitations

  1. Uses free CoinGecko API — subject to rate limits (429 error handled).
  2. Internal Ref Code field is left intentionally blank as per spec.
  3. Pagination and config-based asset selection are not implemented.
  4. No retries or error notification emails (could be added for production use).
