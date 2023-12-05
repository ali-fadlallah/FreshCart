import React from 'react'
import { Helmet } from 'react-helmet'
import useMyApi from '../../customHooks/useMyApi';
import { ThreeCircles } from 'react-loader-spinner';

export default function Products() {

    let { data, isLoading } = useMyApi('products', 'products');

    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Top Rated Products</title>
            </Helmet>

            {isLoading ? (
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
                    {data?.data?.data.sort((a, b) => (b.ratingsAverage - a.ratingsAverage)).slice(0, 10).map((item) => (
                        <div key={item._id} className="col-md-2">
                            <div className="product p-2">
                                <div>
                                    <img
                                        src={item.imageCover}
                                        className="w-100"
                                        alt="imageCover"
                                    />
                                    <h6 className="text-main mt-1">{item.category.name}</h6>
                                    <h6>{item.title.split(' ').slice(0, 2).join(' ')}</h6>
                                    <div className="d-flex justify-content-between mb-3">
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
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </>
    )
}
