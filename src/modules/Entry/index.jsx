import React, { Component } from "react"
import Data from "../../data/sample_data"
import { Route, Switch } from "react-router-dom"
import ProductList from "../ProductList"
import ProductPage from "../ProductPage"

class App extends Component {
  render() {
    const data = Data.products
    return (
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
    )
  }
}

export default App
