import { Artist } from "@/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import axios from "axios";

interface Props {
  setID: Dispatch<SetStateAction<string | null>>;
  ID: string | null;
  token: string;
}

export const AlbumInfo = ({ setID, ID, token }: Props) => {
  const [album, setAlbum] = useState<Artist>();
  useEffect(() => {
    const findAlbum = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/albums/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlbum(data);
    };

    findAlbum();
  }, [ID]);

  return (
    <>
      <div className=" bg-white w-full"></div>
      <div></div>
    </>
  );
};
