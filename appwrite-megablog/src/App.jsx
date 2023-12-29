import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/AuthSlice"
import { Header, Footer } from "./components"
import {Outlet} from "react-router-dom"
function App() {
  const[loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
       if(userData){
          dispatch(login(userData))
       }
       else{
        dispatch(logout())
       }
    })
    .finally(()=>setLoading(false))
  },[])

  return  (
    <div className="min-h-screen flex flex-wrap content-between bg-blue-300">
      Mega Blog
      <div className="w-full block">
        {/* <Header/> */}
        <main >
         Todo: <Outlet/>
        </main>
        <Footer/>        
      </div>

    </div>
  )
}

export default App
