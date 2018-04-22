import React, { Component } from "react"
import Header from "../../components/Header"

class ProductPage extends Component {
  constructor(props) {
    super(props)
    const product = props.data.find(v => v["sku"] === props.match.params.sku)
    this.state = {
      product: product,
      priceRange: []
    }
  }

  componentDidMount() {
    this._getPriceInterval(this.state.product["variants"])
  }

  _getPriceInterval = variants => {
    let { hi, low } = 0
    let range = []
    for (let i = 0; i < variants.length; i++) {
      if (i === 0) {
        low = variants[i]["price"]["gbp"]
        hi = variants[i]["price"]["gbp"]
        continue
      }

      if (low > variants[i]["price"]["gbp"]) {
        low = variants[i]["price"]["gbp"]
      } else if (hi < variants[i]["price"]["gbp"]) {
        hi = variants[i]["price"]["gbp"]
      }
    }

    if (low !== hi) {
      range.push(low, hi)
    } else {
      range.push(low)
    }

    this.setState({ priceRange: range })
  }

  render() {
    const { product } = this.state
    console.log(this.state)
    return (
      <div className="container">
        <div className="product">
          <img src={product["image"]} alt={product["name"]} />
          <h2>{product["name"]}</h2>
          {this.state.priceRange.map(val => <span>{val}</span>)}
          <p>{product["description"]}</p>
        </div>
      </div>
    )
  }
}

export default ProductPage
