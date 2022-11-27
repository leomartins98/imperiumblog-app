import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    let Users = [
    {id: 1, email: 'Sincere@april.biz'}, 
    {id: 2, email: 'Shanna@melissa.tv'}, 
    {id: 3, email: 'Nathan@yesenia.net'}, 
    {id: 4, email: 'Julianne.OConner@kory.org'}, 
    {id: 5, email: 'Lucio_Hettinger@annie.ca'}, 
    {id: 6, email: 'Karley_Dach@jasper.info'}, 
    {id: 7, email: 'Telly.Hoeger@billy.biz'}, 
    {id: 8, email: 'Sherwood@rosamond.me'}, 
    {id: 9, email: 'Chaim_McDermott@dana.io'}, 
    {id: 10, email: 'Rey.Padberg@karina.biz'}]
    const [user, setUser] = useState()
    

    useEffect (() => {
        const userToken = localStorage.getItem('user_token')
        const usersStorage = localStorage.getItem('user_db')

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage)?.filter(
                (user) => user.email === JSON.parse(userToken).email
            )

            if (hasUser) setUser(hasUser[0])

        }
    }, [])

    const signin = (email) => {
        localStorage.setItem('users_db', JSON.stringify(Users))
        const usersStorage = JSON.parse(localStorage.getItem('users_db'))
        
        const hasUser = usersStorage?.filter((user) => user.email === email)

        if (hasUser?.length) {
            if (hasUser[0].email === email) {
                const token = Math.random().toString(36).substring(2)
                const id = hasUser[0].id
                localStorage.setItem('user_token', JSON.stringify({id, email, token}))
                setUser({email})
                return
                
        } else {
            return "Email incorreto"
        } 
        } else {
            return "Usuário não cadastrado"
        }

    }

    const signout = () => {
        setUser(null)
        localStorage.removeItem('user_token')
    }

    return <AuthContext.Provider value={{user, signed: !!user, signin, signout}}>{children}</AuthContext.Provider> 
}