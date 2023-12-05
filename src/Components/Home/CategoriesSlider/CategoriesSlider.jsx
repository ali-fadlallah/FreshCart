import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategoriesSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
    };

    const baseURL = "https://ecommerce.routemisr.com/api/";

    function getAllCategories() {

        return axios.get(`${baseURL}v1/categories`);
    }

    const { data } = useQuery('categorySlider', getAllCategories);

    return (

        <>
            <h6 className=' mt-3'>Show popular categories</h6>
            <Slider {...settings}>

                {data?.data.data.map((item, index) => (

                    <LazyLoadImage
                        key={index}
                        src={item.image}
                        className='carsourl-category'
                    />

                ))}

            </Slider>
        </>
    );

}