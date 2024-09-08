import { RecentTrack, Track } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { DisplayTracks } from "@/fonctionnal/index";

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
}

export const RecentTracks = ({
  userRecentTracks,
  setID,
  setSelected,
}: Props) => {
  const setTrack = (id: string) => {
    setID(id);
    setSelected("track");
  };

  const recentTracks: Track[] = userRecentTracks.map((t) => t.track);

  return (
    <>
      <DisplayTracks tracks={recentTracks} setTrack={setTrack} />
    </>
  );
};
