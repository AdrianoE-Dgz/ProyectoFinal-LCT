import { useParams, Link, Outlet } from 'react-router-dom'
import './Userpage.css'

function Userpage() {
  const { username } = useParams(); 
  return (
    <section id="generalContainer">
      <p>Hello {username}</p>
    </section>
  )
}

export default Userpage