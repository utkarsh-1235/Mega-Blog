import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, SignUp } from './Components/index.js'
import AuthLayout from './Components/AuthLayout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
             <SignUp/>
          </AuthLayout>
        )
    },
  {
    path: '/login',
    element: (
      <AuthLayout authentication={false}>
        <Login/>
      </AuthLayout>
    )
  },
{
    
}]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}> 
    <RouterProvider router={router}/>
  </Provider>
    
  
)
