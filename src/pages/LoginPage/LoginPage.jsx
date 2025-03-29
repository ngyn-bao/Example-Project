import React, { useContext } from "react";
import signInAnimation from "./../../assets/animations/signInAnimation.json";
import { useLottie } from "lottie-react";
import InputCustom from "../../components/Input/InputCustom";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "../../services/auth.service";
import { setLocalStorage } from "../../utils/util";
import { NotificationContext } from "../../App";
import { path } from "../../common/path";
import { useDispatch } from "react-redux";
import { getInfoUser } from "../../redux/slices/authSlice";
import useResponsive from "../../hooks/useResponsive";

const LoginPage = () => {
  const isResponsive = useResponsive({
    mobile: 576,
    tablet: 768,
    // laptop: 1440,
  });
  console.log(isResponsive);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useContext(NotificationContext);

  const options = {
    animationData: signInAnimation,
    loop: true,
  };

  const { View } = useLottie(options);

  //   Thực hiện setup formik trong phần form login page
  const {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      authService
        .signIn(values)
        .then((res) => {
          console.log(res);
          // B1: Lưu trữ ở localStorage
          setLocalStorage("user", res.data.content);
          dispatch(getInfoUser(res.data.content));
          // B2: Thông báo và chuyển hướng người dùng
          showNotification(
            "Đăng nhập thành công, bạn sẽ được chuyển hướng về trang chủ",
            "success",
            2000,
          );
          setTimeout(() => {
            navigate(path.homePage);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          showNotification(err.response.data.message, "error");
        });
      resetForm();
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Vui lòng không bỏ trống")
        .email("Vui lòng nhập đúng định dạng email"),
      password: yup
        .string()
        .required("Vui lòng không bỏ trống")
        .min(6, "Nhập tối thiểu 6 kí tự")
        .max(10, "Nhập tối đa 10 kí tự"),
    }),
  });
  //  gắn các thuộc tính cần cho các input vào 2 component inputcustom
  //  gắn validation cho 2 inputcustom: email(required, email), password(required, min(6), max(10), ít nhất chữ cái viết hoa, đặc biệt, số, ...)
  //   thực hiện test phần form xem các onsubmit và validation hoạt động đúng hay ko
  // return isResponsive.mobile ? <InputCustom /> : <PageNotFound />;
  return (
    <div className="h-screen bg-red-200">
      <div className="container">
        <div
          className={`loginPage_content ${
            isResponsive.mobile ? "block" : "flex"
          } items-center`}
        >
          <div
            className={`loginPage_img ${
              isResponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            {View}
          </div>
          <div
            className={`loginPage_form ${
              isResponsive.mobile ? "w-full" : "w-1/2"
            }`}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="text-center text-4xl font-medium uppercase">
                Đăng nhập
              </h1>
              {/* email */}
              <InputCustom
                name={"email"}
                onChange={handleChange}
                value={values.email}
                labelContent={"Email"}
                placeholder={"Vui lòng nhập email"}
                errors={errors.email}
                touched={touched.email}
                onBlur={handleBlur}
              />
              <InputCustom
                name={"password"}
                onChange={handleChange}
                value={values.password}
                placeholder={"Vui lòng nhập mật khẩu "}
                labelContent={"Password"}
                typeInput="password"
                errors={errors.password}
                touched={touched.password}
                onBlur={handleBlur}
              />
              <button
                className="button inline-block w-full border py-2 px-5 rounded-md text-white bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500  duration-300"
                type="submit"
              >
                Đăng nhập
              </button>
              <Link className="mt-3 text-red-500 inline-block hover:underline duration-300 hover:text-red-800">
                Chưa có tài khoản? Bấm vào đây
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
