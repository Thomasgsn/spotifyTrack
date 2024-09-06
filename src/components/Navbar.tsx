import { Login } from "./Login";
import { UserData } from "@/utils.tsx";
import { GoHome } from "react-icons/go";
import { RiUser3Line } from "react-icons/ri";
import { ThemeToggler } from "./ThemeToggler";
import { Dispatch, SetStateAction } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface Props {
  token: string;
  userData: UserData;
  AUTH_ENDPOINT: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  RESPONSE_TYPE: string;
  SCOPES: string;
  setToken: (value: string) => void;
  setSelected: Dispatch<SetStateAction<"none" | "tracks" | "artists">>;
}

export const Navbar = ({
  token,
  userData,
  CLIENT_ID,
  REDIRECT_URI,
  AUTH_ENDPOINT,
  RESPONSE_TYPE,
  SCOPES,
  setToken,
  setSelected,
}: Props) => {
  return (
    <nav className="z-50 fixed top-0 w-screen h-14 bg-slate-100 dark:bg-black flex items-center justify-between">
      <ThemeToggler />
      <button onClick={() => setSelected("none")} className="bg">
        <GoHome size={20} />
      </button>
      <div className="flex items-center justify-start h-full">
        <Login
          {...{
            CLIENT_ID,
            REDIRECT_URI,
            AUTH_ENDPOINT,
            RESPONSE_TYPE,
            SCOPES,
            token,
            setToken,
          }}
        />
        {token ? (
          <button className="bg">
            <img
              src={userData.img}
              alt={`${userData.name} Spotify Profile Picture`}
              className="h-[70%] w-[70%] rounded-full"
            />
          </button>
        ) : (
          <button className="bg">
            <RiUser3Line size={24} />
          </button>
        )}
      </div>
    </nav>
  );
};

{
  /* <button>
          <HiOutlineDotsHorizontal
            size={30}
            className="text-slate-950 dark:text-slate-50"
          />
        </button> */
}
