import React, { Component } from "react"
import Data from "../../data/sample_data"
import { Route, Switch } from "react-router-dom"
import ProductList from "../ProductList"

class App extends Component {
  render() {
    const data = Data.products
    return (
      <Switch>
        <Route path="/" render={() => <ProductList data={data} />} />
      </Switch>
    )
  }
}

export default App
