import React, { useContext } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { useFormik } from "formik";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path";
import { useDispatch } from "react-redux";
import { getInfoUser } from "../../redux/slices/authSlice";

const AdminLogin = () => {
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      authService
        .signIn(values)
        .then((res) => {
          console.log(res);
          if (res.data.content.user.role == "USER") {
            showNotification("Bạn không có quyền truy cập đăng nhập", "error");
            let soLanViPham = getLocalStorage("viPham");
            if (!soLanViPham) {
              setLocalStorage("viPham", 1);
            } else {
              soLanViPham++;
              soLanViPham == 3
                ? (window.location.href = "https://google.com")
                : setLocalStorage("viPham", soLanViPham);
            }
          } else {
            setLocalStorage("user", res.data.content);
            dispatch(getInfoUser(res.data.content));
            navigate("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
          showNotification(
            "Có lỗi xảy ra, vui lòng thử lại hoặc báo cáo bộ phận khách hàng",
            "error",
          );
        });
    },
  });
  return (
    <div>
      <div className="container">
        <div className="admin_login flex h-screen">
          <div className="admin_login_image w-1/2"></div>
          <div className="admin_login_form w-1/2 flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold text-center mb-5">
              Đăng nhập dành cho admin
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputCustom
                onChange={handleChange}
                labelContent="Email"
                value={values.email}
                name="email"
              />
              <InputCustom
                onChange={handleChange}
                labelContent={"Mật khẩu"}
                typeInput="password"
                name="password"
                value={values.password}
              />
              <div>
                <button className="py-3 px-5 w-full block bg-black text-white rounded-md">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
