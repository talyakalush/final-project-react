import Joi from "joi";

import { validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
});
const middleSchema = Joi.object({
  middle: Joi.string().min(2).max(256).allow(""),
});
const lastSchema = Joi.object({
  last: Joi.string().min(2).max(256).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
});
const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
});
const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
});
const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(2).max(1000).required(),
});
const isBusinessSchema = Joi.object({ isBusiness: Joi.boolean().required() });
const urlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ["http", "https", "data"] })
    .min(14)
    .allow(""),
});
const altSchema = Joi.object({ alt: Joi.string().min(2).max(256).allow("") });
const zipSchema = Joi.object({
  zip: Joi.number().min(10000).max(9999999).required(),
});
const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});

const validateFirstSchema = (first) => firstSchema.validate(first);
const validateLastSchema = (last) => lastSchema.validate(last);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);

const validateCountrySchema = (country) => countrySchema.validate(country);

const validateCitySchema = (city) => citySchema.validate(city);

const validateStreetSchema = (street) => streetSchema.validate(street);
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);
const validateZipSchema = (zip) => zipSchema.validate(zip);
const validateMiddleSchema = (middle) => middleSchema.validate(middle);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateStateSchema = (state) => stateSchema.validate(state);
const validateIsBusinessSchema = (isBusiness) =>
  isBusinessSchema.validate(isBusiness);

const validateSchema = {
  first: validateFirstSchema,
  email: validateEmailLogin,
  password: validatePasswordLogin,
  last: validateLastSchema,
  phone: validatePhoneSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
  middle: validateMiddleSchema,
  alt: validateAltSchema,
  url: validateUrlSchema,
  state: validateStateSchema,
  isBusiness: validateIsBusinessSchema,
};

export {
  validateEmailLogin,
  validatePasswordLogin,
  validateFirstSchema,
  validateLastSchema,
  validateSchema,
  validatePhoneSchema,
  validateCountrySchema,
  validateCitySchema,
  validateStreetSchema,
  validateHouseNumberSchema,
  validateZipSchema,
};
