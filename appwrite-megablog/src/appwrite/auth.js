import conf from "../config/config";
import {Client, Account, ID} from "appwrite"

export class AuthService{
    client = new Client()
    account
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.account = new Account(this.client)
    }

    async createAccount({ name, email, password }) {
        try {
          const userAccount = await this.account.create(ID.unique(), email, password, name)
          console.log(userAccount)
          return userAccount
        } catch (err) {
          // Handle the error or rethrow it
          console.error('Error creating account:', err)
          throw err;
        }
      }

      async login({email, password}){
        try{
              const user = await this.account.createEmailSession(email, password)
              console.log(user)
              return user

        }catch(err){
            console.error('Error in login:',err)
        }
      }

      async getCurrentUser(){
         try{
            const currentUser = await this.account.get()
            console.log(currentUser)
            return currentUser
         }catch(err){
            console.error('Error to get currentUser', err)
            throw err
         }
      }

      async logout(){
        try{
              const user = await this.account.deleteSessions()
              if(!user){
                console.log('User not exist')
                return
              }
              else{
                console.log(user)
                return user
              }
              
        }
        catch(err){
            console.error('Error in logout', err)
            throw err
        }
      }
}

const authService = new AuthService()

export default authService