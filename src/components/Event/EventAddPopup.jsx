import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import "../Combo/comboedit.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRequest } from "../../pages/FoodManager/foodManageSlice";
import { insertEventRequest } from "../../pages/EventManager/eventManagerSlice";
import UploadImage from "../../ultil/UploadImage";

let options = [];

function EventAdd({ closeModel }) {
  const dispatch = useDispatch();
  const cateData = useSelector((state) => state.foodManage.listCategory);
  const [selectedOption, setSelectedOption] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getCategoryRequest());
  }, [dispatch]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    selectedOption.forEach((item) => {
      setSelected([...selected, { id: item.value }]);
    });
  };

  const handleChangeCate = (e) => {
    options.length = 0;
    cateData.forEach((item) => {
      if (item.id === e.target.value) {
        item.foodList.forEach((food) => {
          options.push({
            value: food.id,
            label: food.foodName,
          });
        });
      }
    });
  };

  const handleInsertEvent = useCallback(
    (values) => {
      let event = {
        eventId: values.eventId,
        eventName: values.eventName,
        description: values.description,
        image_url: imageUrl,
        fromDate: values.fromDate,
        toDate: values.toDate,
        status: values.status,
        foodList: selected,
      };
      console.log("Event Insert: ", event);
      dispatch(insertEventRequest(event));
      closeModel(false);
    },
    [closeModel, selected, dispatch, imageUrl]
  );

  const formik = useFormik({
    initialValues: {
      eventId: "E_",
      eventName: "",
      description: "",
      image_url: "",
      fromDate: "",
      toDate: "",
      status: true,
      foodList: [],
    },
    onSubmit: (values, { resetForm }) => {
      handleInsertEvent(values);
      resetForm({ values: "" });
    },
  });
  return (
    <div className="modelBackground">
      <div className="form-popup">
        <div className="form-container">
          <form
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            className="form-container"
          >
            <div className=" combo-edit">
              <div className="combo-left">
                <div className="combo-edit_image">
                  <img
                    src={
                      imageUrl
                        ? imageUrl
                        : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                    }
                    alt="Logo"
                  />
                </div>
                <div className="combo-edit_infor">
                  {/* <form className="frm-combo-edit"> */}
                  <label className="combo-edit_label">
                    M?? s??? ki???n:
                    <input
                      type="text"
                      id="eventId"
                      value={formik.values.eventId}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">
                    T??n s??? ki???n: <span className="proirity">*</span>
                    <input
                      type="text"
                      id="eventName"
                      value={formik.values.eventName}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">Th???i gian:</label>
                  <label className="combo-edit_label smallText">
                    T??? ng??y:
                    <input
                      type="date"
                      id="fromDate"
                      value={formik.values.fromDate}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label smallText">
                    ?????n ng??y:
                    <input
                      type="date"
                      id="toDate"
                      value={formik.values.toDate}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">
                    <UploadImage getImageURL={setImageUrl} />
                  </label>
                  <label className="combo-edit_label">
                    M?? t???: <span className="proirity">*</span>
                    <textarea
                      type="text"
                      id="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <label className="combo-edit_label">
                    <label>Tr???ng th??i:</label>
                    <br></br>
                    <input
                      className="checkBoxStatus type"
                      type="checkbox"
                      id="status"
                      name="status"
                      value={formik.values.status}
                      checked={formik.values.status}
                      onChange={formik.handleChange}
                    />
                  </label>
                  <div style={{ display: "flex", float: "right" }}>
                    <button type="submit" className="btn">
                      L??u
                    </button>
                    <button
                      type="button"
                      className="btn cancel"
                      onClick={() => closeModel(false)}
                    >
                      Hu???
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
              <div className="combo-right">
                <h3>Ch???n m??n ??n</h3>
                <label className="combo-edit_label">
                  Lo???i: <span className="proirity">*</span>
                  <select id="cateId" name="cateId" onChange={handleChangeCate}>
                    {cateData.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="combo-edit_label">
                  C??c m??n ???? ch???n:
                  <Select
                    isMulti
                    options={options}
                    onChange={handleSelectChange}
                    placeholder={"Ch???n m??n..."}
                    noOptionsMessage={() => "Kh??ng c?? m??n trong m???c n??y"}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventAdd;
