import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogFetch from '../axios/config'
import { useParams } from 'react-router-dom'

const ShowUserAlbums = () => {

  const [userAlbums, setUserAlbums] =useState([])
  const {id} = useParams()

    const getUserAlbums = async() => {
        try {
            const res = await blogFetch.get(`user/${id}/albums`)
            const data = res.data
            setUserAlbums(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getUserAlbums()
    }, [])

  return (
    <div>
      <div className='users'>
        <h1>Posts do Usuário </h1>
        {userAlbums.length===0 ? <p>Carregando...</p> : (
            userAlbums.map((userAlbum) => (
                <div className='post 'key={userAlbum.id}>
                    <h2>{userAlbum.title}</h2>
                    <p>{userAlbum.body}</p>
                    <Link to={`/albums/${userAlbum.id}/photos`} className='btn'> Mostrar fotos do álbum </Link><br />
                </div>
            ))
        )}
    </div>
    </div>
  )
}

export default ShowUserAlbums