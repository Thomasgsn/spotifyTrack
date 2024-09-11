import { Track, Artist } from "@/utils";
import { Dispatch, SetStateAction } from "react";

interface Props {
  type: string;
  data: Track[] | Artist[];
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

export const MainDisplay = ({
  type,
  data,
  setID,
  setSelected,
  list,
}: Props) => {
  const setTrack = (id: string) => {
    setID(id);
    setSelected("track");
  };

  const setArtist = (id: string) => {
    setID(id);
    setSelected("track");
  };

  if (type === "tracks") {
    data = data as Track[];
    return (
      <>
        {data.map((t, i) => (
          <div className="flex items-center" key={i}>
            <button
              className={`container__mid group ${list}`}
              style={{ backgroundImage: `url(${t.album.images[0].url})` }}
              onClick={() => setTrack(t.id)}
            >
              {list !== "rectangle" && (
                <div className="group-hover:opacity-100">
                  <p>{t.name}</p>
                  <p>{t.artists[0].name}</p>
                </div>
              )}
            </button>
            {list === "rectangle" && (
              <div>
                <button onClick={() => setTrack(t.id)}>
                  <h3 className="text-xl font-bold mb-1 clickable hover:underline">
                    {t.name}
                  </h3>
                </button>
                <div className="flex">
                  {t.artists.map((a, i) => (
                    <button onClick={() => setArtist(a.id)}>
                      <p
                        key={i}
                        className="opacity-75 hover:underline clickable"
                      >
                        {a.name}
                        {t.artists.length !== i + 1 && (
                          <span className="mr-1">,</span>
                        )}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }

  if (type === "artists") {
    data = data as Artist[];
    return (
      <>
        {data.map((a, i) => (
          <button
            key={i}
            className={`container__mid group ${list}`}
            style={{ backgroundImage: `url(${a.images[0].url})` }}
            onClick={() => setArtist(a.id)}
          >
            {list !== "rectangle" && (
              <div className="group-hover:opacity-100">
                <p style={{ color: "white" }}>{a.name}</p>
              </div>
            )}
          </button>
        ))}
      </>
    );
  }
};
