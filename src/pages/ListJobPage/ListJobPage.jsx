import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [listJob, setListJob] = useState([]);
  console.log(searchParam.get("tenCongViec"));
  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        console.log(res);
        setListJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParam.get("tenCongViec")]);
  return (
    <div className="container">
      <h1 className="text-4xl font-bold">
        Danh sách công việc dựa theo từ khóa:{" "}
        {searchParam.get("tenCongViec") ?? ""}
      </h1>
      <div className="grid grid-cols-4 gap-10">
        {listJob.map((item, index) => {
          console.log(item);
          return (
            <div className="space-y-4 border rounded-md p-3">
              <img src={item.congViec?.hinhAnh} alt="" className="w-full" />
              {/* Người tạo */}
              <div className="flex items-center space-x-3">
                <img
                  src={item.avatar}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
                <h4 className="font-bold text-lg">{item.tenNguoiTao}</h4>
              </div>
              {/* Đánh giá và tên công việc */}
              <div>
                <h3>{item.congViec?.tenCongViec}</h3>
                <p>
                  <span className="text-yellow-400 space-x-2">
                    <i className="fa-solid fa-star ">
                      {item.congViec?.saoCongViec}
                    </i>
                    <span className="text-gray-400">
                      ({item.congViec?.danhGia})
                    </span>
                  </span>
                </p>
              </div>
              {/* Lựa chọn yêu thích và giá tiền công việc */}
              <div className="flex items-center justify-between">
                <i className="fa-solid fa-heart"></i>
                <p className="uppercase">
                  Starting at <span>{item.congViec?.giaTien}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListJobPage;
