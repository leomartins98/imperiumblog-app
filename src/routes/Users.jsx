import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogFetch from '../axios/config'
import './Users.css'

const Users = () => {

  const [users, setUsers] =useState([])

    const getUsers = async() => {
        try {
            const res = await blogFetch.get('/users')
            const data = res.data
            setUsers(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() => {
        getUsers()
    }, [])

  return (
    <div className='users'>
        <h1>Usuários</h1>
        {users.length===0 ? <p>Carregando...</p> : (
            users.map((user) => (
                <div className='user' key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <Link to={`/users/${user.id}/posts`} className='btn'> Mostrar Posts</Link><br />
                    <Link to={`/users/${user.id}/albums`} className='btn'> Mostrar Álbuns</Link><br />
                </div>
            ))
        )}
    </div>
  )
}

export default Users