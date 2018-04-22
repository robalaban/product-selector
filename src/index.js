import React from "react"
import ReactDOM from "react-dom"
import App from "./modules/Entry"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
