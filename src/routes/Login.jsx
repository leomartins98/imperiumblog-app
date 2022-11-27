import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/UseAuth"

const Login = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { signin } = useAuth()

    const handleLogin = () => {
        if (!email) {
            setError('Entre com um e-mail válido!')
            return
        }

        const res = signin(email)

        if (res){
            setError(res)
            return
        }

        navigate('/')

    }

  return (
    <div className='new-post'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div className='form-control'>
                <label htmlFor="login">E-mail:</label>
                <input type="email" name="email" id="title" placeholder="Digite o e-email" value={email}
                onChange={(e) => [setEmail(e.target.value), setError('')]}/>
            </div>
            <label htmlFor="login">{error}</label><br />
            <input type="submit" value="Entrar" className='btn' /><br />  <br />
            <label htmlFor="emails">
                E-mails cadastrados: <br /><br />
                Sincere@april.biz <br />
                Shanna@melissa.tv <br />
                Nathan@yesenia.net <br />
                Julianne.OConner@kory.org <br />
                Lucio_Hettinger@annie.ca <br />
                Karley_Dach@jasper.info <br />
                Telly.Hoeger@billy.biz <br />
                Sherwood@rosamond.me <br />
                Chaim_McDermott@dana.io <br />
                Rey.Padberg@karina.biz <br />
            </label>
        </form>
    </div>
  )
}

export default Login