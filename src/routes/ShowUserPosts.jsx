import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogFetch from '../axios/config'
import { useParams } from 'react-router-dom'

const ShowUserPosts = () => {

  const [userPosts, setUserPosts] =useState([])
  const {id} = useParams()

    const getUserPosts = async() => {
        try {
            const res = await blogFetch.get(`user/${id}/posts`)
            const data = res.data
            setUserPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getUserPosts()
    }, [])

  return (
    <div>
      <div className='home'>
        <h1>Posts do Usuário </h1>
        {userPosts.length===0 ? <p>Carregando...</p> : (
            userPosts.map((userPost) => (
                <div className='post 'key={userPost.id}>
                    <h2>{userPost.title}</h2>
                    <p>{userPost.body}</p>
                    <Link to={`/posts/${userPost.id}`} className='btn'> Mostrar detalhes </Link><br />
                </div>
            ))
        )}
    </div>
    </div>
  )
}

export default ShowUserPosts