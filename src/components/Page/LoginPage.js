import React, { useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import SignIn from "../Signin";
import { ReactComponent as Background } from "../../assets/OsttraSwoosh.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userInfo.accessToken); // to be decided by api response
  useEffect(() => {
    if (token !== undefined && token !== "") {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div style={{ height: "100%", display: "flex" }}>
      <Background style={{ position: "fixed", top: 0, right: 0,height: '100%', zIndex: -1 }} />
      <SignIn />
    </div>
  );
};

export default LoginPage;
