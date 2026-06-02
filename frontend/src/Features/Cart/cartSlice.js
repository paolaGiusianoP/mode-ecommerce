import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCart, addToCartAPI, updateCartItemAPI, removeFromCartAPI, clearCartAPI } from "../../Services/cart";
import { getCurrentUser } from "../../Services/auth";

export const loadCart = createAsyncThunk(
  'cart/loadCart',
  async (_, { rejectWithValue }) => {
    const user = getCurrentUser();
    if (!user) return { items: [], totalAmount: 0 };
    
    const result = await fetchCart();
    if (result.ok) {
      return result.data;
    }
    return rejectWithValue(result.data.message);
  }
);

// Thunk para agregar al carrito
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity, product }, { rejectWithValue }) => {
    const user = getCurrentUser();
    if (!user) {
      return { product, quantity, localOnly: true };
    }
    
    const result = await addToCartAPI(productId, quantity);
    if (result.ok) {
      return result.data;
    }
    return rejectWithValue(result.data.message);
  }
);

// Thunk para actualizar cantidad
export const updateCartThunk = createAsyncThunk(
  'cart/updateCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    const user = getCurrentUser();
    if (!user) return { productId, quantity, localOnly: true };
    
    const result = await updateCartItemAPI(productId, quantity);
    if (result.ok) {
      return result.data;
    }
    return rejectWithValue(result.data.message);
  }
);

// Thunk para eliminar del carrito
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    const user = getCurrentUser();
    if (!user) return { productId, localOnly: true };
    
    const result = await removeFromCartAPI(productId);
    if (result.ok) {
      return result.data;
    }
    return rejectWithValue(result.data.message);
  }
);

// Thunk para vaciar carrito
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    const user = getCurrentUser();
    if (!user) return { localOnly: true };
    
    const result = await clearCartAPI();
    if (result.ok) {
      return result.data;
    }
    return rejectWithValue(result.data.message);
  }
);

const initialState = {
  items: [],
  totalAmount: 0,
  loading: false,
  error: null,
  synced: false
};

const MAX_QUANTITY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.productID === product.productID
      );
      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += 1;
          state.totalAmount += product.productPrice;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
        state.totalAmount += product.productPrice;
      }
    },
    updateQuantityLocal(state, action) {
      const { productID, quantity } = action.payload;
      const itemToUpdate = state.items.find(
        (item) => item.productID === productID
      );
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.quantity;
        if (quantity <= MAX_QUANTITY) {
          itemToUpdate.quantity = quantity;
          state.totalAmount += difference * itemToUpdate.productPrice;
        } else {
          itemToUpdate.quantity = MAX_QUANTITY;
          state.totalAmount +=
            (MAX_QUANTITY - itemToUpdate.quantity) * itemToUpdate.productPrice;
        }
      }
    },
    removeFromCartLocal(state, action) {
      const productId = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.productID === productId
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.productPrice * itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => item.productID !== productId
        );
      }
    },
    clearCartLocal(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    syncCartFromBackend(state, action) {
      const backendCart = action.payload;
      state.items = backendCart.items.map(item => ({
        productID: item.productId,
        productName: item.productName,
        productPrice: item.productPrice,
        frontImg: item.frontImg,
        quantity: item.quantity,
        productReviews: "0 reviews"
      }));
      state.totalAmount = backendCart.totalAmount;
      state.synced = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load cart
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.items) {
          state.items = action.payload.items.map(item => ({
            productID: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            frontImg: item.frontImg,
            quantity: item.quantity,
            productReviews: "0 reviews"
          }));
          state.totalAmount = action.payload.totalAmount;
        }
        state.synced = true;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        if (action.payload.localOnly) {
          return;
        }
        if (action.payload && action.payload.items) {
          state.items = action.payload.items.map(item => ({
            productID: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            frontImg: item.frontImg,
            quantity: item.quantity,
            productReviews: "0 reviews"
          }));
          state.totalAmount = action.payload.totalAmount;
        }
      })
      // Update cart
      .addCase(updateCartThunk.fulfilled, (state, action) => {
        if (action.payload && action.payload.items && !action.payload.localOnly) {
          state.items = action.payload.items.map(item => ({
            productID: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            frontImg: item.frontImg,
            quantity: item.quantity,
            productReviews: "0 reviews"
          }));
          state.totalAmount = action.payload.totalAmount;
        }
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        if (action.payload && action.payload.items && !action.payload.localOnly) {
          state.items = action.payload.items.map(item => ({
            productID: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            frontImg: item.frontImg,
            quantity: item.quantity,
            productReviews: "0 reviews"
          }));
          state.totalAmount = action.payload.totalAmount;
        }
      });
  }
});

export const { 
  addToCartLocal, 
  updateQuantityLocal, 
  removeFromCartLocal, 
  clearCartLocal,
  syncCartFromBackend 
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartLoading = (state) => state.cart.loading;

export default cartSlice.reducer;