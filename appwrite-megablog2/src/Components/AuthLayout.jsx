import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

function AuthLayout({children, authentication = true}) {
//    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state)=> state.auth && state.auth.status)

    useEffect(()=>{
        if(authentication && authentication === authStatus){
            //navigate()
        }
        else if(authentication && authStatus !== authStatus){
            //navigate()
        }
        setLoader(false)
    },[authStatus, authentication])  // add navigate also
  return loader ? (
    <h1>
        Loading....
    </h1>
  ) : <> {children} </>
}

export default AuthLayout
