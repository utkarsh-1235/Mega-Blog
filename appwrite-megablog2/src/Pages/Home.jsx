import { useEffect, useState } from "react"
import configService from "../appwrite/config"
import { Container } from "../Components"


function Home() {
    const [post, setPost] = useState([])

    useEffect(()=>{
        configService.getAllPost().then((posts) => {
            if(posts){
                setPost(posts.documents)
            }
        })
    },[])

    if(post.length == 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  return (
    <div className="w-full py-8 mt-4 text-center">
    <Container>
        <div className="flex flex-wrap">
            <div className="p-2 w-full">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    Login to read posts
                </h1>
            </div>
        </div>
    </Container>
</div>
  )
}

export default Home
