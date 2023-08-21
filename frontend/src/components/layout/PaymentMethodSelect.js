import React from "react";
import Select from "react-select";

const options = [
  { value: "Visa", label: "Visa", image: "https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg"  },
  { value: "Mastercard", label: "Mastercard", image: "https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg"  },
  { value: "Elo", label: "Elo", image: "https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg" },
  { value: "Hipercard", label: "Hipercard", image: "https://http2.mlstatic.com/storage/logos-api-admin/ddf23a60-f3bd-11eb-a186-1134488bf456-m.svg"  },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid #ccc",
    padding: 10,
    display: "flex",
    alignItems: "center",
  }),
  control: (provided) => ({
    ...provided,
    width: 207,
    minHeight: 40,
    }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const PaymentMethodSelect = () => {
  return (
    <Select
      options={options}
      styles={customStyles}
      getOptionLabel={(option) => (
        <>
          <img
            src={option.image}
            alt={option.value}
            style={{ width: 30, marginRight: 10 }}
          />
          {option.label}
        </>
      )}
      getOptionValue={(option) => option.value}
      placeholder="Selecione..."
    />
  );
};

export default PaymentMethodSelect;
