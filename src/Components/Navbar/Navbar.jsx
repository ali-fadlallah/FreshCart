import React, { useContext, useEffect } from 'react'
import logo from '../../Images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import style from './Navbar.module.css'
import { TokenContext } from '../../Context/UserToken'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {

    let navigate = useNavigate();

    const { token, settoken } = useContext(TokenContext)
    let { numCartItems } = useContext(CartContext);

    function Logout() {

        settoken(null);
        localStorage.removeItem('freshCartToken');
        navigate('/login');

    }

    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'products'}>Top Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'categories'}>Categories</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to={'brands'}>Brands</Link>
                            </li> */}
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center" >
                            <li className="nav-item">
                                <a className='nav-link' href="https://www.instagram.com" target="_blank" >
                                    <i className={`${style.faBrands} fa-brands fa-instagram`} />
                                </a>

                            </li>

                            <li className="nav-item">
                                <a className='nav-link' href="https://www.facebook.com" target="_blank" >
                                    <i className={`${style.faBrands} fa-brands fa-facebook`} />
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className='nav-link' href="https://www.twitter.com" target="_blank" >
                                    <i className={`${style.faBrands} fa-brands fa-twitter`} />
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className='nav-link' href="https://www.linkedin.com" target="_blank" >
                                    <i className={`${style.faBrands} fa-brands fa-linkedin`} />
                                </a>
                            </li>

                            <li className="nav-item">
                                <a className='nav-link' href="https://www.youtube.com" target="_blank" >
                                    <i className={`${style.faBrands} fa-brands fa-youtube`} />
                                </a>
                            </li>

                            {!token ?

                                <>
                                    <li className="nav-item">
                                        <Link className='nav-link' to='login'>
                                            Login
                                        </Link>
                                    </li><li className="nav-item">
                                        <Link className='nav-link' to='register'>
                                            Register
                                        </Link>
                                    </li>
                                </> : <>

                                    <li className="nav-item">
                                        <Link className="nav-link position-relative" to={'cart'}>
                                            <FontAwesomeIcon
                                                className='me-1'
                                                icon={faShoppingCart}
                                                onClick={() => ('')}
                                                style={{ cursor: 'pointer', fontSize: '20px' }}
                                            />
                                            <span className="position-absolute top-10 start-10 translate-middle badge rounded-pill bg-main">
                                                {numCartItems}
                                            </span>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <span className='nav-link cursor-pointer' onClick={Logout} >Logout</span>
                                    </li>

                                </>}


                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
