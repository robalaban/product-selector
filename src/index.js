import React from "react"
import ReactDOM from "react-dom"
import App from "./modules/Entry"
import { BrowserRouter } from "react-router-dom"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
registerServiceWorker()
