import { GoBookmark } from "react-icons/go";
import { MdPlayArrow } from "react-icons/md";
import { Track, Artist, RecentTrack, Loader } from "@/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface Props {
  userTopTracks: Track[];
  userTopArtists: Artist[];
  userRecentTracks: RecentTrack[];
  selected: string;
  setSelected: Dispatch<
    SetStateAction<
      "topTracks" | "topArtists"  | "recentTracks" | "home" | "artist" | "track" | "album"
    >
  >;
}

export const Container__left = ({
  userTopTracks,
  userTopArtists,
  userRecentTracks,
  selected,
  setSelected,
}: Props) => {
  const SongOfFirstArtist = () => {
    const [topTrack, setTopTrack] = useState<Track | null>(null);

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

  return (
    <>
      <div className="flex gap-2 items-center">
        <GoBookmark size={20} />
        <h2 className="font-bold text-md">List of Top :</h2>
      </div>

      <button
        onClick={() => setSelected("topTracks")}
        className={`UserTopBtn ${selected === "topTracks" && "active"}`}
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
        <div className="flex items-center gap-2">
          <h4>Top Tracks</h4>
          <MdPlayArrow className="translate-y-[1px]" />
        </div>
      </button>

      <button
        onClick={() => setSelected("topArtists")}
        className={`UserTopBtn ${selected === "topArtists" && "active"}`}
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
        <div className="flex items-center gap-2">
          <h4>Top Artists</h4>
          <MdPlayArrow className="translate-y-[1px]" />
        </div>
      </button>

      <button
        onClick={() => setSelected("recentTracks")}
        className={`UserTopBtn ${selected === "recentTracks" && "active"}`}
      >
        {userRecentTracks.length > 0 ? (
          <div className="flex items-center gap-2">
            <img src={userRecentTracks[0].track.album.images[0].url} />
            <div className="flex flex-col items-start">
              <h1>{userRecentTracks[0].track.name}</h1>
              <div className="flex">
                {userRecentTracks[0].track.artists.map((a, i) => (
                  <p key={i} className="opacity-75 hover:underline">
                    {a.name}
                    {userRecentTracks[0].track.artists.length != i + 1 && (
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
        <div className="flex items-center gap-2">
          <h4>Recent Tracks</h4>
          <MdPlayArrow className="translate-y-[1px]" />
        </div>
      </button>
    </>
  );
};
