import type { PartyResponseType, AddressResponseType } from "@/shared/dadata";

import { useState, useEffect } from "react";

import { isEmptyObject } from "@/helpers/utils";
import { dadataToken } from "@/shared/constants";
import ReactDadataBox from "@/shared/dadata";

const DadataField = ({
  value,
  onChange,
  field,
  id,
  readOnly,
  maskProps = {},
  suggest,
  invalid,
  disabled,
  helperText,
  hasLabelMark,
  maxLength,
  minLength,
  personType,
  ...other
}: Input) => {
  const [isInvalid, setIsInvalid] = useState(invalid ? invalid : false);
  const [errorMessage, setErrorMessage] = useState(helperText ? helperText : "");
  const idForHelperText = `helper-text-${field}`;
  const idForInput = `${field}-${id}`;

  useEffect(() => {
    if (invalid !== isInvalid && invalid !== undefined) {
      setIsInvalid(invalid);
    }
  }, [invalid]);

  useEffect(() => {
    if (helperText && helperText !== errorMessage) {
      setErrorMessage(helperText);
    }
  }, [helperText]);

  const getAddress = (address: any) => {
    const {
      settlement_with_type,
      area_with_type,
      city_with_type,
      street_with_type,
      house,
      region_with_type,
      flat,
      postal_code,
    } = address;

    const postcode = house ? (postal_code ? postal_code : "") : "";

    const customAddress = {
      street: street_with_type ? street_with_type : "",
      house: house ? house : "",
      office: flat ? flat : "",
      postcode,
      region: "",
      city: settlement_with_type ? settlement_with_type : city_with_type,
    };

    customAddress.region = region_with_type
      ? `${region_with_type}${
          area_with_type
            ? `, ${area_with_type}`
            : city_with_type && customAddress.city !== city_with_type
              ? `, ${city_with_type}`
              : ""
        }`
      : "";

    return customAddress;
  };

  const changeValue = (suggestion: PartyResponseType | AddressResponseType, noSuggestion: string) => {
    let dadataValues: { [name: string]: any } = {};
    let value = "";

    if (suggestion && suggestion.data) {
      const { data } = suggestion;

      const { address, inn, name, ogrn, type, kpp } = data || {};

      if (suggest === "party") {
        dadataValues = {
          kpp,
          inn,
          ogrn,
          organizationForm: type === "INDIVIDUAL" ? 2 : 1,
        };

        value = inn || "";
        value = kpp || "";
        if (name) {
          const { full, full_with_opf, short_with_opf } = name;

          dadataValues = {
            ...dadataValues,
            entrepreneursName: full,
            name: full_with_opf,
            shortName: short_with_opf,
          };
        }

        if (address?.data) {
          dadataValues = {
            ...dadataValues,
            address: address.value,
            ...getAddress(address.data),
          };
        }
      } else {
        const dadataAddress = getAddress(data);
        const { region, street, house, office, postcode, city } = dadataAddress;

        dadataValues = {
          kpp,
          inn,
          ogrn,
          postcode,
          region: region ? region : "",
          street,
          house,
          office,
          city: city ? city : "",
        };

        value = dadataValues.address;
      }
    } else {
      value = noSuggestion;
    }

    onChange({
      field,
      value,
      id: idForInput,
      suggestion: dadataValues,
    });
  };

  const props = {
    ...other,
    token: dadataToken,
    type: suggest,
    onChange: changeValue,
    field,
    name: field,
    id: idForInput,
    query: value,
    personType,
    invalid: isInvalid,
    disabled,
    hasLabelMark,
    helperText: errorMessage,
  };

  return (
    <>
      {suggest === "party" ? (
        // @ts-ignore
        <ReactDadataBox<"party"> {...props} />
      ) : (
        // @ts-ignore
        <ReactDadataBox<"address"> {...props} />
      )}
    </>
  );
};
export default DadataField;
