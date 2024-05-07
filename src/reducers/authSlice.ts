import { createSlice } from "@reduxjs/toolkit";
import { ActionSlices, AuthSlice } from "src/types";

const initialState: AuthSlice = {
  isLoading: false,
  isAuth: false,
  isRole: "",
  amount_cart: 0,
  userInfo: {},
  panelActive: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    isPending(state) {
      state.isLoading = true;
    },
    isLogin(state, action) {
      state.isLoading = false;
      state.isAuth = true;
      state.isRole = action.payload;
    },
    getUserInfo(state, action) {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    getTotalCart(state, action) {
      state.amount_cart = action.payload;
    },
    getPanelActive(state, action) {
      state.panelActive = action.payload;
    },
    isSuccess(state) {
      state.isLoading = false;
    },
    isLogout(state) {
      state.isAuth = false;
      state.isLoading = false;
      state.amount_cart = 0;
      state.userInfo = {};
      state.panelActive = "";
      state.isRole = "";
    },
  },
  extraReducers: {},
});

const { actions, reducer } = authSlice;

export const {
  getTotalCart,
  isPending,
  isLogin,
  getUserInfo,
  isSuccess,
  getPanelActive,
  isLogout,
} = actions;

export const selectAuthorization = (state: ActionSlices) => state.auth;

export default reducer;
