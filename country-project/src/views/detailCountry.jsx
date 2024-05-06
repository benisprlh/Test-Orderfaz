import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigation, useNavigate, useParams } from "react-router-dom";

export default function DetailCountry() {
  const [country, setCountry] = useState();
  const { countryName } = useParams();
  const [callingCode, setCallingCode] = useState();
  const [dataCallingCode, setDataCallingCode] = useState([]);
  const [showCallingCodeCountry, setShowCallingCodeCountry] = useState(false);
  const [currency, setCurrency] = useState();
  const [dataCurrency, setDataCurrency] = useState([]);
  const [showCurrencyCountry, setShowCurrencyCountry] = useState(false);
  const navigate = useNavigate();

  const fetch = async () => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      setCountry(data[0]);
      const callCode = data[0].idd.root[1] + data[0].idd.suffixes[0];
      const propertyCurrency = Object.keys(data[0].currencies);
      setCallingCode(callCode);
      setCurrency(propertyCurrency[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCallingCode = async () => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v2/callingcode/${callingCode}`
      );
      setDataCallingCode(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrency = async () => {
    try {
      const { data } = await axios.get(
        `https://restcountries.com/v2/currency/${currency}`
      );
      setDataCurrency(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetchCallingCode();
  }, [callingCode]);

  useEffect(() => {
    fetchCurrency();
  }, [currency]);

  const functionBackHome = () => {
    console.log("1");
    navigate("/");
  };

  return (
    <section className="m-5">
      <button
        className="btn bg-purple-500 text-slate-50"
        onClick={functionBackHome}
      >
        Back To Homepage
      </button>

      <div className="my-5">
        <div className="flex items-end gap-3 mb-3">
          <h1 className="text-6xl">{country?.name?.common}</h1>
          <img
            className="h-10"
            src={country?.flags?.svg}
            alt={country?.flags?.alt}
          />
        </div>
        <div className="flex gap-3">
          {country?.altSpellings.map((altSpelling, index) => {
            return (
              <h2
                className="rounded-full px-3 py-1 bg-sky-300 text-slate-50 text-center"
                key={index}
              >
                {altSpelling}
              </h2>
            );
          })}
        </div>
      </div>

      <div className="flex my-5 gap-5">
        <div className="border-2 p-3 rounded-lg flex-col w-1/4 font-bold">
          <h2 className="text-xl ">LatLong</h2>
          <div className="my-3 flex flex-row text-6xl text-purple-500  gap-2">
            <h2>{country?.latlng[0]}.0,</h2>
            <h2>{country?.latlng[1]}.0</h2>
          </div>
        </div>
        <div className="border-2 p-3 rounded-lg flex-col w-1/4">
          <h2 className="text-xl">
            Capital: <span className="font-bold">{country?.capital[0]}</span>
          </h2>
          <h2 className="text-xl">
            Region: <span className="font-bold">{country?.region}</span>
          </h2>
          <h2 className="text-xl">
            Subregion: <span className="font-bold">{country?.subregion}</span>
          </h2>
        </div>
      </div>

      <div className="flex my-5 gap-5">
        <div className="flex-col w-1/4 ">
          <h2 className="text-xl font-bold">Calling Code</h2>
          <h2 className="text-6xl text-purple-500 font-bold">{callingCode}</h2>
          <h2 className="text-lg font-bold">
            <span
              className="text-purple-500 underline"
              onMouseEnter={() => setShowCallingCodeCountry(true)}
              onMouseLeave={() => setShowCallingCodeCountry(false)}
            >
              {dataCallingCode.length > 1
                ? dataCallingCode.length + " Countries"
                : dataCallingCode.length + " country"}
            </span>{" "}
            with this calling code
          </h2>
          <div className="w-1/2 text-lg bg-slate-500 rounded-md my-4">
            {showCallingCodeCountry &&
              dataCallingCode.map((countryList, index) => {
                return (
                  <h2 className=" p-2  text-slate-100 ">{countryList.name}</h2>
                );
              })}
          </div>
        </div>
        <div className="flex-col w-1/4 ">
          <h2 className="text-xl font-bold">Currency</h2>
          <h2 className="text-6xl text-purple-500 font-bold">{currency}</h2>
          <h2 className="text-lg font-bold">
            <span
              className="text-purple-500 underline"
              onMouseEnter={() => setShowCurrencyCountry(true)}
              onMouseLeave={() => setShowCurrencyCountry(false)}
            >
              {dataCallingCode.length > 1
                ? dataCurrency.length + " Countries"
                : dataCurrency.length + " country"}
            </span>{" "}
            with this calling code
          </h2>
          <div className="w-1/2 text-lg bg-slate-500 rounded-md my-4">
            {showCurrencyCountry &&
              dataCurrency.map((countryList, index) => {
                return (
                  <h2 className=" p-2  text-slate-100 ">{countryList.name}</h2>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}
