import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  const [fruit, setFruit] = useState('peach')

  return (
    <div className="App">
      <div className="flex border border-black mx-auto w-1/2 mt-5">
        <a href="https://vitejs.dev" target="_blank" className='mx-auto my-3'>
          <img src="/vite.svg"  alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" className='mx-auto my-3' >
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='flex flex-col'>
        <button  onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button  className="btn" onClick={() => setFruit((fruit) => fruit == 'peach'? 'apple' : "peach")}>
          Change Fruit from {fruit}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
