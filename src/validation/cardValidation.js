import Joi from "joi";

const titleSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
});
const subTitleSchema = Joi.object({
  subtitle: Joi.string().min(2).max(256).required(),
});
const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().min(5).max(500).required(),
});
const priceSchema = Joi.object({
  price: Joi.number().min(1).required(),
});
const webSchema = Joi.object({
  web: Joi.string()
    .uri({ scheme: ["http", "https", "data"] })
    .required(),
});

const areaSchema = Joi.object({
  area: Joi.string().min(2).max(256).required(),
});
const styleSchema = Joi.object({
  style: Joi.string().min(2).max(256).required(),
});
const urlSchema = Joi.object({
  url: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .min(14)
    .allow(""),
});
const typeSchema = Joi.object({
  type: Joi.string().min(2).max(256).required(),
});
const altSchema = Joi.object({ alt: Joi.string().min(2).allow("") });

const validateTitleSchema = (title) => titleSchema.validate(title);
const validateSubTitleSchema = (subtitle) => subTitleSchema.validate(subtitle);
const validateDescriptionSchema = (description) =>
  descriptionSchema.validate(description);
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);
const validateTypeSchema = (type) => typeSchema.validate(type);

const validateEmailSchema = (email) => emailSchema.validate(email);

const validateAreaSchema = (area) => areaSchema.validate(area);
const validateStyleSchema = (state) => styleSchema.validate(state);
const validateUrlSchema = (url) => urlSchema.validate(url);
const validateAltSchema = (alt) => altSchema.validate(alt);
const validateWebSchema = (web) => webSchema.validate(web);
const validatePriceSchema = (price) => priceSchema.validate(price);

const validateSchema = {
  title: validateTitleSchema,
  subtitle: validateSubTitleSchema,
  description: validateDescriptionSchema,
  phone: validatePhoneSchema,
  email: validateEmailSchema,
  price: validatePriceSchema,
  area: validateAreaSchema,
  style: validateStyleSchema,
  type: validateTypeSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
  web: validateWebSchema,
};

export default validateSchema;
