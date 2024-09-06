import { GoBookmark } from "react-icons/go";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { IoSettingsOutline } from "react-icons/io5";
import { UserData, Tracks, Artists, Loader } from "../utils.tsx";

import axios from "axios";

const Home = () => {
  const CLIENT_ID = "7398f08072bf41d5a86b985e3006e770";
  const REDIRECT_URI = "http://localhost:5173/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES =
    "user-read-private user-read-email user-top-read user-read-currently-playing user-read-playback-state";

  const [token, setToken] = useState<string>("");

  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    img: "",
    country: "",
  });

  const [userTopTracks, setUserTopTracks] = useState<Tracks[]>([]);
  const [userTopArtists, setUserTopArtists] = useState<Artists[]>([]);
  const [userCurrentTrack, setUserCurrentTrack] = useState<Tracks>();

  const findUserData = async () => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData((prev) => ({ ...prev, id: data.id }));
    setUserData((prev) => ({ ...prev, name: data.display_name }));
    setUserData((prev) => ({ ...prev, img: data.images[1].url }));
    setUserData((prev) => ({ ...prev, country: data.country }));
  };

  const [duration, setDuration] = useState<"short" | "medium" | "long">("long");

  useEffect(() => {
    duration == "long" && console.log(userTopArtists);
  }, [duration]);

  useEffect(() => {
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

    const findInfo = async () => {
      findUserData();
      findUserTopTracks();
      findUserTopArtists();
      findUserCurrentTrack();
    };

    token && findInfo();
  }, [token, duration]);

  const [selected, setSelected] = useState<"tracks" | "artists" | "none">(
    "tracks"
  );

  const SongOfFirstArtist = () => {
    const [topTrack, setTopTrack] = useState<Tracks | null>(null);

    useEffect(() => {
      if (userTopArtists && userTopTracks) {
        const artistTracks = userTopTracks.filter((track) =>
          track.artists.some((artist) => artist.id === userTopArtists[0].id)
        );
        if (artistTracks.length > 0) {
          setTopTrack(artistTracks[0]);
        }
      }
    }, [userTopTracks, userTopArtists]);

    if (topTrack)
      return <p className="opacity-75 hover:underline">{topTrack.name}</p>;

    return <Loader />;
  };

  const Main = () => {
    switch (selected) {
      case "tracks":
        return (
          <>
            {userTopTracks.length > 0 ? (
              userTopTracks.map((t, i) => (
                <a
                  key={i}
                  href={`/track/${t.id}`}
                  className="w-36 h-36 object-cover rounded-md m-2 bg-cover flex flex-col hover:opacity-50 items-center group justify-center"
                  style={{ backgroundImage: `url(${t.album.images[0].url})` }}
                >
                  <div className="bg-black/50 opacity-0 px-2 py-1 rounded-lg group-hover:opacity-100 flex items-center flex-col">
                    <p style={{ color: "white" }}>{t.name}</p>
                    <p style={{ color: "white" }}>{t.artists[0].name}</p>
                  </div>
                </a>
              ))
            ) : (
              <Loader />
            )}
          </>
        );
        break;

      case "artists":
        return (
          <>
            {userTopArtists.length > 0 ? (
              userTopArtists.map((a, i) => (
                <a
                  key={i}
                  href={`/artist/${a.id}`}
                  className="w-36 h-36 object-cover rounded-md m-2 bg-cover flex flex-col hover:opacity-50 items-center group justify-center"
                  style={{ backgroundImage: `url(${a.images[0].url})` }}
                >
                  <div className="bg-black/50 opacity-0 px-2 py-1 rounded-lg group-hover:opacity-100 flex items-center flex-col">
                    <p style={{ color: "white" }}>{a.name}</p>
                  </div>
                </a>
              ))
            ) : (
              <Loader />
            )}
          </>
        );
        break;

      case "none":
        return (
          <>
            <h1>HOME</h1>
          </>
        );
        break;

      default:
        break;
    }
  };

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
      <main className="bg-slate-50 dark:bg-black min-h-[869px] h-fit translate-y-14 flex items-center justify-between">
        {token ? (
          <>
            <div className="container w-[24.5%]">
              <div className="flex gap-2 items-center">
                <GoBookmark size={28} />
                <h2 className="font-bold text-md">List of Top :</h2>
              </div>

              <button
                onClick={() => setSelected("tracks")}
                className={`UserTopBtn ${selected === "tracks" && "active"}`}
              >
                {userTopTracks.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <img src={userTopTracks[0].album.images[0].url} />
                    <div className="flex flex-col items-start">
                      <h1>{userTopTracks[0].name}</h1>
                      <div className="flex">
                        {userTopTracks[0].artists.map((a, i) => (
                          <p key={i} className="opacity-75 hover:underline">
                            {a.name}
                            {userTopTracks[0].artists.length != i + 1 && (
                              <span className="mr-1">,</span>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loader />
                )}
                <h4>Top Track</h4>
              </button>

              <button
                onClick={() => setSelected("artists")}
                className={`UserTopBtn ${selected === "artists" && "active"}`}
              >
                {userTopArtists.length > 0 ? (
                  <div className="flex items-center gap-2">
                    <img src={userTopArtists[0].images[0].url} />
                    <div>
                      <h1>{userTopArtists[0].name}</h1>
                      <div className="flex">
                        <SongOfFirstArtist />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loader />
                )}
                <h4>Top Artist</h4>
              </button>
            </div>
            <div className="container h-fit overflow-scroll w-[50%]">
              <div className="flex justify-around" style={{ flexWrap: "wrap" }}>
                <Main />
              </div>
            </div>

            <div className="container w-[24.5%]">
              <div className="flex gap-2 items-center">
                <IoSettingsOutline size={28} />
                <h2 className="font-bold text-md">Settings :</h2>
              </div>
              <div className="termBtn ">
                <button onClick={() => setDuration("long")}>
                  <p>1 year</p>
                </button>
                <button onClick={() => setDuration("medium")}>
                  <p>6 months</p>
                </button>
                <button onClick={() => setDuration("short")}>
                  <p>4 weeks</p>
                </button>
              </div>
              {userCurrentTrack && (
                <>
                  <p className="text-white bg-red-700">
                    {userCurrentTrack.name}
                  </p>
                  {userCurrentTrack.artists.map((a, i) => (
                    <p className="text-white bg-red-700" key={i}>
                      {a.name}
                    </p>
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <h1>Please Login !</h1>
        )}
      </main>
    </>
  );
};

export default Home;