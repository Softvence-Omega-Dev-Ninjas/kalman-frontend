 
import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'

function Layout() {
  return (
     <div>
      <Navbar />
      <main className='pt-20'>
        <Outlet />
      </main>
      <Footer />
      
    </div>
  )
}

export default Layout