import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutUsPage from "./../pages/AboutUsPage";
import MyCard from "../pages/myCard";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import FavoriteCard from "../pages/favoritCard";
import ProfilePage from "../pages/propilePage/ProfilePage";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import AdminGuard from "../guard/AdminGuard";
import FooterComponent from "../layout/footer/FooterComponent";
import Sandbox from "../pages/sandbox";
import CreateCardPage from "../pages/creatCard";
import AboutCardPage from "../pages/AboutMyCard";
import HeaderComponent from "../layout/header/HeaderComponent";
import ForgotPassword from "../pages/ForgetPassword";
import FavoriteAdmin from "../pages/CardFavoriteAdmin";
import ResetPassword from "../pages/ResetPassword";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.FAVORITE} element={<FavoriteCard />} />
      <Route path={ROUTES.FOOTER} element={<FooterComponent />} />

      <Route path={ROUTES.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route
        path={`${ROUTES.RESETPASSWORD}/:token`}
        element={<ResetPassword />}
      />

      <Route
        path={ROUTES.FAVORITEADMIN}
        element={
          <AdminGuard>
            <FavoriteAdmin />
          </AdminGuard>
        }
      />

      <Route
        path={ROUTES.MYCARD}
        element={
          <BizGuard>
            <MyCard />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <AdminGuard>
            <Sandbox />
          </AdminGuard>
        }
      />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreateCardPage />
          </BizGuard>
        }
      />

      <Route path={`${ROUTES.PROFILE}/:_id`} element={<ProfilePage />} />
      <Route path={`${ROUTES.ABOUTCARD}/:id`} element={<AboutCardPage />} />
      <Route path={ROUTES.HEADERS} element={<HeaderComponent />} />

      <Route path={`${ROUTES.EDITCARD}/:id`} element={<EditCardPage />} />
      <Route
        path="/profile"
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;
