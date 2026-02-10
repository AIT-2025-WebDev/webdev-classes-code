import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

const App = () => {

  const [count, setCount] = useState(0);
  const [data, setData] = useState();

  const handleClickButton = () => {
    setCount(count + 20)
  }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => setData(res.data))
  }, [count])

  console.log(data)

  return (
    <section className="app">
      <h1>Hello World</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>

      <h1>
        {count}
      </h1>

      <button onClick={() => setCount(count + 1)}>Обновить</button>
      <button onClick={() => handleClickButton}>+10</button>

      <div>
        {data?.map((item) => (
          <h1>{item.body}</h1>
        ))}
      </div>


    </section>
  )
}

export default App
