import React from "react";
import Slider from "react-slick";
import slider_image_1 from '../../../Images/slider-image-1.jpeg'
import slider_image_2 from '../../../Images/slider-image-2.jpeg'
import slider_image_3 from '../../../Images/slider-image-3.jpeg'
import grocery_banner from '../../../Images/grocery-banner.png'
import grocery_banner_2 from '../../../Images/grocery-banner-2.jpeg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: false
    };

    const sliders = [slider_image_1, slider_image_2, slider_image_3]

    return (

        <>
            <div className="pt-3">
                <div className="row gx-0">

                    <div className="col-md-10">
                        <Slider {...settings}>

                            {sliders.map((item, index) => (

                                <img
                                    key={index}
                                    src={item}
                                    className='w-100'
                                    height={300}
                                />


                            ))}

                        </Slider>

                    </div>
                    <div className="col-md-2">
                        <img
                            src={grocery_banner}
                            className='w-100'
                            height={150}
                        />
                        <img
                            src={grocery_banner_2}
                            className='w-100'
                            height={150}
                        />
                    </div>
                </div>
            </div>
        </>
    );

}
