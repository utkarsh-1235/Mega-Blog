import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
   client = new Client()
   account

   constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

    this.account = new Account(this.client)
   }

   async createUser({name, email, password}){
        try{
             const user = await this.account.create(
                ID.unique(),
                name,
                email,
                password
             )
             console.log(user);
             return user;
        }catch(err){
            console.error('Error in creating user', err)
            throw err
        }
   }

   async login({email, password}){
        try{
            const user = await this.account.createEmailSession(
                email, 
                password
            )
            console.log(user);
            if(!user){
                console.log("User not found");
            }
            return user;
        }
            catch(err){
                console.error("Error in login the user", err);
                throw err
            }
        
   }

   async logout(){
      try{
          return await this.account.deleteSessions();
      }catch(err){
        console.error("Error in logout the user", err);
        throw err
      }
   }

   async getuser(){
    try{
       const getUser = await this.account.get()
       console.log(getUser);
       return getUser;
    }
    catch(err){
        console.error("Error in getting the user details", err);
        throw err
    }
   }
}

const authService = new AuthService();
export default authService