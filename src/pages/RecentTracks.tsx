import { RecentTrack, Track } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { MainDisplay } from "@/fonctionnal/index";

interface Props {
  userRecentTracks: RecentTrack[];
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

export const RecentTracks = ({
  userRecentTracks,
  setID,
  setSelected,
  list,
}: Props) => {
  const setTrack = (id: string) => {
    setID(id);
    setSelected("track");
  };

  const recentTracks: Track[] = userRecentTracks.map((t) => t.track);

  return (
      <MainDisplay type='tracks' data={recentTracks} {...{setID, setSelected, list}} />
  );
};
