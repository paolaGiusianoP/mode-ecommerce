import React, { useState, useEffect } from "react";
import "./RelatedProducts.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { getProducts } from "../../../Services/api";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState({});
  const [loading, setLoading] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleWishlistClick = (productId) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productId]: !prevWishlist[productId],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="relatedProductSection">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Cargando productos relacionados...</p>
        </div>
      </div>
    );
  }

  const relatedProducts = products.slice(0, 8);

  return (
    <>
      <div className="relatedProductSection">
        <div className="relatedProducts">
          <h2>
            RELATED <span>PRODUCTS</span>
          </h2>
        </div>
        <div className="relatedProductSlider">
          <div className="swiper-button image-swiper-button-next">
            <IoIosArrowForward />
          </div>
          <div className="swiper-button image-swiper-button-prev">
            <IoIosArrowBack />
          </div>
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={30}
            loop={true}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 30,
              },
            }}
          >
            {relatedProducts.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <div className="rpContainer">
                    <div className="rpImages" onClick={scrollToTop}>
                      <img
                        src={product.frontImg}
                        alt={product.productName}
                        className="rpFrontImg"
                      />
                      <img
                        src={product.backImg || product.frontImg}
                        className="rpBackImg"
                        alt={product.productName}
                      />
                      <h4>Add to Cart</h4>
                    </div>

                    <div className="relatedProductInfo">
                      <div className="rpCategoryWishlist">
                        <p>{product.category || "Products"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{
                            color: wishList[product._id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="productNameInfo">
                        <h5 onClick={scrollToTop}>{product.productName}</h5>
                        <p>${product.productPrice}</p>
                        <div className="productRatingReviews">
                          <div className="productRatingStar">
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                            <FaStar color="#FEC78A" size={10} />
                          </div>
                          <span>{product.productReviews || "0 reviews"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;