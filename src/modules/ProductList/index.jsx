import React, { Component } from "react"
import { Link } from "react-router-dom"

const SingleProduct = ({ ...props }) => (
  <li className="products--single">
    <img
      className="products--single__image"
      src={props.image}
      alt={props.name}
    />
    <h2 className="products--single__name">{props.name}</h2>
    <Link to={props.sku}>View Product</Link>
  </li>
)

class ProductList extends Component {
  render() {
    const { data } = this.props
    return (
      <div className="container">
        <h1 className="container--title">Our Products</h1>
        <ul className="products">
          {data.map((val, idx) => (
            <SingleProduct
              image={val["image"]}
              name={val["name"]}
              sku={val["sku"]}
              key={idx}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default ProductList
