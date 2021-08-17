import React from 'react';
import Tab from '../Tab/Tab';
import Slider from 'react-slick';
import './Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
    const setting = {
        dots: true,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <div className="owl-carousel owl-theme">
                    <Slider {...setting}>
                        <div className="item">
                            <img src="https://cdn.dribbble.com/users/3251796/screenshots/8391113/media/233cf78d72450a4787b9965219916245.png?compress=1&resize=800x600" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://cdn.dribbble.com/users/3251796/screenshots/10482210/media/9e55f572fb3ab6a0747beda4784b8c32.png?compress=1&resize=1200x900" alt="" />
                        </div>
                        <div className="item">
                            <img src="https://cdn.dribbble.com/users/3251796/screenshots/9726392/media/f3d923c435c50e1e4f066ad420d338e5.png?compress=1&resize=1200x900" alt="" />
                        </div>
                    </Slider>
                </div>
                <div className="tab-container">
                    <Tab />
                </div>
            </div>
        </div>
    )
}

export default Carousel;
