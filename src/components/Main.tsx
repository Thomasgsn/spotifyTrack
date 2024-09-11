import { Track, Artist, RecentTrack } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import {
  TopTracks,
  TopArtists,
  ArtistInfo,
  TrackInfo,
  AlbumInfo,
  RecentTracks,
} from "@/pages/index";

interface Props {
  selected: string;
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
  userTopTracks: Track[];
  userTopArtists: Artist[];
  userRecentTracks: RecentTrack[];
  setID: Dispatch<SetStateAction<string | null>>;
  ID: string | null;
  token: string;
  isPlaying: boolean | undefined;
  setIsPlaying: Dispatch<SetStateAction<boolean | undefined>>;
  userCurrentTrack: Track | undefined;
  setUserCurrentTrack: Dispatch<SetStateAction<Track | undefined>>;
  list: string;
}

export const Main = ({
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
}: Props) => {
  switch (selected) {
    case "topTracks":
      return <TopTracks {...{ userTopTracks, setID, setSelected, list }} />;

    case "topArtists":
      return <TopArtists {...{ userTopArtists, setID, setSelected, list }} />;

    case "recentTracks":
      return <RecentTracks {...{ userRecentTracks, setID, setSelected, list }} />;

    case "artist":
      return <ArtistInfo {...{ setID, ID, token }} />;

    case "track":
      return (
        <TrackInfo
          {...{
            setID,
            ID,
            token,
            isPlaying,
            setIsPlaying,
            userCurrentTrack,
            setUserCurrentTrack,
          }}
        />
      );

    case "album":
      return <AlbumInfo {...{ setID, ID, token }} />;

    default:
      return (<p>BUG ??</p>)
      break;
  }
};
