import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Country() {
  const [inputName, setInputName] = useState("");
  const [countries, setCountries] = useState([]);
  const fetch = async () => {
    try {
      console.log(inputName);
      const { data } = await axios.get(
        `https://restcountries.com/v3.1/name/${inputName}`
      );
      let length;
      data.length > 5 ? (length = 5) : (length = data.length);
      let newData = [];
      for (let i = 0; i < length; i++) {
        newData.push(data[i]);
      }
      console.log(newData);
      setCountries(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    setInputName(e.target.value);
  };

  useEffect(() => {
    if (inputName.length > 0) {
      fetch();
    } else {
      // Clear countries when input is empty
      setCountries([]);
    }
  }, [inputName]);

  return (
    <section className="flex flex-col gap-5 items-center justify-center min-h-screen text-4xl font-bold">
      <h1>COUNTRY</h1>
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        <input
          type="text"
          className="grow"
          placeholder="Type any country name"
          onChange={(e) => handleChangeInput(e)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <div className="w-1/2 text-lg">
        {countries.length > 0 &&
          countries.map((country, index) => (
            <h2 className="hover:bg-slate-200 p-3 rounded-md" key={index}>
              {country.name.common}
            </h2>
          ))}
      </div>
    </section>
  );
}
