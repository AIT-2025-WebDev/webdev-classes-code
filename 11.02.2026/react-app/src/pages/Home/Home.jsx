import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to='/about'>Go to About Us</Link>
    </>
  )
}

export default Home