import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

import { useDispatch } from "react-redux";
import { addToCartThunk, addToCartLocal } from "../../../Features/Cart/cartSlice";
import { getCurrentUser } from "../../../Services/auth";
import { getProductById } from "../../../Services/api";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { PiShareNetworkLight } from "react-icons/pi";

import toast from "react-hot-toast";
import "./Product.css";

const Product = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  // Estados
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [selectSize, setSelectSize] = useState("S");
  const [highlightedColor, setHighlightedColor] = useState("#C8393D");
  const [currentImg, setCurrentImg] = useState(0);

  // Cargar producto desde la API
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    if (id) {
      loadProduct();
    }
  }, [id]);

  // Funciones de navegación de imágenes
  const prevImg = () => {
    if (product) {
      const productImages = getProductImages();
      setCurrentImg(currentImg === 0 ? productImages.length - 1 : currentImg - 1);
    }
  };

  const nextImg = () => {
    if (product) {
      const productImages = getProductImages();
      setCurrentImg(currentImg === productImages.length - 1 ? 0 : currentImg + 1);
    }
  };

  // Obtener array de imágenes del producto
  const getProductImages = () => {
    if (!product) return [];
    return [
      product.frontImg,
      product.backImg || product.frontImg,
      product.frontImg,
      product.frontImg
    ];
  };

  // Funciones de cantidad
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handleWishClick = () => setClicked(!clicked);

  // Agregar al carrito
  const handleAddToCart = async () => {
    if (!product) return;
    
    const user = getCurrentUser();
    
    if (user) {
      const result = await dispatch(addToCartThunk({ 
        productId: product._id, 
        quantity: quantity,
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
        for (let i = 0; i < quantity; i++) {
          dispatch(addToCartLocal(cartProduct));
        }
      }
    } else {
      const cartProduct = {
        productID: product._id,
        productName: product.productName,
        productPrice: product.productPrice,
        frontImg: product.frontImg,
        productReviews: product.productReviews || "0 reviews",
      };
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCartLocal(cartProduct));
      }
    }
    
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sizes = ["XS", "S", "M", "L", "XL"];
  const sizesFullName = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
  const colors = ["#222222", "#C8393D", "#E4E4E4"];
  const colorsName = ["Black", "Red", "Grey"];

  // Mostrar loading
  if (loading) {
    return (
      <div className="productSection">
        <div style={{ textAlign: "center", padding: "100px" }}>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Si no hay producto
  if (!product) {
    return (
      <div className="productSection">
        <div style={{ textAlign: "center", padding: "100px" }}>
          <p>Producto no encontrado</p>
          <Link to="/shop">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  const productImages = getProductImages();

  return (
    <>
      <div className="productSection">
        <div className="productShowCase">
          <div className="productGallery">
            <div className="productThumb">
              {productImages.slice(0, 4).map((img, idx) => (
                <img key={idx} src={img} onClick={() => setCurrentImg(idx)} alt="" />
              ))}
            </div>
            <div className="productFullImg">
              <img src={productImages[currentImg]} alt={product.productName} />
              <div className="buttonsGroup">
                <button onClick={prevImg} className="directionBtn">
                  <GoChevronLeft size={18} />
                </button>
                <button onClick={nextImg} className="directionBtn">
                  <GoChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="productDetails">
            <div className="productBreadcrumb">
              <div className="breadcrumbLink">
                <Link to="/" onClick={scrollToTop}>Home</Link>&nbsp;/&nbsp;
                <Link to="/shop" onClick={scrollToTop}>The Shop</Link>
              </div>
              <div className="prevNextLink">
                <Link to="#"><GoChevronLeft /><p>Prev</p></Link>
                <Link to="#"><p>Next</p><GoChevronRight /></Link>
              </div>
            </div>
            <div className="productName">
              <h1>{product.productName}</h1>
            </div>
            <div className="productRating">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color="#FEC78A" size={10} />
              ))}
              <p>{product.productReviews || "0 reviews"}</p>
            </div>
            <div className="productPrice">
              <h3>${product.productPrice}</h3>
            </div>
            <div className="productDescription">
              <p>
                Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                elementum gravida nec dui. Aenean aliquam varius ipsum, non
                ultricies tellus sodales eu. Donec dignissim viverra nunc, ut
                aliquet magna posuere eget.
              </p>
            </div>
            <div className="productSizeColor">
              <div className="productSize">
                <p>Sizes</p>
                <div className="sizeBtn">
                  {sizes.map((size, index) => (
                    <Tooltip
                      key={size}
                      title={sizesFullName[index]}
                      placement="top"
                      TransitionComponent={Zoom}
                      enterTouchDelay={0}
                      arrow
                    >
                      <button
                        style={{
                          borderColor: selectSize === size ? "#000" : "#e0e0e0",
                        }}
                        onClick={() => setSelectSize(size)}
                      >
                        {size}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div className="productColor">
                <p>Color</p>
                <div className="colorBtn">
                  {colors.map((color, index) => (
                    <Tooltip
                      key={color}
                      title={colorsName[index]}
                      placement="top"
                      enterTouchDelay={0}
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <button
                        className={highlightedColor === color ? "highlighted" : ""}
                        style={{
                          backgroundColor: color.toLowerCase(),
                          border: highlightedColor === color ? "0px solid #000" : "0px solid white",
                          padding: "8px",
                          margin: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => setHighlightedColor(color)}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
            <div className="productCartQuantity">
              <div className="productQuantity">
                <button onClick={decrement}>-</button>
                <input type="text" value={quantity} onChange={handleInputChange} />
                <button onClick={increment}>+</button>
              </div>
              <div className="productCartBtn">
                <button onClick={handleAddToCart}>Add to Cart</button>
              </div>
            </div>
            <div className="productWishShare">
              <div className="productWishList">
                <button onClick={handleWishClick}>
                  <FiHeart color={clicked ? "red" : ""} size={17} />
                  <p>Add to Wishlist</p>
                </button>
              </div>
              <div className="productShare">
                <PiShareNetworkLight size={22} />
                <p>Share</p>
              </div>
            </div>
            <div className="productTags">
              <p><span>SKU: </span>N/A</p>
              <p><span>CATEGORIES: </span>{product.category || "Uncategorized"}</p>
              <p><span>TAGS: </span>fashion, clothing, style</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;