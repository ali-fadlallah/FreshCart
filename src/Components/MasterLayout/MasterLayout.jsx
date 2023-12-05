import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer';

export default function MasterLayout() {
    return (

        <>

            <div className='min-vh-100 container'>
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
