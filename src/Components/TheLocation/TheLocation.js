import axios from "axios";
import React from "react";
import { apiHeaders, basedUrl } from "../../Api/Apis";
import { useRecoilState } from "recoil";
import { repeatCountries } from "../../RecoilState/RepeatFormData";
import { useState } from "react";
import ReactSelect from "react-select";
import { colorStyles } from "../../Others/ColorStyleReactSlick";
import { trans } from "../Navbar/Navbar";

function TheLocation({
  city,
  setCity,
  goverment,
  setGoverment,
  countries,
  setCountries,
  label,
  errorValidation = {},
}) {
  // State of City
  const [citySelect, setCitySelect] = useState();
  function selectCity(data) {
    setCity(data);
  }
  // State of City
  // State of goverment
  const [govermentSelect, setGovermentSelect] = useState();
  function selectGoverment(data) {
    setGoverment(data);
    setCity(null);
    axios
      .get(`${basedUrl}/public/data/cities/${data.value}`, apiHeaders)
      .then(({ data }) => {
        setCitySelect(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // State of goverment
  // State of countries
  const [countriesState, setCountriesState] = useRecoilState(repeatCountries);
  function selectCountries(data) {
    setCountries(data);
    setGovermentSelect([]);
    setCitySelect([]);
    setCity([])
    setGoverment([])
    axios
      .get(`${basedUrl}/public/data/provinces/${data.value}`, apiHeaders)
      .then(({ data }) => {
        setGovermentSelect(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // State of countries
  return (
    <>
      <div className="row g-4 mt-4">
        <span className="input-lable m-0">{label}</span>
        {/* countries */}
        <div className="col-12 col-md-6 col-lg-4">
          <ReactSelect
            options={countriesState}
            value={countries}
            placeholder={trans("my_personal_data_user.country")}
            isSearchable={true}
            onChange={selectCountries}
            styles={colorStyles}
          />
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("country_id")
              ? errorValidation.country_id[0]
              : null}
          </span>
        </div>
        {/* goverment */}
        <div className="col-12 col-md-6 col-lg-4">
          <ReactSelect
            options={govermentSelect}
            value={goverment}
            placeholder={trans("my_personal_data_user.government")}
            isSearchable={true}
            onChange={selectGoverment}
            styles={colorStyles}
          />
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("province_id")
              ? errorValidation.province_id[0]
              : null}
          </span>
        </div>
        {/* CITY */}
        <div className="col-12 col-md-6 col-lg-4">
          <ReactSelect
            options={citySelect}
            value={city}
            placeholder={trans("my_personal_data_user.city")}
            isSearchable={true}
            onChange={selectCity}
            styles={colorStyles}
          />
          <span className="text-error fs-14-400">
            {errorValidation.hasOwnProperty("city_id")
              ? errorValidation.city_id[0]
              : null}
          </span>
        </div>
      </div>
    </>
  );
}

export default TheLocation;
