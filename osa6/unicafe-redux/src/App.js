import React from 'react'
import ReactDOM from 'react-dom/client'

import counterReducer from './reducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <div>
                <button onClick={() => store.dispatch({type: 'GOOD'})}>good</button>
                <button onClick={() => store.dispatch({type: 'OK'})}>ok</button>
                <button onClick={() => store.dispatch({type: 'BAD'})}>bad</button>
                <button onClick={() => store.dispatch({type: 'ZERO'})}>reset stats</button>
            </div>

            <p>good {store.getState().good}</p>
            <p>ok {store.getState().ok}</p>
            <p>bad {store.getState().bad}</p>
        </div>
    )
}

store.subscribe(() => {
    const storeState = store.getState()
    console.log(storeState)
})

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)

export default {App, renderApp}