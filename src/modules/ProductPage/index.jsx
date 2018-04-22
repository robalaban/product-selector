import React, { Component } from "react"
import Header from "../../components/Header"
import {
  SelectColor,
  SelectSize,
  Stock,
  CartButton
} from "./components/components"

class ProductPage extends Component {
  constructor(props) {
    super(props)
    const product = props.data.find(v => v["sku"] === props.match.params.sku)
    this.state = {
      product: product,
      priceRange: [],
      selectedColor: "Color",
      colorId: null,
      sizeId: null,
      quantity: null
    }
  }

  componentDidMount() {
    this._getPriceInterval(this.state.product["variants"])
  }

  _getPriceInterval = variants => {
    /* 
      Cycles our Variant and set a hi and low, for the selected
      currency. If hi is equal to low, that menas that there is no
      difference in our Product and shows only low
    */
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

  _selectColor = event => {
    let colorId = this.state.product["variants"].findIndex(
      v => v["color"] === event.target.value
    )

    this.setState({
      colorId: colorId,
      selectedColor: event.target.value
    })
  }

  _selectSize = event => {
    let sizes = this.state.product["variants"][this.state.colorId]["sizes"]
    console.log(this.state.product["variants"][this.state.colorId])
    let sizeId = sizes.findIndex(v => v["label"]["uk"] == event.target.value)

    this.setState({
      sizeId: sizeId,
      quantity: sizes[sizeId]["quantity"]
    })
  }

  _addedToCart = name => {
    console.log(this.state.quantity)
    if (this.state.quantity > 0) {
      alert(`Added ${name} to cart!`)
    }

    if (this.state.quantity === 0) {
      alert(`${name} is out of Stock`)
    } else {
      alert(`Select Size And Color`)
    }
  }

  render() {
    const { product } = this.state
    return (
      <div className="container">
        <div className="product">
          <img src={product["image"]} alt={product["name"]} />
          <h2>{product["name"]}</h2>
          {this.state.priceRange.map(val => <span>{val}</span>)}
          <p>{product["description"]}</p>
          <select value={this.state.selectedColor} onChange={this._selectColor}>
            <option value="" selected>
              Color
            </option>
            {product["variants"].map((val, idx) => (
              <SelectColor {...product["variants"][idx]} />
            ))}
          </select>

          <select value={this.state.selectedSize} onChange={this._selectSize}>
            <option value="" selected>
              Size
            </option>
            {this.state.selectedColor !== "Color" &&
              Object.values(
                product["variants"][this.state.colorId]["sizes"]
              ).map((val, idx) => (
                <SelectSize
                  {...product["variants"][this.state.colorId]["sizes"][idx]}
                />
              ))}
          </select>

          <CartButton
            name={product["name"]}
            stock={this.state.quantity}
            onClick={name => this._addedToCart(name)}
          />

          {this.state.quantity !== null && (
            <Stock stock={this.state.quantity} />
          )}
        </div>
      </div>
    )
  }
}

export default ProductPage
