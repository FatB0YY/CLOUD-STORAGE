import React from 'react'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className='App'>
      <h1>React!</h1>
      <div>npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch</div>
      <br />
      <LoginForm />
    </div>
  )
}

export default App
