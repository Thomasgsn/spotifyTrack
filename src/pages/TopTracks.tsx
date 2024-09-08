import { Track } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { DisplayTracks } from "@/fonctionnal/index";

interface Props {
  userTopTracks: Track[];
  setID: Dispatch<SetStateAction<string | null>>;
  setSelected: Dispatch<
    SetStateAction<
      | "topTracks"
      | "topArtists"
      | "recentTracks"
      | "home"
      | "artist"
      | "track"
      | "album"
    >
  >;
}

export const TopTracks = ({ userTopTracks, setID, setSelected }: Props) => {
  const setTrack = (id: string) => {
    setID(id);
    setSelected("track");
  };

  return <DisplayTracks tracks={userTopTracks} setTrack={setTrack} />;
};
