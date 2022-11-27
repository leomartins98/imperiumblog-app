import { Link } from "react-router-dom"
import './Navbar.css'
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/UseAuth"

const Navbar = () => {
    const navigate = useNavigate()
    const userToken = localStorage.getItem('user_token')
    const email = JSON.parse(userToken).email
    const {signout} = useAuth()

  return (
    <nav className="navbar">
        <h2><Link to={'/'}>Blog</Link></h2>
        <ul>
            <li>
                Olá,{email}!
            </li>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                <Link to={'/new'} className='new-btn'>
                    Novo Post
                </Link>
            </li>
            <li>
                <Link to={'/users'} className='btn'>Usuários</Link>
            </li>
            <li>
                <Link onClick={() => [signout(), navigate('/')]}>Sair</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar