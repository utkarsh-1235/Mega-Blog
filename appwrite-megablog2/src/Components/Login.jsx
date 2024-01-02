import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Logo from "./Logo"
import {Input, Button} from "./index"
import authService from "../appwrite/auth"
import { login as authlogin } from "../store/authSlice"

function Login() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState()

  const login = async(data)=>{
    try{
      setError("")
      const user = await authService.login(data)
      if(user){
        const userData = await authService.getuser()
  
        if(userData){
           dispatch(authlogin(userData))
        }
          navigate("/")
      }
    }catch(error){
      setError(error.message)
    }
    
  }
    return (
      <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`} >
          <div className="mb-2 flex justify-center">
             <span className="inline-block w-full max-w-[100px]">
              <Logo/>
             </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
          <p className="mt-2 text-center text-base text-black/60" >
          Don&apos;t have any account?&nbsp;
  
              {/* Link */}
          </p>
           { error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)}>
              <div className="space-y-5">
  
                      <Input
                      label="email:"
                      placeholder="Enter your email"
                      type= "email"
                      {...register('email',{
                          required: true,
                          validate:{
                              matchPattern: (value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                          }
                      })}  />
  
                      <Input
                      label="password"
                      placeholder="Enter your password"
                      password="password"
                      {...register('password',{
                          required: true
                      })} />
  
                      <Button
                      type="submit"
                      className="w-full">
                      Log in
                      </Button>
  
              </div>
          </form>
        </div>
      </div>
    )
}

export default Login
