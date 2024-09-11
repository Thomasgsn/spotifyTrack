import { Track } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { MainDisplay } from "@/fonctionnal/index";

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
  list: string;
}

export const TopTracks = ({ userTopTracks, setID, setSelected, list }: Props) => {
  return <MainDisplay type='tracks' data={userTopTracks} {...{setID, setSelected, list}} />;
};
