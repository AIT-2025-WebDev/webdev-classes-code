import React from 'react'
import { Link } from 'react-router'

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to='/about'>Go to About Us</Link>
      <Link to='/posts'>Go to Posts</Link>
    </>
  )
}

export default Home