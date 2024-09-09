import { UserData } from "@/utils";
import { useEffect, useState } from "react";

import axios from "axios";

interface Props {
  AUTH_ENDPOINT: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  RESPONSE_TYPE: string;
  SCOPES: string;
}

export const PleaseLogin = ({
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPES,
}: Props) => {
  const token = window.localStorage.getItem("token") as string;
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const findUserData = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      token && setUserData(data);
    };

    findUserData();
  }, [token]);

  const AlreadyConnect = () => {
    const connectAs = () => {
      window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
        SCOPES
      )}`;
    };

    if (token && token != "" && token != "undefined" && userData) {
      return (
        <>
          <p className="mb-4">
            Already connected as <b>{userData.display_name}</b>.
          </p>
          <button className="hover:scale-105 bg-[#fefefe] dark:bg-[#1f1f1f] rounded-full flex items-center justify-center overflow-visible">
            <img
              onClick={connectAs}
              src={userData.images[0].url}
              className="h-24 w-24 rounded-full p-2 "
              alt={`${userData.display_name} Spotify Profile Picture`}
            />
          </button>
        </>
      );
    }
  };

  const connectNew = () => {
    window.localStorage.removeItem("token");
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
      SCOPES
    )}&show_dialog=true`;
  };

  return (
    <>
      <p>
        <AlreadyConnect />
        <button onClick={connectNew} className="login__logout">
          Login to Spotify
        </button>
      </p>
    </>
  );
};
