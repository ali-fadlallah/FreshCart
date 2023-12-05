import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { TokenContext } from '../../../Context/UserToken';
import { CartContext } from '../../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductsDetails() {

    const { id } = useParams();

    const baseURL = "https://ecommerce.routemisr.com/api/";

    const { addtocart, setnumCartItems } = useContext(CartContext);

    const { token } = useContext(TokenContext);

    async function getProductDetails() {


        return await axios.get(`${baseURL}v1/products/${id}`);

    }

    let { data, isLoading } = useQuery('productdetails', getProductDetails, {

        cacheTime: 10000
    })


    async function addToCartFunc(id) {

        let res = await addtocart(id)

        if (!token) {

            toast.error(res.response.data.message)

        } else {

            if (res.data.status === "success") {

                setnumCartItems(res.data.numOfCartItems);
                toast.success(res.data.message)

            }

        }
    }


    useEffect(() => {
        // Scroll to a specific position or element when the component mounts
        window.scrollTo({
            top: 0, // Specify the vertical position you want to scroll to
            behavior: 'smooth', // Use smooth scrolling
        });
    }, []); // The empty dependency array ensures that this effect runs only once on mount

    return (


        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Product details</title>
            </Helmet>

            {isLoading ?
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
                </div> : <div className=' container py-5'>

                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <LazyLoadImage
                                src={data?.data.data.imageCover}
                                className='w-100'
                            />
                        </div>

                        <div className="col-md-9">


                            <p>{data?.data.data.title}</p>
                            <p>{data?.data.data.description}</p>
                            <p>{data?.data.data.category.name}</p>

                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="fw-bolder d-inline text-danger">{data?.data.data.price}</h6><span> EGP</span>
                                </div>
                                <div>
                                    <h6>
                                        <span>
                                            <i className="fa fa-star rating-color"></i>
                                        </span>
                                        {data?.data.data.ratingsAverage}
                                    </h6>

                                </div>


                            </div>

                            <div className="text-center my-4">
                                <button className="btn form-control bg-main text-white" onClick={() => (addToCartFunc(data?.data.data._id))}>Add to cart</button>
                            </div>
                        </div>

                    </div>
                </div>}
        </>
    )
}
