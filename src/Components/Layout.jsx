// Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';



export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-slate-dark dark:text-white transition-colors duration-300">
     
      <Navbar />
     
     { /*<main className="flex-grow">   }*/}
        <Outlet />
 {/*</div> </main>*/}
      <Footer />
    </div>
  );
}
