import { gapi } from "gapi-script";
import { useEffect } from "react";
import { GoogleLogin as GoogleLoginBtn } from "react-google-login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import { getUserInfo, isLogin, isPending, isSuccess } from "src/reducers";

const GoogleLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "909336555825-crn9564ut150r3oqaljm4ve3glj13e3f.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = (response: any) => {
    const { accessToken } = response;
    // console.log("đã lấy được response của gg là", response);
    // console.log("đã lấy được access token là", { accessToken });

    if (!accessToken) return;
    postLoginGoogle(accessToken);
  };

  const postLoginGoogle = async (access_token: string) => {
    const params = { access_token };
    dispatch(isPending());
    try {
      const response = await authApi.postLoginGoogle(params);
      // console.log(response);
      const { user, token, role }: any = response;
      localStorage.setItem("access_token", JSON.stringify(token));
      dispatch(getUserInfo(user));
      dispatch(isLogin(role));
    } catch (error) {
      console.log("lỗi rồi", error);
      toast.warning(`${error}`, {
        position: "bottom-right",
      });
      dispatch(isSuccess());
    }
  };

  return (
    <GoogleLoginBtn
      clientId="72783105646-0j3u484s6rmteh96oucfvgu8oucp9g9o.apps.googleusercontent.com"
      buttonText="Đăng nhập bằng google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLogin;
