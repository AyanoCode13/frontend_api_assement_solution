import { useEffect, useState } from "react";
import { addPost, deletePost, getPosts, updatePost } from "../functions/post-functions";
import { GetPost } from "../types/Post";
import PostModal from "./post-modal";

export default function PostList() {
  const [posts, setPosts] = useState<GetPost[]>([]);
  const [addNewPost, setAddNewPost] = useState(false)
  const [title, setitle] = useState("")
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  },[]);

  return (
    <div className="overflow-x-auto w-screen h-screen">
      <table className="table table-xs">
        <thead>
          <tr>
            
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Completed</th>
            <th colSpan={2}>
                {addNewPost ? <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-danger" onClick={()=>setAddNewPost(false)}>Cancel</button>:<button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary" onClick={()=>setAddNewPost(true)}>Add Post</button>}
            </th>
          </tr>
        </thead>
        <tbody>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
           {addNewPost && 
            <tr>
                <td></td>
                <td></td>
                <td> <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e)=>setitle(e.currentTarget.value)} required/></td>
                <td> <input type="checkbox" className="toggle toggle-info" onChange={(e)=>{
                    setCompleted(e.currentTarget.checked)
                }}/></td>
                <td colSpan={2}>
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"onClick={async()=>{
                        const post = {
                            userId:Math.floor(Math.random()*10),
                            id:posts.length+1,
                            title,
                            completed:completed
                        }
                        setPosts(prev=>[post,...prev])
                        setAddNewPost(false)
                        await addPost(post)
                    }}>Add</button>
                </td>
            </tr>
}
            {posts?.map((post) => {
                return (
                <tr key={post.id}>
                    
                    <td>{post.id}</td>
                    <td>{post.userId}</td>
                    <td onClick={()=>console.log("click")}>{post.title}</td>
                    <td><input type="checkbox" className="toggle toggle-info" defaultChecked={post.completed} onChange={async()=>{
                         await updatePost({...post, completed:true});
                    }}/></td>
                    <td>
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-danger" onClick={async()=> {
                        await deletePost(post.id)
                        setPosts(prev=> prev?.filter((p)=> p.id !== post.id))
                        
                    }}>Delete</button>
                    </td>
                </tr>
                );
            })}         
        </tbody>
        <tfoot>
        <tr>
            <th></th>
            <th>Id</th>
            <th>UserId</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
