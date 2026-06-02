import React, { useState, useEffect } from "react";
import "./LimitedEdition.css";

import { useDispatch } from "react-redux";
import { addToCartThunk, addToCartLocal } from "../../../Features/Cart/cartSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";

import toast from "react-hot-toast";

import { getProducts } from "../../../Services/api";
import { getCurrentUser } from "../../../Services/auth";

const LimitedEdition = () => {
  const dispatch = useDispatch();

  const [wishList, setWishList] = useState({});
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      const lastFiveProducts = data.slice(-5);
      setLimitedProducts(lastFiveProducts);
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

  // Handle Add to Cart con persistencia
  const handleAddToCart = async (product) => {
    const user = getCurrentUser();
    
    if (user) {
      const result = await dispatch(addToCartThunk({ 
        productId: product._id, 
        quantity: 1,
        product: {
          productID: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          frontImg: product.frontImg,
          productReviews: product.productReviews || "0 reviews"
        }
      }));
      
      if (result.payload?.localOnly) {
        const cartProduct = {
          productID: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          frontImg: product.frontImg,
          productReviews: product.productReviews || "0 reviews",
        };
        dispatch(addToCartLocal(cartProduct));
      }
    } else {
      const cartProduct = {
        productID: product._id,
        productName: product.productName,
        productPrice: product.productPrice,
        frontImg: product.frontImg,
        productReviews: product.productReviews || "0 reviews",
      };
      dispatch(addToCartLocal(cartProduct));
    }
    
    toast.success(`Added to cart!`);
  };

  if (loading) {
    return (
      <div className="limitedProductSection">
        <div className="loading-container" style={{ textAlign: "center", padding: "50px" }}>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="limitedProductSection">
        <h2>
          Limited <span>Edition</span>
        </h2>
        <div className="limitedProductSlider">
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
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 1,
                spaceBetween: 30,
              },
            }}
          >
            {limitedProducts.map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <div className="lpContainer">
                    <div className="lpImageContainer">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt={product.productName}
                          className="lpImage"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="lpProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="limitedProductInfo">
                      <div className="lpCategoryWishlist">
                        <p>{product.category || "Limited Edition"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{
                            color: wishList[product._id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="productNameInfo">
                        <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
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

export default LimitedEdition;