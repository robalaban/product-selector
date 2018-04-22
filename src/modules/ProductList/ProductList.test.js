import React from "react"
import { shallow } from "enzyme"
import ProductList from "./index"
import Adapter from "enzyme-adapter-react-16"
import { configure } from "enzyme"

configure({ adapter: new Adapter() })

it('renders "Our Products"', () => {
  const data = {
    products: [
      {
        name: "Rocket Powered Roller Skates"
      },
      {
        name: "Speed Skates"
      }
    ]
  }

  const wrapper = shallow(<ProductList data={Object.values(data)} />)
  const textHeader = <h1 className="container--title">Our Products</h1>
  expect(wrapper.contains(textHeader)).toEqual(true)
})
