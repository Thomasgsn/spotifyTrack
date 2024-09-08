import { Artist } from "@/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
  userTopArtists: Artist[];
  setID: Dispatch<SetStateAction<string | null>>;
  setSelected: Dispatch<
    SetStateAction<
      "topTracks" | "topArtists"  | "recentTracks" | "home" | "artist" | "track" | "album"
    >
  >;
}

export const TopArtists = ({ userTopArtists, setID, setSelected }: Props) => {
  const setArtist = (id: string) => {
    setSelected("artist");
    setID(id);
  };
  return (
    <>
      {userTopArtists.map((a, i) => (
        <button
          key={i}
          className="container__mid group"
          style={{ backgroundImage: `url(${a.images[0].url})` }}
          onClick={() => setArtist(a.id)}
        >
          <div className="group-hover:opacity-100">
            <p style={{ color: "white" }}>{a.name}</p>
          </div>
        </button>
      ))}
    </>
  );
};
