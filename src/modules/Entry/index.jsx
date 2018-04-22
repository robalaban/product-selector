import React, { Component } from "react"
import Data from "../../data/sample_data"

const SingleProduct = ({ ...props }) => (
  <li className="products--single">
    <img
      className="products--single__image"
      src={props.image}
      alt={props.name}
    />
    <h2 className="products--single__name">{props.name}</h2>
  </li>
)

class App extends Component {
  render() {
    const data = Data.products
    console.log(data)
    return (
      <div className="container">
        <h1 className="container--title">Our Products</h1>
        <ul className="products">
          {data.map((val, idx) => (
            <SingleProduct image={val["image"]} name={val["name"]} key={idx} />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
