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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import CreatePost from './pages/Posts/Create/CreatePost'
import { Layout } from './Layout'


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  })
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/about",
      element: <Layout><AboutUs /></Layout>
    },
    {
      path: "/posts",
      element: <Layout><Posts /></Layout>,
    },
    {
      path: "/posts/:id",
      element: <Layout><Post /></Layout>,
      loader: ({ params }) => {
        const data = []
        axios.get(`https://63ac4406da81ba97617f073c.mockapi.io/devices/${params.id}`)
          .then(res => data.push(res.data))
        return data
      }
    },
    {
      path: "/posts/create",
      element: <CreatePost />
    },
    {
      path: "*",
      element: <div>404 Страница не найдена</div>
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <TanStackDevtools plugins={[
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: false
          },
        ]} />

      </QueryClientProvider>
    </>
  )
}

export default App
