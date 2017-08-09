import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Stocks extends Component {




  render() {

    console.log(this.props.ticker)
    const computeStockPrice = (price, purchasePrice, shares, stockTicker) => {
      const infoStack = []

      if (purchasePrice.length > 1) {

        const productOfPurchaseShares = [];
        const productOfMarketShares = [];

        shares.forEach((shares) => {
          const copyPriceArray = purchasePrice;
          const copyPrice = copyPriceArray.unshift();
          const totalPrice = shares * copyPrice;
          productOfPurchaseShares.push(totalPrice);
        });

        shares.forEach((shares) => {
          const totalPrice = shares * price;
          productOfMarketShares.push(totalPrice);
        })

        const sumOfPurchaseShares = productOfPurchaseShares.reduce((a,b)=> {
          return a + b;
        }, 0)

        const sumOfMarketShares = productOfMarketShares.reduce((a,b)=> {
          return a + b;
        }, 0)

        const dollarValue = sumOfMarketShares - sumOfPurchaseShares;
        const percentageChange = ((dollarValue) / sumOfMarketShares);
        infoStack.push({
          stockTicker: stockTicker,
          percentageChange: (percentageChange * 100).toFixed(2),
          dollarValueGained: (dollarValue).toFixed(2),
          equityValue: (sumOfPurchaseShares).toFixed(2)
        })
        console.log('okay')
      } else {
        const percentageChange = ((price - purchasePrice) / price);
        const dollarValue = ((shares * price)).toFixed(2) - ((shares * purchasePrice)).toFixed(2);
        const equityValue = (price * shares).toFixed(2);
        infoStack.push({
          stockTicker: stockTicker,
          percentageChange: (percentageChange * 100).toFixed(2),
          dollarValueGained: (dollarValue).toFixed(2),
          equityValue: equityValue
        })
      }

      return infoStack
    }

    const result = this.props.ticker.map((ticker)=> {
        return computeStockPrice(ticker.currentStockPrice, ticker.purchasePrice, ticker.shares, ticker.stockTicker);
    })


    const copyOfData = Object.assign([], this.props.ticker);

    return (
      <div>

      </div>
    )
  }
}


class App extends Component {
  render() {

    const ticker = [
      {
        stockTicker: 'BRK.B',
        currentStockPrice: 178.06,
        purchasePrice: [177.30],
        shares: [3]
      },
      {
        stockTicker: 'SIRI',
        currentStockPrice: 5.55,
        purchasePrice: [5.61],
        shares: [19]
      },
      {
        stockTicker: 'AMD',
        currentStockPrice: 12.88,
        purchasePrice: [12.77, 13.44],
        shares: [7, 8]
      },
      {
        stockTicker: 'QQQ',
        currentStockPrice: 144.34,
        purchasePrice: [144.33],
        shares: [1]
      }
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div><Stocks ticker={ticker}/></div>
      </div>
    );
  }
}

export default App;
