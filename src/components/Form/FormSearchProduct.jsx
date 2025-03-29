import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";

const FormSearchProduct = ({ setOpenDropDown, handleGetValueChildren }) => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    if (setOpenDropDown && handleGetValueChildren) {
      if (!valueSearch) {
        setOpenDropDown(false);
      }
    }
  }, [valueSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("hello");
    // console.log(valueSearch);
    // B1: Lấy dữ liệu người dùng
    // B2: Sử dụng useNavigate để chuyển hướng người dùng đến trang danh sách công việc
    navigate(`${path.listJob}?tenCongViec=${valueSearch}`);
    // B3: Đưa dữ liệu người dùng đã nhập vào query param khi chuyển hướng
  };

  const handleChange = (event) => {
    setValueSearch(event.target.value);
    console.log("Tôi là change");
    // Khi xử lí hành vi của phần gợi ý: khi người dùng nhập dữ liệu, sẽ bắt đầu thực hiện lấy dữ liệu keyword và gọi API tới backend để tìm kiếm sản phẩm gợi ý
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-[300px] border rounded-md border-black pl-4">
          <input
            onChange={handleChange}
            className="flex-1 focus:border-none focus:outline-none"
            type="text"
            placeholder="Nhập tên công việc cần tìm"
          />
          <button className="p-2 text-sm" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default FormSearchProduct;
