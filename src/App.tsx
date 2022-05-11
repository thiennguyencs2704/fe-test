import React from "react"
import "./App.css"

import { DataService } from "./service/DataService"
import { QuestionOne } from "./question-one/QuestionOne"

function App() {
  return (
    <div className="app__container">
      <header className="app__header">
        <h1 className="app__title">Skedulo Technical Test</h1>
      </header>
      <div
        className= "app__content"
      >
        <QuestionOne service={DataService} />
      </div>
    </div>
  )
}

export default App
