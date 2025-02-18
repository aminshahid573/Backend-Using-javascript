import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(()=>{
    axios.get('/api/jokes')
    .then(res => setJokes(res.data))
    .catch(err => console.log(err))
  },[])

  return (
    <>
      <h1>No of jokes : {jokes.length}</h1>
      {jokes.map(joke => (
        <div key={joke.id}>
        <h2>{joke.title}</h2>
        <p>{joke.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
