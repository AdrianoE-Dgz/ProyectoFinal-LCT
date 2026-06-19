import { useState, lazy, Suspense, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Context } from "/src/Context.jsx";
import './Auth.css'

const Notice = lazy(() => import('/src/components/NoticeComponent/Notice.jsx'))

function Auth() {
  const [notice, setNotice] = useState(null)

  const {setUser} = useContext(Context);
  const navigate = useNavigate();

  const authCallback = (childData) => {
    if(childData.login){
      setUser(childData.user);
      navigate('/');
    } else if (childData.register){
      navigate('/Auth/Login');
    }

    setNotice(childData.notice);
  };

  return (
    <section className='general-container d-flex flex-column align-items-center'>
      <section id='FormCont' className='card p-4 m-auto'>
        <Suspense>
          <Outlet context={{authCallback}} />
        </Suspense>
        { notice !== null ?
        <Suspense fallback={<p>Cargando Aviso...</p>}>
          <Notice mensaje={notice.mensaje} color={notice.color} />
        </Suspense>
          :
        <>
        </>
        }
      </section>
    </section>
  )
}

export default Auth