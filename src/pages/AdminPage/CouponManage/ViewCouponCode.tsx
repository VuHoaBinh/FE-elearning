import React from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import couponApi from "src/apis/couponApi";
import { isPending, isSuccess } from "src/reducers/authSlice";

const clientId =
  "942896735462-hem47nr3c8j7edng3f141di5begbq7gk.apps.googleusercontent.com";

interface ViewCouponCodeProps {
  couponId?: any;
}

const ViewCouponCode: React.FC<ViewCouponCodeProps> = ({ couponId }) => {
  const dispatch = useDispatch();

  const responseGoogle = async (response: any) => {
    // console.log("đã lấy được response của gg là", response);

    const { tokenObj } = response;
    // console.log("đã lấy được tokenObj token là", tokenObj);
    const { access_token, expires_at } = tokenObj;
    // console.log("đã lấy được access,expires at là", access_token, expires_at);

    const params = { access_token, expiry_date: expires_at, id: couponId };
    // console.log("params là", params);
    dispatch(isPending());
    try {
      const response = await couponApi.postCouponToGoogleSheet(params);
      console.log("asd", response);
      const { link }: any = response;
      console.log("link", link);
      dispatch(isSuccess());
      link && window.open(link, "_blank");
    } catch (error) {
      dispatch(isSuccess());
      toast.warning("Xem coupon bị lỗi", { position: "bottom-right" });
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <span style={{ cursor: "pointer" }} onClick={renderProps.onClick}>
          Xem chi tiết
        </span>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
      scope="https://www.googleapis.com/auth/spreadsheets"
      accessType="offline"
      //   responseType="code"
    />
  );
};

export default ViewCouponCode;
