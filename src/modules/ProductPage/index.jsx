import React, { Component } from "react"

class ProductPage extends Component {
  constructor(props) {
    super(props)
    const product = props.data.find(v => v["sku"] === props.match.params.sku)
    this.state = {
      product: product
    }
  }

  render() {
    console.log(this.state.product)
    return <div />
  }
}

export default ProductPage
