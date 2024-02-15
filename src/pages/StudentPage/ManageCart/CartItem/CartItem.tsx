import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import FormControl from "src/components/FormControl";
import MediaContent from "src/components/MediaContent";
import { getTotalCart, isPending, isSuccess } from "src/reducers";
import { ICart } from "src/types";
import formatCharacter from "src/utils/formatCharacter";
import "./CartItem.scss";

interface CartItemProps {
  cartItem?: ICart;
  onUpdate?: (isComplete: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, onUpdate }) => {
  // console.log(cartItem);
  const dispatch = useDispatch();

  const handleAddCoupon = async (e: any) => {
    e.preventDefault();
    const { coupon } = e.target;
    if (!coupon.value) {
      toast.warning("Vui lòng nhập coupon", { position: "bottom-right" });
      return;
    }
    onUpdate?.(false);
    const params = { coupon: coupon.value };
    // console.log("params", params);

    try {
      await cartApi.addCouponToCart(cartItem?.course?._id, params);
      onUpdate?.(true);
      toast.success("Nhập mã coupon thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      toast.warning(`${error}`, {
        position: "bottom-right",
      });
    }
  };

  const handleRemoveCoupon = async () => {
    onUpdate?.(false);
    const params = { coupon: "" };
    // console.log("params", params);

    try {
      const response = await cartApi.addCouponToCart(
        cartItem?.course?._id,
        params
      );
      onUpdate?.(true);
      console.log("ưer", response);

      toast.success("Gỡ mã coupon thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      toast.warning(`${error}`, {
        position: "bottom-right",
      });
    }
  };

  const handleDeleteCart = async () => {
    onUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await cartApi.removeItemFromCart(cartItem?.course?._id);
      const { carts }: any = response;
      // console.log("carts", carts.length);
      dispatch(getTotalCart(carts.length));
      onUpdate?.(true);
      dispatch(isSuccess());
      toast.success("Xoá khoá học thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      dispatch(isSuccess());
      toast.warning("Xoá khoá học thất bại", { position: "bottom-right" });
    }
  };

  const handleBuyLater = async () => {
    const params = { wishlist: true };
    onUpdate?.(false);
    dispatch(isPending());
    try {
      await cartApi.addCouponToCart(cartItem?.course?._id, params);
      // console.log(response);
      onUpdate?.(true);
      dispatch(isSuccess());
      toast.success("Đã thêm vào danh sách mua sau", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      dispatch(isSuccess());
      toast.warning("Thêm vào danh sách mua sau thất bại", {
        position: "bottom-right",
      });
    }
  };
  const handleAddToBuy = async () => {
    const params = { wishlist: false };
    onUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await cartApi.addCouponToCart(
        cartItem?.course?._id,
        params
      );
      console.log(response);
      onUpdate?.(true);
      dispatch(isSuccess());
    } catch (error) {
      console.log("lỗi rồi", { error });
      onUpdate?.(true);
      dispatch(isSuccess());
    }
  };

  return (
    <div className="cart-item">
      <div className="image">
        <MediaContent.Image
          width={150}
          height={120}
          src={cartItem?.course?.thumbnail}
        />
      </div>
      <div className="info">
        <span className="title">{cartItem?.course?.name}</span>
        <span className="author">
          <b>Tác giả: </b>
          {cartItem?.course?.author?.fullName}
        </span>
        {!cartItem?.wishlist && (
          <form
            onSubmit={handleAddCoupon}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              height: 35,
            }}
          >
            <FormControl.Input
              placeholder="Nhập coupon"
              value={cartItem?.coupon}
              style={{ height: 35 }}
              name="coupon"
              // onChange={(e: any) => setCoupon(e.target.value)}
            />
            {!cartItem?.coupon ? (
              <Button type="submit" variant="contained" color="success">
                Áp dụng mã
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                onClick={handleRemoveCoupon}
              >
                Gỡ mã
              </Button>
            )}
          </form>
        )}
      </div>
      <div className="price">
        <span>
          <b>Giá: </b>
          <span>
            {formatCharacter.numberLocale(cartItem?.course?.currentPrice)} đồng
          </span>
        </span>
        <span>
          <b>Giảm: </b>
          {formatCharacter.numberLocale(cartItem?.course?.discount)} đồng
        </span>
      </div>
      <div className="handle">
        {cartItem?.wishlist ? (
          <span onClick={handleAddToBuy}>Thêm vô giỏ hàng</span>
        ) : (
          <span onClick={handleBuyLater}>Mua sau</span>
        )}
        <span onClick={handleDeleteCart}>Xoá khỏi giỏ hàng</span>
      </div>
    </div>
  );
};

export default CartItem;
