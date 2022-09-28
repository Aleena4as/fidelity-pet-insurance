import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import MainTitle from '@/components/Titles/MainTitle/MainTitle';
import axios from '@/utils/request';


const Partners = () => {

    const partnersApi = '/partners';
    const [partnersInfo, setPartnersInfo] = useState({});
    const [errorPartnersInfo, setErrorPartnersInfo] = useState('');

    const fetchPartnersData = () => {
        axios(partnersApi, {
            method: 'GET',
        })
            .then(response => {
                if (response.status === 200) {
                    setPartnersInfo([...response.data.data]);
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setErrorPartnersInfo(error.response.data.message);
                }
            });
    };

    useEffect(() => {
        fetchPartnersData();
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section id="ourPartners">
            <div className=" ourPartners-Wrap">
                <div className="container partnersContainer">
                    <div className="content-Body">
                        <p>Our Partners</p>
                    </div>
                    <p className="partners-Quote">
                        We have partnered up with some of the greatest and most reputable
                        veterinary clinics to be a part of our network, where you can enjoy
                        discounted rates and ensure your furry buddy gets the care it needs, anytime.
                        With the knowledge that pet owners have their trusted veterinarians,
                        you are free to visit any licensed clinic and we will reimburse the bill
                        based on the average price negotiated with our network partners.
                    </p>
                    <Slider {...settings} className="partners-Slider">
                        {Object.entries(partnersInfo).map(([key, item], index) => (
                            <div className="partners-Wrap" key={index}>
                                <div className="content-box">
                                    <a href={item?.redirect_url} target="_blank">
                                        <img src={item?.image ? item?.image : "images/partners/partner1.png"} alt="" />
                                    </a>
                                </div>

                                <h3 className="Partner-Name">{item?.name}</h3>
                                <h4 className="Emirate-Name">{item?.emirate}</h4>
                                <div className="banner" style={{ backgroundColor: `${item?.category__color}` }}>
                                    <p>{item?.category__name}</p>
                                </div>
                            </div>
                        ))}

                    </Slider>
                </div>
            </div>
        </section >
    );
}

export default Partners;