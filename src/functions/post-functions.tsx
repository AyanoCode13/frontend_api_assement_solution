import axios from "axios"
import { AddPost, GetPost } from "../types/Post"
export const getPosts = async ()=>{
    try{
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return response.data as GetPost[]
    }catch(error){
        console.log(error)
    }
}
export const addPost = async (post: AddPost)=>{
    try{
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
        return response.data as GetPost
    }catch(error){
        console.log(error)
    }
}
export const deletePost = async (id: number)=>{
    try{
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return response.data as GetPost
    }catch(error){
        console.log(error)
    }
}
export const updatePost = async (post: GetPost)=>{
    try{
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
        return response.data as GetPost
    }catch(error){
        console.log(error)
    }
}