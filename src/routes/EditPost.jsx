import blogFetch from '../axios/config'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'


const EditPost = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [title, setTitle] = useState()
    const [body, setBody] = useState()

    const getPost = async () => {
        try {
          const response = await blogFetch.get(`/posts/${id}`);
          const data = response.data;
          setTitle(data.title);
          setBody(data.body);
        } catch (error) {
          console.log(error);
        }
      };
    
    const editPost = async (e) => {
        e.preventDefault()
        
        const post = {title, body, userId: 1}

        await blogFetch.put(`/posts/${id}`, {
            body: post
        })
        .then(res => alert("Status "+res.status + ": Post editado com sucesso!"))
        .catch(error => alert("Post não editado. Status: "+error.status))

        navigate('/')
    }

    useEffect(() => {
        getPost();
      }, []);

  return (
    <div>
        <div className="new-post">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <input type="text" name="title" id="title" placeholder="Digite o título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}/>
        </div>
        <div className="form-control">
          <label htmlFor="title">Título:</label>
          <textarea name="body" id="body" placeholder="Digite o conteúdo..."
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <input type="submit" value="Editar Post" className="btn" />
      </form>
    </div>
    </div>
  )
}

export default EditPost