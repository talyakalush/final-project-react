const normalizeFromServer = (data) => {
  return {
    phone: data.phone,
    email: data.email,
    url: data.image.url,
    alt: data.image.alt,
    state: data.address.state,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber,
    zip: data.address.zip,
    first: data.name.first,
    middle: data.name.middle,
    last: data.name.last,
    password: data.password,
    isBusiness: data.isBusiness,
  };
};

export default normalizeFromServer;
