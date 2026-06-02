import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/about-1.jpg";
import about2 from "../../Assets/About/about-2.jpg";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>About MODE</h2>
        <img src={about1} alt="MODE Fashion Store" />
        <div className="aboutContent">
          <h3>Our Story</h3>
          <h4>
            MODE was born with the vision of revolutionizing the way people
            experience fashion. From the very beginning, we have been dedicated
            to offering high-quality garments that combine style, comfort, and
            sustainability.
          </h4>
          <p>
            Founded in 2020, MODE started as a small project with a big passion
            for fashion. Today, we are a recognized e-commerce platform that
            connects thousands of customers with the latest trends and emerging
            designers. Our commitment is to offer a unique shopping experience,
            with products carefully selected for each season.
          </p>
          <div className="content1">
            <div className="contentBox">
              <h5>Our Mission</h5>
              <p>
                To democratize access to quality fashion, offering sustainable
                garments and current trends at affordable prices, with
                exceptional customer service.
              </p>
            </div>
            <div className="contentBox">
              <h5>Our Vision</h5>
              <p>
                To be the leading sustainable fashion e-commerce platform in
                Latin America, inspiring people to express their unique style
                with environmental awareness.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="MODE Team" />
            </div>
            <div className="textContent">
              <h5>The Company</h5>
              <p>
                MODE is more than just a clothing store. We are a team passionate
                about fashion, technology, and sustainability. We work with
                independent designers and established brands to offer a diverse
                and high-quality catalog. Our commitment to the environment
                leads us to select sustainable materials and ethical production
                practices. At MODE, we believe that fashion can be beautiful,
                accessible, and responsible.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Our Partners</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="Partner brand" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="Partner brand" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="Partner brand" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="Partner brand" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="Partner brand" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="Partner brand" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="Partner brand" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;