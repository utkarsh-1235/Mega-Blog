import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login, SignUp } from './Components/index.js'
import AuthLayout from './Components/AuthLayout.jsx'
import Home from "./Pages/Home.jsx"
import Post from './Pages/Post.jsx'
import AddPost from "./Pages/AddPost.jsx"
import AllPosts from "./Pages/AllPosts.jsx"
import EditPost from "./Pages/EditPost.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
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
    path: "/all-posts",
    element: (
        <AuthLayout authentication>
            {" "}
            <AllPosts />
        </AuthLayout>
    ),
},
{
    path: "/add-post",
    element: (
        <AuthLayout authentication>
            {" "}
            <AddPost />
        </AuthLayout>
    ),
},
{
    path: "/edit-post/:slug",
    element: (
        <AuthLayout authentication>
            {" "}
            <EditPost />
        </AuthLayout>
    ),
},
{
    path: "/post/:slug",
    element: <Post />,
},]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}> 
    <RouterProvider router={router}/>
  </Provider>
    
  
)
