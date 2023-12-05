import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ThreeCircles } from 'react-loader-spinner';
import { TokenContext } from '../../Context/UserToken';
import style from './Cart.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import no_items_cart from '../../Images/no_items_cart.png'

export default function Cart() {

    let { getCart, deleteItem, clearCart, updateCartQuantity, checkout, setnumCartItems } = useContext(CartContext);

    let { token } = useContext(TokenContext);

    const [cartList, setcartList] = useState([]);

    const [loading, setloading] = useState(true)

    let paymentInfo = {
        "details": "test",
        "phone": "test",
        "city": "test"
    };

    function handleIncrement(productid, count) {

        updateCartQuantityFunc(productid, count + 1)

    }

    function handleDecrement(productid, count) {

        if (count > 1) {
            updateCartQuantityFunc(productid, count - 1);
        } else {

            deleteItemFunc(productid)
        }

    }


    async function getCartFunc() {

        const res = await getCart()

        if (res?.response?.data?.statusMsg == 'fail') {

            setcartList(null)
            setloading(false)

        }

        if (res?.data?.status == 'success') {

            setcartList(res.data?.data)

            setnumCartItems(res.data?.numOfCartItems);

            setloading(false)

        }

    }

    async function deleteItemFunc(productId) {

        setloading(true);

        const res = await deleteItem(productId)

        if (!token) {

            toast.error(res.response.data.message)

        } else {

            if (res.data.status === "success") {

                toast.success('The item has been removed successfully')
                getCartFunc()
                // window.location.reload();
            }

        }

    }
    async function updateCartQuantityFunc(productId, count) {

        setloading(true);

        const res = await updateCartQuantity(productId, count)

        if (!token) {

            toast.error(res.response.data.message)

        } else {

            if (res.data.status === "success") {

                toast.success('The item has been updated successfully')
                getCartFunc()
            }

        }

    }


    useEffect(() => {
        if (!token)
            return
        setloading(true)
        getCartFunc()

    }, [token])

    async function checkOutFunc(id, shippingAddress) {

        setloading(true);

        const res = await checkout(id, shippingAddress)

        if (!token) {

            toast.error(res.response.data.message)

        } else {

            if (res.data.status === "success") {

                window.location.href = res?.data?.session.url;

            }

        }

    }

    async function clearCartFunc() {

        setloading(true);

        const res = await clearCart()

        console.log(res);
        if (!token) {

            toast.error(res.response.data.message)

        } else {

            if (res.data.message === "success") {
                setnumCartItems(0)

                toast.success('The cart has been cleared successfully')
                getCartFunc()
            }

        }

    }


    return (

        <>

            {loading ? (
                <div className="d-flex vh-100 align-items-center justify-content-center">
                    <ThreeCircles
                        height="100"
                        width="100"
                        color="#0AAD0A"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div>
            ) : (

                <>

                    {!cartList || (cartList.products.length == 0) ? <div>

                        <div className="d-flex vh-100 align-items-center justify-content-center">

                            <img src={no_items_cart} className='w-25' alt="no_items_cart" />
                        </div>
                    </div> :

                        <div className='py-3'>

                            <div className=' d-flex justify-content-between my-3'>
                                <h3>Total: <span className=' text-main'>{cartList?.totalCartPrice}</span>  EGP</h3>

                                {/* <div onClick={() => (clearCartFunc())} className=' cursor-pointer'>
                                    <FontAwesomeIcon
                                        className='me-1'
                                        icon={faTrash}
                                        style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
                                    />
                                    <span>Clear All</span>
                                </div> */}

                            </div>

                            {cartList?.products.map((item) => (
                                <div key={item._id} className="row">
                                    <div className="col-md-10">
                                        <div className=' d-flex  align-items-center py-2'>
                                            <div>
                                                <LazyLoadImage
                                                    src={item.product.imageCover}
                                                    className={style.imgsize}
                                                    alt="imageCover"
                                                />
                                            </div>

                                            <div className=' mx-2'>
                                                <h6>{item.product.title}</h6>
                                                <h6 className="fw-bold d-inline text-warning">{item.price}</h6><span> EGP</span>

                                                <div>


                                                    <FontAwesomeIcon
                                                        className='me-1'
                                                        icon={faTrash}
                                                        onClick={() => (deleteItemFunc(item.product._id))}
                                                        style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
                                                    />
                                                    <span>Remove</span>

                                                </div>

                                            </div>

                                            <div>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-md-2">

                                        <button className=' btn text-main border border-1 border-success' onClick={() => (handleIncrement(item.product._id, item.count))}><i className="fa fa-plus" aria-hidden="true"></i></button>

                                        <span className=' h5 mx-2'>{item.count}</span>

                                        <button className=' btn text-main border border-1 border-success' onClick={() => (handleDecrement(item.product._id, item.count))}><i className="fa fa-minus" aria-hidden="true"></i></button>

                                    </div>
                                </div>

                            ))}

                            <div className='d-flex justify-content-center align-items-center'>
                                <button className=' btn btn-info text-white w-25' onClick={() => (checkOutFunc(cartList?._id, paymentInfo))}>CheckOut</button>

                            </div>
                        </div>



                    }

                </>
            )
            }

        </>
    )
}