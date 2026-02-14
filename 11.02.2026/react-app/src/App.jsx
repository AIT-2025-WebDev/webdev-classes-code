import './App.css'
import Home from './pages/Home/Home'
import AboutUs from './pages/AboutUs/AboutUs'
import Posts from './pages/Posts/Posts'
import Post from './pages/Posts/Post/Post'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import axios from 'axios'

function App() {

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <AboutUs />
    },
    {
      path: "/posts",
      element: <Posts />,
    },
    {
      path: "/posts/:id",
      element: <Post />,
      loader: ({params}) => {
        const data = []
        axios.get(`https://63ac4406da81ba97617f073c.mockapi.io/devices/${params.id}`)
        .then(res => data.push(res.data))
        return data
      }
    },
    {
      path: "*",
      element: <div>404 Страница не найдена</div>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
