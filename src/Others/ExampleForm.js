import React, { useState } from "react";

const ExampleForm = () => {
  const [formValues, setFormValues] = useState([
    { major: "", start_year: "", end_year: "", workplace: "" },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      { major: "", start_year: "", end_year: "", workplace: "" },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  return (
    <>
      <h3 className="input-lable mb-3">من فضلك اذكر الوظائف السابقة</h3>
      {formValues.map((element, index) => (
        <div className="col-12" key={index}>
          <div className="row g-4">
            {/* نوع الوظيفة */}
            <div className="col-12 col-md-8">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">من فضلك</span>
                <input
                  required
                  placeholder="اسم الوظيفة"
                  className="input-data border r-10 p-3"
                  type="text"
                  name="major"
                  value={element.major || ""}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            {/* وقت من */}
            <div className="col-12 col-md-2">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">من</span>
                <input
                  required
                  placeholder="سنة"
                  className="input-data border r-10 p-3"
                  type="number"
                  name="start_year"
                  value={element.start_year || ""}
                  onChange={(e) => handleChange(index, e)}
                ></input>
              </div>
            </div>
            {/* وقت الى */}
            <div className="col-12 col-md-2">
              <div className="d-flex flex-column gap-2">
                <span className="input-lable">الى</span>
                <input
                  required
                  placeholder="سنة"
                  className="input-data border r-10 p-3"
                  type="number"
                  name="end_year"
                  value={element.end_year || ""}
                  onChange={(e) => handleChange(index, e)}
                ></input>
              </div>
            </div>
            {/* مكان العمل */}
            <div className="col-12 col-md-8">
              <input
                required
                placeholder="مكان العمل"
                className="input-data border r-10 p-3"
                type="text"
                name="workplace"
                value={element.workplace || ""}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
          {index ? (
            <button
              type="button"
              className="mt-3 mb-3 bg-danger border-none r-10 py-2 px-3 text-white flex-c"
              onClick={() => removeFormFields(index)}
            >
              حذف
            </button>
          ) : null}
        </div>
      ))}
      <div className="mt-4">
        <button
          className="p-2 add pointer"
          type="button"
          onClick={() => addFormFields()}
        >
          اضافة وظيفة جديدة
        </button>
      </div>
    </>
  );
};

export default ExampleForm;
