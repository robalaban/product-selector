import React, { Component } from "react"
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
      saleRange: [],
      selectedColor: "Color",
      colorId: null,
      sizeId: null,
      sale: false,
      quantity: null
    }
  }

  componentDidMount() {
    this._getPriceInterval(
      this.state.product["variants"],
      "price",
      this.state.priceRange
    )

    if (this.state.sale) {
      this._getPriceInterval(
        this.state.product["variants"],
        "sale_price",
        this.state.saleRange
      )
    }
  }

  _getPriceInterval = (variants, checkAgainst, range) => {
    /* 
      Cycles our Variant and set a hi and low, for the selected
      currency. If hi is equal to low, that menas that there is no
      difference in our Product and shows only low
    */
    let { hi, low } = 0
    let originalPrice = []
    let sale = false

    for (let i = 0; i < variants.length; i++) {
      if (!("sale_price" in variants[i])) {
        checkAgainst = "price"
      } else {
        sale = true
      }

      if (i === 0) {
        low = variants[i][checkAgainst]["gbp"]
        hi = variants[i][checkAgainst]["gbp"]
        continue
      }

      if (low > variants[i][checkAgainst]["gbp"]) {
        low = variants[i][checkAgainst]["gbp"]
      } else if (hi < variants[i][checkAgainst]["gbp"]) {
        hi = variants[i][checkAgainst]["gbp"]
      }
    }

    if (low !== hi) {
      range.push(low, hi)
    } else {
      range.push(low)
    }

    this.setState({
      range: range,
      sale: sale
    })
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
    console.log(this.state)
    return (
      <div className="container">
        <div className="product">
          <img src={product["image"]} alt={product["name"]} />
          <div className="product--info">
            <h2>{product["name"]}</h2>
            {this.state.priceRange.map((val, idx) => (
              <span key={idx}>{val}</span>
            ))}
            {this.state.sale && (
              <span>
                <span>RRP: </span>
                {this.state.saleRange.map((val, idx) => (
                  <span key={idx}>{val}</span>
                ))}
              </span>
            )}
            <p>{product["description"]}</p>

            <select
              value={this.state.selectedColor}
              onChange={this._selectColor}
            >
              <option value="" selected>
                Color
              </option>
              {product["variants"].map((val, idx) => (
                <SelectColor {...product["variants"][idx]} key={idx} />
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
                    key={idx}
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
      </div>
    )
  }
}

export default ProductPage
