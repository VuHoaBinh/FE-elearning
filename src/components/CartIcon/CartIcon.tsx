import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartApi from "src/apis/cartApi";
import { getTotalCart, selectAuthorization } from "src/reducers";
import "./CartIcon.scss";

interface CartIconProps {
  sticky?: boolean;
  unRead_total?: number;
}

const CartIcon: React.FC<CartIconProps> = ({
  sticky = false,
  unRead_total = 0,
}) => {
  const { amount_cart, isAuth, isRole } = useSelector(selectAuthorization);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    isAuth && getCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount_cart]);

  const getCart = async () => {
    try {
      const response = await cartApi.getCart();
      const { numOfCarts }: any = response;
      dispatch(getTotalCart(numOfCarts));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const navigateToCart = () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      navigate(`/${isRole}/cart`);
    }
  };

  return (
    <div className="cart-icon">
      <Tooltip title="Giỏ hàng">
        <IconButton onClick={navigateToCart}>
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <span className="unread_amount">{amount_cart || 0}</span>
    </div>
  );
};
export default CartIcon;
