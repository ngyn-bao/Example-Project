import { Dropdown, Space } from "antd";
import { congViecService } from "../../services/congViec.service";
import useDebounce from "../../hooks/useDebounce";
import React, { cloneElement, useEffect, useState } from "react";

const WrapperSuggestJob = ({ children }) => {
  const [items, setItems] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [value, setValue] = useState("");

  const handleGetValueChildren = (valueChildren) => {
    setValue(valueChildren);
  };

  const clonedChildren = cloneElement(children, {
    setOpenDropDown,
    handleGetValueChildren,
  });

  const debounceValue = useDebounce(value, 1000);

  useEffect(() => {
    if (value) {
      congViecService
        .layCongViecTheoTen(value)
        .then((res) => {
          console.log(res.data.content);
          let newItems = res.data.content.slice(0, 4).map((item, index) => {
            return {
              key: index.toString(),
              label: (
                <Link className="flex items-center space-x-4">
                  <img src={item.congViec?.hinhAnh} alt="" className="h-24" />
                  <div>
                    <h4>{item.congViec?.tenCongViec}</h4>
                    <p>{item.congViec?.giaTien}</p>
                  </div>
                </Link>
              ),
            };
          });
          setItems(newItems);
          setOpenDropDown(true);
        })
        .catch((err) => {
          console.log(err);
          setOpenDropDown(false);
          // Sử dụng thông báo khi có lỗi từ Backend
        });
    }
  }, [debounceValue]);

  return (
    <Dropdown
      menu={{
        items,
      }}
      open={openDropDown}
    >
      {clonedChildren}
    </Dropdown>
  );
};

export default WrapperSuggestJob;
