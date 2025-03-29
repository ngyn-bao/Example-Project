import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../Icon/LogoIcon";
import { path } from "../../common/path";
import { useSelector } from "react-redux";
import { Avatar, Dropdown } from "antd";
import UserIcon from "../Icon/UserIcon";
import LogOutIcon from "../Icon/LogOutIcon";
import FormSearchProduct from "../Form/FormSearchProduct";
import WrapperSuggestJob from "../Wrapper/WrapperSuggestJob";

const UserHeader = () => {
  const { infoUser } = useSelector((state) => state.authSlice);

  const items = [
    {
      label: (
        <Link className="flex space-x-2 items-center">
          <UserIcon color="orange" />
          <span>Thông tin cá nhân</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className="flex space-x-2 items-center">
          <LogOutIcon color="orange" />
          <span>Đăng xuất</span>
        </Link>
      ),
      key: "1",
    },
  ];

  const checkUserLogin = () => {
    return infoUser ? (
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Avatar className="cursor-pointer hover:bg-orange-500 duration-300">
          {infoUser.user.name.slice(0, 1)}
        </Avatar>
      </Dropdown>
    ) : (
      <>
        <Link
          to={path.signIn}
          className="py-2 px-4 rounded-md hover:bg-gray-200 duration-300"
        >
          Sign in
        </Link>
        <Link
          to={path.signUp}
          className="py-2 px-4 rounded-md text-green-500 border-green-500 hover:bg-green-500 hover:text-white duration-300"
        >
          Join
        </Link>
      </>
    );
  };
  console.log(infoUser);
  return (
    <div className="py-5">
      <div className="container ">
        <div className="header_content flex items-center justify-between">
          <div className="header_logo flex space-x-5 items-center">
            <Link to={path.homePage}>
              <LogoIcon />
            </Link>
            <WrapperSuggestJob>
              <FormSearchProduct />
            </WrapperSuggestJob>
          </div>
          <nav className="header_navigate space-x-5">{checkUserLogin()}</nav>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
