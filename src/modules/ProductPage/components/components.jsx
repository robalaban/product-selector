import React from "react"

export const SelectColor = ({ ...props }) => (
  <option value={props.color}>{props.color}</option>
)

export const SelectSize = ({ ...props }) => (
  <option value={props.label.uk}> {props.label.uk} </option>
)

export const Stock = ({ ...props }) =>
  props.stock === 0 ? null : props.stock < 10 ? (
    <span>Only {props.stock} remaining!</span>
  ) : (
    <span> {props.stock} </span>
  )

export const CartButton = ({ ...props }) => (
  <button
    onClick={() => props.onClick(props.name)}
    className={props.stock === 0 ? "stock--empty" : "stock--full"}
  >
    {props.stock === 0 ? "Out of Stock" : "Add to Cart"}
  </button>
)
