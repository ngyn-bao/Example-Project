import React, { useEffect, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getValueSkillApi } from "../../redux/slices/skillSlice";
import { nguoiDungService } from "../../services/nguoiDung.service";

const CreateUser = () => {
  const { infoUser } = useSelector((state) => state.authSlice);
  const { listSkill } = useSelector((state) => state.skillSlice);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const [valueUser, setValueUser] = useState({
    "name": "",
    "email": "",
    "password": "",
    "phone": "",
    "birthday": "",
    "gender": true,
    "role": "",
    "skill": [],
    "certification": [],
  });
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    dispatch(getValueSkillApi());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(valueUser);
    nguoiDungService
      .createUser(valueUser)
      .then((res) => {
        console.log(res);
        setStep(step + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadAvatar = (event) => {
    event.preventDefault();
    // Chuyển đổi dữ liệu vào formData
    let formData = new FormData();
    formData.append("formFile", avatar.file);
    let { token } = infoUser;
    nguoiDungService
      .uploadAvatar(token, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setValueUser({ ...valueUser, [name]: value });
  };

  const handleRenderStep = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <InputCustom
              labelContent={"Name"}
              name={"name"}
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Email"}
              name={"email"}
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Phone"}
              name={"phone"}
              onChange={handleChangeInput}
            />
            <InputCustom
              labelContent={"Password"}
              typeInput="password"
              name={"password"}
              onChange={handleChangeInput}
            />
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Giới tính
              </label>
              <select
                name="gender"
                onChange={handleChangeInput}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value={true}>Nam</option>
                <option value={false}>Nữ</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Ngày sinh
              </label>
              <input
                type="date"
                name="birthday"
                format="DD-MM-YYYY"
                className="border border-gray-400 rounded-md p-2"
                onChange={(event) => {
                  console.log(event.target.value);
                  const [year, month, day] = event.target.value.split("-");
                  const valueDate = `${day}-${month}-${year}`;
                  console.log(valueDate);
                  setValueUser({ ...valueUser, birthday: valueDate });
                }}
              />
            </div>
            {/* Thực hiện xây dựng service dành cho việc xử lí các API của skill và sử dụng redux think để lưu trữ trên redux */}
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chọn skill
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Vui lòng chọn skll"
                // onChange={handleChange}
                // options={options}
                options={listSkill.map((item, index) => {
                  return {
                    title: item.tenSkill,
                    value: item.tenSkill,
                  };
                })}
                onChange={(value) => {
                  console.log(value);
                  setValueUser({ ...valueUser, skill: value });
                }}
              />
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Chọn chứng chỉ
              </label>
              <Select
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Vui lòng chọn chứng chỉ"
                tokenSeparators={[","]}
                onChange={(value) => {
                  console.log(value);
                  setValueUser({ ...valueUser, certification: value });
                }}
                // options={options}
              />
            </div>
            <div>
              <button
                type="submit"
                className="py-2 px-5 rounded-md bg-green-600 text-white"
              >
                Tạo người dùng
              </button>
            </div>
          </form>
        );

      case 1:
        return (
          <div>
            <form onSubmit={handleUploadAvatar}>
              <div>
                <label htmlFor="">Vui lòng upload hình ảnh</label>
                <input
                  type="file"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    if (event.target.files[0]) {
                      const urlAvatar = URL.createObjectURL(
                        event.target.files[0],
                      );
                      console.log(urlAvatar);
                      setAvatar({
                        file: event.target.files[0],
                        url: urlAvatar,
                      });
                    }
                  }}
                  accept="image/png, image/jpeg"
                />
              </div>
              <img src={avatar?.url} width={200} sizes="" />
              <button type="submit" className="py-2 px-5 bg-black text-white">
                Upload Hình
              </button>
            </form>
          </div>
        );
    }
  };
  return (
    <div className="container">
      <h2 className="font-semibold text-3xl mb-5">Form tạo người dùng</h2>
      {handleRenderStep()}
    </div>
  );
};

export default CreateUser;
