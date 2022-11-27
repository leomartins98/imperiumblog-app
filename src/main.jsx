import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {createBrowserRouter, RouterProvider, Route} from 'react-router-dom'

//pages
import Home from './routes/Home'
import NewPost from './routes/NewPost'
import Users from './routes/Users'
import ShowDetailsPosts from './routes/ShowDetailsPosts'
import EditPost from './routes/EditPost'
import ShowUserPosts from './routes/ShowUserPosts'
import ShowUserAlbums from './routes/ShowUserAlbums'
import ShowPhotos from './routes/ShowPhotos'
import Login from './routes/Login'
import useAuth from './hooks/UseAuth'
import { AuthProvider } from './contexts/auth'


const Private = ({Item}) => {
  const {signed} = useAuth()

  return signed > 0 ? <Item /> : <Login />
}

const router = createBrowserRouter([
  {
    element: <Private Item={App} />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/new',
        element: <NewPost />
      },{
        path: '/posts/:id',
        element: <ShowDetailsPosts />
      },
      {
        path: 'posts/edit/:id',
        element: <EditPost />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/:id/posts',
        element: <ShowUserPosts />
      },
      {
        path: 'users/:id/albums',
        element: <ShowUserAlbums />
      },
      {
        path: '/albums/:id/photos',
        element: <ShowPhotos />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
 
)
