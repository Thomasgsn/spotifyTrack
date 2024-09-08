import { Artist } from "@/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import axios from "axios";

interface Props {
  setID: Dispatch<SetStateAction<string | null>>;
  ID: string | null;
  token: string;
}

export const ArtistInfo = ({ setID, ID, token }: Props) => {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => {
    const findArtist = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/artists/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArtist(data);
    };

    findArtist();
  }, [ID]);

  return (
    <>
      <div className=" bg-white w-full"></div>
      <div></div>
    </>
  );
};
