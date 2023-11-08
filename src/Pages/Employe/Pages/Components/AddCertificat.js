import React, { useState } from "react";

const AddCertificate = () => {
  const [formValues, setFormValues] = useState([{ name: "" }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = () => {
    const certificatArray = [];
    formValues.map((item) => certificatArray.push(item.name));
    console.log(certificatArray);
  };
  return (
    <>
      {formValues.map((element, index) => (
        <div className="col-12" key={index}>
          <label className="input-lable mb-2">الشهادة</label>
          <div className="name d-flex gap-2 full-width align-items-center">
            <input
              className="input-data border r-10 p-3"
              type="text"
              name="name"
              value={element.name || ""}
              onChange={(e) => handleChange(index, e)}
            />
            {index ? (
              <button
                type="button"
                className="bg-danger border-none r-10 py-2 px-3 text-white flex-c"
                onClick={() => removeFormFields(index)}
              >
                حذف
              </button>
            ) : null}
          </div>
        </div>
      ))}
      <div className="button-section d-flex align-items-center justify-content-between">
        <button
          className="add border-none bg-transparent"
          type="button"
          onClick={() => addFormFields()}
        >
          اضافة شهادة
        </button>
        <button
          className="add border-none bg-main py-1 px-4 text-white r-10"
          type="button"
          onClick={() => handleSubmit()}
        >
          تم
        </button>
      </div>
    </>
  );
};

export default AddCertificate;
