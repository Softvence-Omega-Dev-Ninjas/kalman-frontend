 
import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'

function Layout() {
  return (
     <div>
      <Navbar />
      <main className='pt-20'>
        <Outlet />
      </main>
      
    </div>
  )
}

export default Layout