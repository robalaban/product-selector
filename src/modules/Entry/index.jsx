import React, { Component } from "react"
import Data from "../../data/sample_data"
import { Route, Switch } from "react-router-dom"
import Header from "../../components/Header"
import ProductList from "../ProductList"
import ProductPage from "../ProductPage"

import "./main.css"

class App extends Component {
  render() {
    const data = Data.products
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route
            path="/:sku"
            render={props => <ProductPage {...props} data={data} />}
          />
          <Route
            path="/"
            render={props => <ProductList {...props} data={data} />}
          />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
