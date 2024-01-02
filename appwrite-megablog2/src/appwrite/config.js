import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";

export class ConfigService{
    client = new Client();
    database;
    bucket;

    contructor(){
        this.client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug, title, content, featuredImage, status, userId}){
          try{
               const post = await this.database.createDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 {
                    slug, 
                    title,
                    content, 
                    featuredImage,
                    status,
                    userId
                 }
               )

               console.log(post)
               return post;
          }catch(err){
            console.error("Error in creating post", err);
            throw err
          }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
           const update = await this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            })
            console.log(update);
            return update;
        }
        catch(err){
          console.error("Error in updating the post", err);
          throw err
        }
    }
    async deletepost(slug){
          try{
             await this.database.deleteDocument(slug);
             return true;
          }catch(err){
            console.error("Error in deleting the post", err);
            throw err
          }
    }

    async getPost(slug){
         try{
             const gettingPost = await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             )
             console.log(gettingPost);
             return gettingPost;
         }catch(err){
            console.error("Error in getting the post", err);
            throw err
         }
    }

    async getAllPost(query = [Query.equal("status", "active")]){
        try{
            const gettingAllPost = await this.database.listDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )
            console.log(gettingAllPost);
            return gettingAllPost;
        }catch(err){
            console.error("Error in getting all posts", err);
            throw err
        }
    }

    //upload file
    async uploadFile(file){
        try{
            const fileUpload = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log(fileUpload);
            return fileUpload;
           }
            catch(err){
                console.error("Error in uploading file", err);
                throw err
            }
        
    }

    //deleteFile
    async deleteFile(fileId){
        try{
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
             )
             return true;
        }
        catch(err){
            console.error("Error in deleting file", err);
            throw err
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}




const configService = new ConfigService();

export default configService