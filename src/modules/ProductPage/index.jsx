import React, { Component } from "react"
import {
  SelectColor,
  SelectSize,
  Stock,
  CartButton
} from "./components/components"

import "./productpage.css"

class ProductPage extends Component {
  constructor(props) {
    super(props)
    const product = props.data.find(v => v["sku"] === props.match.params.sku)
    this.state = {
      product: product,
      price: [],
      salePrice: [],
      selectedColor: "Color",
      colorId: null,
      sizeId: null,
      sale: false,
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
    let sale = false
    let price = []
    let salePrice = []

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

      if ("sale_price" in variants[i]) {
        if (low !== hi) {
          price.push(low, hi)
        } else {
          price.push(low)
        }

        hi = low
        low = variants[i]["sale_price"]["gbp"]

        if (low !== hi) {
          salePrice.push(low, hi)
        } else {
          salePrice.push(low)
        }
      } else {
        if (low !== hi) {
          price.push(low, hi)
        } else {
          price.push(low)
        }
      }
    }

    if (salePrice.length > 0) {
      this.setState({
        price: price,
        salePrice: salePrice,
        sale: true
      })
    } else {
      this.setState({
        price: price
      })
    }
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
          <div className="product--media">
            <img src={product["image"]} alt={product["name"]} />
          </div>
          <div className="product--info">
            <h2>{product["name"]}</h2>
            {this.state.sale ? (
              <span>
                <span className="product--info__price">
                  {this.state.salePrice.map((val, idx) => (
                    <span key={idx}>{val}</span>
                  ))}
                </span>
                <span className="product--info__rrp">
                  (RRP:
                  {this.state.price.map((val, idx) => (
                    <span key={idx}> {val}</span>
                  ))})
                </span>
              </span>
            ) : (
              <span className="product--info__price">
                {this.state.price.map((val, idx) => (
                  <span key={idx}>{val}</span>
                ))}
              </span>
            )}
            <p>{product["description"]}</p>

            <div className="product--controls">
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

              <select
                value={this.state.selectedSize}
                onChange={this._selectSize}
              >
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
            </div>
            {this.state.quantity !== null &&
              this.state.quantity < 10 && (
                <Stock className="product--stock" stock={this.state.quantity} />
              )}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductPage
