import React from 'react';
import Tab from '../Tab/Tab';
import './Carousel.css';

function Carousel() {
    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <div className="owl-carousel owl-theme">
                    <div className="item">
                        <img src="https://images.unsplash.com/photo-1598387846419-a2c870ad3ecd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80" alt="" />
                        <div className="item-content">
                            <span>Music is a good way to relax</span>
                        </div>
                    </div>
                </div>
                <div className="tab-container">
                    <Tab />
                </div>
            </div>
        </div>
    )
}

export default Carousel;
