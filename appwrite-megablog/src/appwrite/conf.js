import conf from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

 class AppwriteService{
     client = new Client()
     databases
     bucket
     constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
     }

     async createPost({title, slug, content, featuredImage, status, userId}){
        try{
              const post = this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                   title, 
                   content, 
                   featuredImage,
                   status, 
                   userId

                }
              )
              console.log(post)
              return post
        }catch(err){
             console.error("Error in creating post", err)
             throw err
        }
     }

     async updatePost(slug, {title, content, featuredImage, status}){
        try{
            const updatePost = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    featuredImage,
                    status
                }
            )
            console.log(updatePost)
            return updatePost
        }catch(err){
            console.error("Error in updating the post", err)
            throw err
        }
     }

     async deletePost(slug){
        try{
           await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
           )
           return true
        }catch(err){
            console.error("Error in deleting the post", err)
            throw err
        }
     }

     async getPost(slug){
        try{
            const post = await this.databases.updateDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteProjectId,
                 slug
            )
            console.log(post)
            return post
        }
        catch(err){
            console.error("Error in getting post", err)
            throw err
        }
     }
     async getAllPost(queries=[Query.equal("status", "active")]){
        try{
            const allposts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectId,
                queries,
            )
            console.log(allposts)
            return allposts
        }catch(err){
                console.error("Error in getting all the posts", err)
        }
        
     }

     //upload file
     async uploadFile(file){
        try{
            const File = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
           )
           console.log(File)
           return File
        }catch(err){
            console.err("Error in uploading file", err)
            throw err
        }
        
     }

     //delete file
     async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            console.log("successfully deleted")
            return true
        }
        catch(err){
            console.err("error in deleting file",err)
            throw err
        }
     }

     //get file
     async GetFile(fileId){
        try{
            const getFile = await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
               )
               console.log(getFile)
               return getFile
        }catch(err){
            console.error("Error in fetching the file", err)
        }
           
     }
}

const appwriteService = new AppwriteService()
export default appwriteService
