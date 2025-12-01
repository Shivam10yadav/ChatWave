import React from 'react'
import { Navigate, Route,Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Call from './pages/Call.jsx'
import Chat from './pages/Chat.jsx'
import Onboarding from './pages/Onboarding.jsx'
import Notification from './pages/Notification.jsx'
import {Toaster} from'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'
import Friends from './pages/Friends.jsx';



const App = () => {

const{isLoading,authUser} = useAuthUser()
const isAuthenticated=Boolean(authUser)
const isOnboarded=authUser?.isOnboarded
const {theme}=useThemeStore()

if (isLoading) return <PageLoader />
  return (
    <div className='h-screen' data-theme={theme   }>
      <Routes>
      <Route path='/' element={isAuthenticated && isOnboarded ?(
        <Layout showSidebar={true}>
        <Home/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ? '/login':'/onboarding'}/>
      ) } />
      <Route path='/signup' element={!isAuthenticated ?<SignUp/>:<Navigate to={isOnboarded?"/":"/onboarding"}/>}/> 
      <Route path='/login' element={!isAuthenticated ?<Login/>:<Navigate to={isOnboarded?"/":"/onboarding"}/>} />
      <Route path='/notifications' element={isAuthenticated &&isOnboarded ?(
        <Layout showSidebar={true}>
          <Notification/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated?'/login':'/onboarding'}/>
      )}
      />
      <Route path='/call/:id' element={isAuthenticated && isOnboarded?(
        <Layout showSidebar={false}>
          <Call/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ? '/login':"/onboarding"}/>
      )} />
      <Route path='/chat/:id' element={isAuthenticated && isOnboarded?(
        <Layout showSidebar={false}>
          <Chat/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated ? '/login':"/onboarding"}/>
      )
    }/>
      <Route path='/onboarding' element={isAuthenticated?(
        !isOnboarded?(
           <Onboarding/>
        ):(
          <Navigate to='/'/>
        )
      ):(
        <Navigate to='/login'/>
      )} 
      />
      <Route 
  path='/friends' 
  element={
    isAuthenticated && isOnboarded ? (
      <Layout showSidebar={true}>
        <Friends />
      </Layout>
    ) : (
      <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
    )
  } 
/>
      </Routes>

      <Toaster/>
    </div>

  
  )
}

export default App