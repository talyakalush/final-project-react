const ToServer = (newData) => {
  return {
    title: newData.title,
    subtitle: newData.subtitle,
    description: newData.description,
    phone: newData.phone,
    email: newData.email,
    web: newData.web,
    image: {
      url: newData.url,
      alt: newData.alt,
    },
    price: newData.price,
    area: newData.area,
    style: newData.style,
    type: newData.type,
  };
};
export default ToServer;
