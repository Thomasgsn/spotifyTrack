import { Artist } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { MainDisplay } from "@/fonctionnal/index";

interface Props {
  userTopArtists: Artist[];
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

export const TopArtists = ({ userTopArtists, setID, setSelected, list }: Props) => {
  return <MainDisplay type='artists' data={userTopArtists} {...{setID, setSelected, list}} />;
};
