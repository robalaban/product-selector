import React from "react"
import { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { configure } from "enzyme"
import Header from "./index"
import { Link } from "react-router-dom"

configure({ adapter: new Adapter() })

it('renders "Our Products"', () => {
  const wrapper = shallow(<Header />)
  const productListLink = <Link to="/"> Product List </Link>
  expect(wrapper.contains(productListLink)).toEqual(true)
})
