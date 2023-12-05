import React from 'react'
import { Helmet } from 'react-helmet'
import useMyApi from '../../customHooks/useMyApi';
import { ThreeCircles } from 'react-loader-spinner';
import style from '../Categories/Categories.module.css'

export default function Categories() {

    let { data, isLoading } = useMyApi('categories', 'categories');

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
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
                    {data?.data?.data.map((item) => (
                        <div key={item._id} className="col-md-2">
                            <div className="product p-2">
                                <div className={`${style.imageContainer}`}>
                                    <img
                                        src={item.image}
                                        className='w-100'
                                        alt="categoryImges"
                                    />
                                    <h6 className="mt-1 text-center">{item.name}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )

}
