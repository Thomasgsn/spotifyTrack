import { PleaseLogin } from "@/pages/index";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/index";
import { UserData, Track, Artist, RecentTrack, Loader } from "./utils";
import { Container__left, Main, Container__right } from "@/components/index";

import axios from "axios";

const App = () => {
  const CLIENT_ID = "7398f08072bf41d5a86b985e3006e770";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES =
    "user-library-read user-read-private user-read-email user-top-read user-read-currently-playing user-read-playback-state user-read-recently-played user-modify-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private streaming app-remote-control user-follow-read user-follow-modify user-read-playback-position user-read-playback-state user-read-email user-read-private";

  const [token, setToken] = useState<string>("");

  const [userData, setUserData] = useState<UserData>();
  const [userTopTracks, setUserTopTracks] = useState<Track[]>([]);
  const [userTopArtists, setUserTopArtists] = useState<Artist[]>([]);
  const [userCurrentTrack, setUserCurrentTrack] = useState<Track>();
  const [userRecentTracks, setUserRecentTracks] = useState<RecentTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>();

  const [duration, setDuration] = useState<"short" | "medium" | "long">(
    "short"
  );
  const [list, setList] = useState<"square" | "rectangle">("square");
  const [selected, setSelected] = useState<
    | "topTracks"
    | "topArtists"
    | "recentTracks"
    | "home"
    | "artist"
    | "track"
    | "album"
  >("topTracks");
  const [ID, setID] = useState<string | null>(null);

  useEffect(() => {
    const findUserData = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(data);
    };

    const findUserTopTracks = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${duration}_term&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserTopTracks(data.items);
    };

    const findUserTopArtists = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${duration}_term&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserTopArtists(data.items);
    };

    const findUserRecentTracks = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRecentTracks(data.items);
    };

    const findUserCurrentTrack = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserCurrentTrack(data.item);
    };

    const findPlayStatus = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/me/player/currently-playing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsPlaying(data.is_playing);
    };

    const findInfo = async () => {
      findUserData();
      findUserTopTracks();
      findUserTopArtists();
      findUserRecentTracks();
      findUserCurrentTrack();
      findPlayStatus();
    };

    token && findInfo();
  }, [token, duration, selected]);

  let StyleDivMain;

  if (
    selected === "topArtists" ||
    selected === "topTracks" ||
    selected === "recentTracks"
  ) {
    StyleDivMain = "flex justify-between";
    if (list === "rectangle") StyleDivMain += " flex-col";
  }

  return (
    <>
      <Navbar
        {...{
          token,
          userData,
          CLIENT_ID,
          REDIRECT_URI,
          AUTH_ENDPOINT,
          RESPONSE_TYPE,
          SCOPES,
          setToken,
          setSelected,
        }}
      />
      <main className="bg-white dark:bg-black h-[99.99vh] translate-y-14 flex items-center justify-between">
        {token ? (
          <>
            <div className="container w-[24.5%]">
              <Container__left
                {...{
                  userTopTracks,
                  userTopArtists,
                  userRecentTracks,
                  selected,
                  setSelected,
                }}
              />
            </div>
            <div className="container h-fit overflow-scroll w-[50%]">
              <div className={`${StyleDivMain}`} style={{ flexWrap: "wrap" }}>
                <Main
                  {...{
                    selected,
                    setSelected,
                    userTopTracks,
                    userTopArtists,
                    userRecentTracks,
                    setID,
                    ID,
                    token,
                    isPlaying,
                    setIsPlaying,
                    userCurrentTrack,
                    setUserCurrentTrack,
                    list,
                  }}
                />
              </div>
            </div>

            <div className="container container__right w-[24.5%]">
              <Container__right
                {...{
                  setDuration,
                  duration,
                  setList,
                  list,
                  userCurrentTrack,
                  setSelected,
                  setID,
                }}
              />
            </div>
          </>
        ) : (
          <div className="container w-screen">
            <PleaseLogin
              {...{
                CLIENT_ID,
                REDIRECT_URI,
                AUTH_ENDPOINT,
                RESPONSE_TYPE,
                SCOPES,
              }}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default App;
