import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch } from "react-redux";
import { addToCartThunk, addToCartLocal } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import { getProducts } from "../../../Services/api";
import { getCurrentUser } from "../../../Services/auth";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWishlistClick = (productId) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productId]: !prevWishlist[productId],
    }));
  };

  const sortByPrice = (a, b) => a.productPrice - b.productPrice;

  const sortByReviews = (a, b) => {
    const reviewsA = parseInt(
      (a.productReviews || "0 reviews").replace("k+ reviews", "").replace(",", "")
    );
    const reviewsB = parseInt(
      (b.productReviews || "0 reviews").replace("k+ reviews", "").replace(",", "")
    );
    return reviewsB - reviewsA;
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
      <div className="trendyProducts">
        <div className="loading-container" style={{ textAlign: "center", padding: "50px" }}>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  const displayProducts = products.slice(0, 8);

  return (
    <>
      <div className="trendyProducts">
        <h2>
          Our Trendy <span>Products</span>
        </h2>
        <div className="trendyTabs">
          <div className="tabs">
            <p
              onClick={() => handleTabClick("tab1")}
              className={activeTab === "tab1" ? "active" : ""}
            >
              All
            </p>
            <p
              onClick={() => handleTabClick("tab2")}
              className={activeTab === "tab2" ? "active" : ""}
            >
              New Arrivals
            </p>
            <p
              onClick={() => handleTabClick("tab3")}
              className={activeTab === "tab3" ? "active" : ""}
            >
              Best Seller
            </p>
            <p
              onClick={() => handleTabClick("tab4")}
              className={activeTab === "tab4" ? "active" : ""}
            >
              Top Rated
            </p>
          </div>
          <div className="trendyTabContent">
            {/* Tab 1 - All */}
            {activeTab === "tab1" && (
              <div className="trendyMainContainer">
                {displayProducts.map((product) => (
                  <div className="trendyProductContainer" key={product._id}>
                    <div className="trendyProductImages">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_front"
                        />
                        <img
                          src={product.backImg || product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="trendyProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="trendyProductInfo">
                      <div className="trendyProductCategoryWishlist">
                        <p>{product.category || "Uncategorized"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{
                            color: wishList[product._id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="trendyProductNameInfo">
                        <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>
                        <div className="trendyProductRatingReviews">
                          <div className="trendyProductRatingStar">
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
                ))}
              </div>
            )}

            {/* Tab 2 - New Arrivals */}
            {activeTab === "tab2" && (
              <div className="trendyMainContainer">
                {[...displayProducts].reverse().map((product) => (
                  <div className="trendyProductContainer" key={product._id}>
                    <div className="trendyProductImages">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_front"
                        />
                        <img
                          src={product.backImg || product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="trendyProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="trendyProductInfo">
                      <div className="trendyProductCategoryWishlist">
                        <p>{product.category || "Uncategorized"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{
                            color: wishList[product._id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="trendyProductNameInfo">
                        <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>
                        <div className="trendyProductRatingReviews">
                          <div className="trendyProductRatingStar">
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
                ))}
              </div>
            )}

            {/* Tab 3 - Best Seller */}
            {activeTab === "tab3" && (
              <div className="trendyMainContainer">
                {[...displayProducts].sort(sortByReviews).map((product) => (
                  <div className="trendyProductContainer" key={product._id}>
                    <div className="trendyProductImages">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_front"
                        />
                        <img
                          src={product.backImg || product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="trendyProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="trendyProductInfo">
                      <div className="trendyProductCategoryWishlist">
                        <p>{product.category || "Uncategorized"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{
                            color: wishList[product._id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="trendyProductNameInfo">
                        <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>
                        <div className="trendyProductRatingReviews">
                          <div className="trendyProductRatingStar">
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
                ))}
              </div>
            )}

            {activeTab === "tab4" && (
              <div className="trendyMainContainer">
                {[...displayProducts].sort(sortByPrice).map((product) => (
                  <div className="trendyProductContainer" key={product._id}>
                    <div className="trendyProductImages">
                      <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_front"
                        />
                        <img
                          src={product.backImg || product.frontImg}
                          alt={product.productName}
                          className="trendyProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>
                    <div
                      className="trendyProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>
                    <div className="trendyProductInfo">
                      <div className="trendyProductCategoryWishlist">
                        <p>{product.category || "Uncategorized"}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product._id)}
                          style={{
                            color: wishList[product._id] ? "red" : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div className="trendyProductNameInfo">
                        <Link to={`/product/${product._id}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>
                        <div className="trendyProductRatingReviews">
                          <div className="trendyProductRatingStar">
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
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="discoverMore">
          <Link to="/shop" onClick={scrollToTop}>
            <p>Discover More</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Trendy;