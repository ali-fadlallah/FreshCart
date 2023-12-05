import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext";
import { TokenContext } from "../../../Context/UserToken";
import toast, { Toaster } from 'react-hot-toast';

export default function FeaturedProducts() {

    const baseURL = "https://ecommerce.routemisr.com/api/";

    const [data, setdata] = useState([]);

    const [loading, isLoading] = useState(false);

    const { addtocart, setnumCartItems } = useContext(CartContext);

    const { token } = useContext(TokenContext);

    async function getFeaturedProducts() {
        let { data } = await axios.get(`${baseURL}v1/products`);
        setdata(data.data);
        isLoading(false);
    }



    async function addToCartFunc(productId) {

        let res = await addtocart(productId)

        if (!token) {

            toast.error(res.response.data.message)

        } else {

            if (res.data.status === "success") {

                toast.success(res.data.message)
                setnumCartItems(res.data.numOfCartItems);

            }

        }
    }

    useEffect(() => {

        isLoading(true);
        getFeaturedProducts();

    }, []);

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
                <div className="row justify-content-center">
                    {data.map((item) => (
                        <div key={item._id} className="col-md-2">
                            <div className="product p-2 cursor-pointer">

                                <Link to={`productsdetails/${item._id}`} className="nav-link">

                                    <div>
                                        <LazyLoadImage
                                            src={item.imageCover}
                                            className="w-100"
                                            alt="imageCover"
                                        />
                                        <h6 className="text-main mt-1">{item.category.name}</h6>
                                        <h6>{item.title.split(' ').slice(0, 2).join(' ')}</h6>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h6 className="fw-bold d-inline text-danger">{item.price}</h6><span> EGP</span>
                                            </div>
                                            <div>
                                                <h6>
                                                    <span>
                                                        <i className="fa fa-star rating-color"></i>
                                                    </span>
                                                    {item.ratingsAverage}
                                                </h6>

                                            </div>


                                        </div>

                                    </div>
                                </Link>

                                <div className="text-center">
                                    <button className="btn bg-main text-white w-100" onClick={() => (addToCartFunc(item._id))}>Add to cart</button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
