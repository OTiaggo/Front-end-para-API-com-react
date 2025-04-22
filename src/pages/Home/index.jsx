import { useEffect, useState, useRef } from 'react'
import './style.css'
import Lixeira from '../../assets/lixeira.svg'
import api from '../../services/api'

function Home() {
  // Recuperando usuarios
  const [users, setUsers] = useState([])
  async function getUsers() {
    const usersFromAPI = await api.get('/usuarios')
    setUsers(usersFromAPI.data)
  }
  useEffect(() => {
    getUsers()
  }, [])

  // Adicionando usuario
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  async function createUser() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    })
  }

  // Deletando usuario
  async function deleteUser(id) {
    console.log(id)
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }


  return (
    <div className="container">

      <form>
        <h1>Cadastro de Usuários</h1>

        <input type="text" name="nome" id="nome" placeholder='Nome' ref={inputName} />

        <input type="number" name="idade" id="idade" placeholder='Idade' ref={inputAge} />

        <input type="email" name="email" id="email" placeholder='Email' ref={inputEmail} />

        <button type='submit' onClick={createUser}>Cadastrar</button>
      </form>

    { users.map((user) => (
      <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>

        <button onClick={() => deleteUser(user.id)}>
          <img src={Lixeira} alt="lixeira" />
        </button>
      </div>
    ))}

    </div>

  )
}

export default Home
