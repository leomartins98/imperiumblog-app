import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import blogFetch from "../axios/config"
import { Link } from 'react-router-dom'
import { Navigate } from "react-router-dom"

const ShowDetailsPosts = () => {

    const xhttp = new XMLHttpRequest();
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const {id} = useParams()

    const getPost = async() => {
        try {
            const res = await blogFetch.get(`/posts/${id}`)
            const data = res.data
            setPost(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getPost()
    }, [])

    const getComments = async() => {
        try {
            const res = await blogFetch.get(`/posts/${id}/comments`)
            const data = res.data
            console.log(data)
            setComments(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getComments()
    }, [])

    const deletePost = async (id) => {
        await blogFetch.delete(`/posts/${id}`)
        .then(res => alert("Status "+res.status + ": Post deletado com sucesso!"))
        .catch(error => alert("Post não deletado. Status: "+error.status))
        
        navigate('/')
    
      };

  return (
    <div>
        <h1>Detalhes do Post</h1><br />
        <div className='post' key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={`/posts/edit/${post.id}`} className='btn'>Editar Post</Link><br />
        <Link onClick={() => deletePost(post.id)} className='btn'>Deletar Post</Link>
    </div>
        
        <div>
        <h1>Comentários</h1>   
        {comments.length===0 ? <p>Carregando...</p> : (
            comments.map((comment) => (
                <div className='post 'key={comment.id}>
                    <h2>{comment.title}</h2>
                    <p>{comment.body}</p>
                </div>
            ))
        )}
        </div>
    </div>
  )
}

export default ShowDetailsPosts