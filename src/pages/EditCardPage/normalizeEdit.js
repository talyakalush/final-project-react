const fromServer = (dataFromServer) => {
  return {
    title: dataFromServer.title,
    subtitle: dataFromServer.subtitle,
    description: dataFromServer.description,
    phone: dataFromServer.phone,
    email: dataFromServer.email,
    web: dataFromServer.web,
    price: dataFromServer.price,
    area: dataFromServer.area,
    style: dataFromServer.style,
    type: dataFromServer.type,
    url: dataFromServer.image.url,
    alt: dataFromServer.image.alt,
  };
};
export { fromServer };
