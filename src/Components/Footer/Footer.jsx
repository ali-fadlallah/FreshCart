import React from 'react'
import style from './Footer.module.css'
import stripe_logo from '../../Images/stripe_icon.png'
import googleplay_logo from '../../Images/googleplay_logo.png'
import appstore_logo from '../../Images/appstore_logo.png'

export default function Footer() {

    const currentYear = new Date().getFullYear();
    return (

        <>
            <footer className={'bg-main-light'}>

                <div className='container py-4'>
                    <h2>Get the FreshCart App</h2>
                    <p>We will send you a link, open it on your phone to download the app.</p>
                    <div className=' container row'>

                        <div className="col-md-10">
                            <input className=' form-control' type="email" name="" id="" placeholder='email' />
                        </div>

                        <div className="col-md-2">

                            <button id='btnFooter' className='btn form-control bg-main text-white'>Share app link</button>
                        </div>
                        <hr className=' my-4' />
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p className=' d-inline'>Payment Partners </p>
                                <img src={stripe_logo} alt="stripe_logo" className={style.logo} />
                            </div>
                        </div>

                    </div>
                </div>

                <p className=' text-center py-2 pb-3 mb-0'><i className="fa fa-copyright text-main" ></i> {currentYear} freshCart, All Rights Reserved.</p>
            </footer>
        </>

    )
}
