import ROUTES from "../routes/ROUTES";

const alwaysLinks = [
  { to: ROUTES.HOME, children: "Home page" },
  { to: ROUTES.ABOUT, children: "About Us " },
];
const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register " },
  { to: ROUTES.LOGIN, children: "Login " },
];

const loggedInLinks = [{ to: ROUTES.FAVORITE, children: "Favorite " }];
const bizLinks = [
  { to: ROUTES.MYCARD, children: "My Card " },
  { to: ROUTES.CREATECARD, children: "Create Card " },
];
const adminLinks = [
  { to: ROUTES.SANDBOX, children: "Sandbox " },
  {
    to: ROUTES.FAVORITEADMIN,
    children: "All the Favorites ",
  },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks, adminLinks };
