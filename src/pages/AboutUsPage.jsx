import WebhookIcon from "@mui/icons-material/Webhook";
import { Box } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Box
      style={{
        backgroundColor: "rgb(100, 4, 15)",
        borderRadius: "10px",
      }}
    >
      <h1 className="h1" style={{ color: "rgb(185, 161, 161)" }}>
        About us <WebhookIcon />{" "}
      </h1>
      <p
        style={{
          fontSize: "20px",
          textAlign: "center",
          color: "rgb(185, 161, 161)",
        }}
      >
        Welcome to our site! At our site we offer an online platform that allows
        you to find everything you need to organize your perfect event. It's so
        important to arrive to your big day prepared at שם של האתר you can
        register as a business account and advertise your business and edit your
        ticket according to what you want. In addition, you can also register as
        a regular account so you can get an impression of the best businesses
        you would like to make connectiont with. You will be able to see whoever
        you want details and of course have a ' favorite page' with people you
        decide to save. Notice the security of the site. on this site you won't
        be able to try to log in more then three times, so hackers will be
        blocked automatically, After three incorrect attempt, your account will
        be blocked for 24 hours and the site automatically disconnects after 4
        hours. We strive to provide a smooth and enjoyable experience for our
        users. If you have any questions or feedback, don't hesitate to contact
        our support team.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>
      <h2 className="h2">And we have to wish everyone good luck!</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="..//assets/imgs/abutus.jpg"
          alt="bute"
          width={150}
          height={150}
          style={{
            borderRadius: "70px",
            marginTop: "10px",
            boxShadow: "2px 2px 2px #888888",
            marginBottom: "4px",
          }}
        ></img>
      </div>
    </Box>
  );
};

export default AboutUsPage;
