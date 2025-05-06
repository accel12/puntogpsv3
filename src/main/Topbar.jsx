import React from "react";
import Logo from "../resources/extra/Logo.png";
import { colors, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useSelector } from "react-redux";

const Topbar = () => {
  const currentUser = useSelector((state) => state.session.user);
  return (
    <div className="bg-[#F8F7FC] h-[50px] flex w-screen">
      <div className="flex justify-center items-center px-2">
        <img src={Logo} alt="Logo" className="h-[35px]" />
        <div className="ml-2">
          <Typography
            component={"div"}
            fontWeight={800}
            fontSize={16}
            className="text-[#004AAD]"
          >
            Punto GPS
          </Typography>
          <Typography
            component={"div"}
            fontWeight={800}
            className="opacity-60 text-[#004AAD]"
            fontSize={14}
          >
            Dashboard
          </Typography>
        </div>
      </div>
      <div className="flex-1 justify-end flex px-2 items-center">
        <Typography
          component={"div"}
          fontWeight={800}
          className="opacity-60 text-[#004AAD]"
          fontSize={18}
        >
          {currentUser.name}
        </Typography>
        <AccountCircleRoundedIcon sx={{ color: "#004AAD" }} fontSize="large" />
      </div>
    </div>
  );
};

export default Topbar;
