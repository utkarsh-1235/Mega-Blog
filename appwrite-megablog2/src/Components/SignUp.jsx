import { useNavigate } from "react-router-dom"
import {Button, Input, Logo} from "./index"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { login } from "../store/authSlice"
function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();

    const signup = async(data)=>{
        setError("")
        try{
            const user = await authService.createUser(data)
            if(user){
                const account = await authService.getuser()
                if(account){
                    dispatch(login(account))       
                }
                 navigate('/')
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
        <h2 className="text-center text-2xl font-bold leading-tight">Sign Up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60" >
            Already have an account?&nbsp;

            {/* Link */}
        </p>
         { error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
            <div className="space-y-5">
                   <Input 
                   label="Full Name:"
                   placeholder="Enter your full Name"
                   {...register('name',{
                     required: true
                   })}  />   

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
                    Create Account
                    </Button>

            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
