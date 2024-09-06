import { useEffect } from "react";

interface Props {
  AUTH_ENDPOINT: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  RESPONSE_TYPE: string;
  SCOPES: string;
  token: string;
  setToken: (value: string) => void;
}

export const Login = ({
  AUTH_ENDPOINT,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPES,
  token,
  setToken,
}: Props) => {
  useEffect(() => {
    let accesToken = window.localStorage.getItem("token");

    if (!accesToken || accesToken == "undefined") {
      accesToken = window.location.hash.split("=")[1]?.split("&")[0];
      window.localStorage.setItem("token", accesToken);
      window.location.hash = "";
    }

    setToken(accesToken);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="-translate-x-4 h-3/5 px-4 text-xl rounded-full border text-slate-950 dark:text-[#b3b3b3]">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
            SCOPES
          )}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>
          <p>Logout</p>
        </button>
      )}
    </div>
  );
};
