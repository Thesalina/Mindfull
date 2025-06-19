// Layout.jsx
import Navbar from './Navbar';
import Footer from './Footer';

import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
      
        <Outlet />
                     {/* All child routes will render here */}
      </main>
      <Footer />
    </>
  );
}
