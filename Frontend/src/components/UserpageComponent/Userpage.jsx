import { useParams } from 'react-router-dom'
import './Userpage.css'

function Userpage() {
  const { username } = useParams(); 
  return (
    <>
      <p>Hello {username}</p>
    </>
  )
}

export default Userpage