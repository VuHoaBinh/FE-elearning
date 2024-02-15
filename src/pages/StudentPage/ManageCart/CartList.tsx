import { Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import paymentApi from "src/apis/paymentApi";
import LoadingContent from "src/components/LoadingContent";
import { selectAuthorization } from "src/reducers";
import { ICart, ICartInfo } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import CartItem from "./CartItem";
import "./CartList.scss";

const CartList = () => {
  document.title = "Quản lý giỏ hàng";

  const [cart, setCart] = useState<ICart[]>([]);
  const [wishlist, setWishlist] = useState<ICart[]>([]);
  const [cartInfo, setCartInfo] = useState<ICartInfo>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const { amount_cart } = useSelector(selectAuthorization);

  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, [amount_cart, isUpdate]);

  const getCart = async () => {
    try {
      const response = await cartApi.getCart();
      const {
        carts,
        estimatedPrice,
        totalDiscount,
        totalPrice,
        wishlist,
      }: any = response;
      // console.log("carts", carts, "wish-list", wishlist);
      setCart(carts);
      setWishlist(wishlist);
      setCartInfo({ estimatedPrice, totalDiscount, totalPrice });
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderCartItem = (carts: ICart[]) => {
    if (carts.length === 0) {
      return "Không có khoá nào";
    }

    return (
      carts.length > 0 &&
      carts.map((cart: ICart, index) => (
        <CartItem
          onUpdate={(status) => setIsUpdate(status)}
          key={index}
          cartItem={cart}
        />
      ))
    );
  };

  const handlePayment = async () => {
    setIsLoading(true);
    const { estimatedPrice } = cartInfo;

    if (estimatedPrice && estimatedPrice > 0) {
      const params = { paymentMethod: "vnPay" };
      try {
        const response = await paymentApi.postCheckout(params);
        const { location }: any = response;
        // console.log(location);
        window.location.href = location;
        setIsLoading(false);
      } catch (error) {
        console.log("lỗi rồi", { error });
        toast.warning("Thanh toán lỗi", { position: "bottom-right" });
        setIsLoading(false);
      }
    } else {
      console.log("mua khoá này");

      try {
        const response = await paymentApi.postCheckout();
        const { invoice }: any = response;
        // console.log("response", response);
        // window.location.href = invoice._id;
        toast.success("Mua khoá học thành công", { position: "bottom-right" });
        navigate(`/invoice/${invoice._id}`);
        setIsLoading(false);
      } catch (error) {
        console.log("lỗi rồi", { error });
        toast.warning("Thanh toán lỗi", { position: "bottom-right" });
        setIsLoading(false);
      }
    }
  };

  return (
  
    <div className="cart-list">
      <h3>Thông tin giỏ hàng </h3>
      <div className="cart-content">
        <div className="cart-items">
          {renderCartItem(cart) || <LoadingContent.Loading />}
        </div>
        {cart.length > 0 && (
          <div className="cart-price">
            <h3>Tổng tiền giỏ hàng</h3>
            <Divider sx={{ marginY: 1 }} />
            <span>
              <b>Giá ước tính: </b>
              {formatCharacter.numberLocale(cartInfo.totalPrice)} đồng
            </span>
            <span>
              <b>Tổng giảm: </b>
              {formatCharacter.numberLocale(cartInfo.totalDiscount)} đồng
            </span>
            <Divider />
            <span>
              <b>Thành tiền: </b>
              <span style={{ color: "red", fontWeight: 700 }}>
                {formatCharacter.numberLocale(cartInfo.estimatedPrice)} đồng
              </span>
            </span>
            <span className="note">
              Lưu ý: suy nghĩ kỹ trước khi mua, không hoàn trả lại sau khi mua
            </span>
            <Button
              variant="contained"
              color="success"
              onClick={handlePayment}
              disabled={isLoading}
            >
              {!isLoading ? "Thanh toán" : <LoadingContent.Loading />}
            </Button>
          </div>
        )}
      </div>
      <Divider />
      <h3>Danh sách mua sau</h3>
      <div className="cart-content">
        <div className="cart-items">
          {renderCartItem(wishlist) || <LoadingContent.Loading />}
        </div>
      </div>
    </div>
  );
};
export default CartList;
