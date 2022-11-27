import blogFetch from '../axios/config'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

import './NewPost.css'

const NewPost = () => {

    const navigate = useNavigate()
    
    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    
    const createPost = async (e) => {

        e.preventDefault()
        const userToken = localStorage.getItem('user_token')
        const id = JSON.parse(userToken).id

        const post = {title, body, userId: id}
        console.log(id)

        await blogFetch.post("/posts", {
            body: post
        })
        .then(res => alert("Status "+res.status + ": Post criado com sucesso!"))
        .catch(error => alert("Post não criado. Status: "+error.status))

        navigate('/')
    }

  return (
    <div className='new-post'>
        <h2>Inserir novo Post</h2>
        <form onSubmit={(e) => createPost(e)}>
            <div className='form-control'>
                <label htmlFor="title">Título:</label>
                <input type="text" name="title" id="title" placeholder="Digite o título" 
                onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label htmlFor="body">Conteúdo:</label>
                <textarea name="body" id="body" placeholder='Digite o conteúdo'
                onChange={(e) => setBody(e.target.value)}></textarea>
            </div>
            <input type="submit" value="Criar Post" className='btn' />
        </form>
    </div>
  )
}

export default NewPost