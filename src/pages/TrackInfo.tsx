import { TbCirclePlus } from "react-icons/tb";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
import { BsClipboardData, BsThreeDots } from "react-icons/bs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LuAlbum, LuArrowUpNarrowWide, LuInfo } from "react-icons/lu";
import {
  Track,
  Loader,
  Parental_advisory,
  formatDurationMs,
  TrackFeatures,
  getPitch,
} from "@/utils";

import axios from "axios";
import { IoLinkOutline } from "react-icons/io5";

interface Props {
  setID: Dispatch<SetStateAction<string | null>>;
  ID: string | null;
  token: string;
  isPlaying: boolean | undefined;
  setIsPlaying: Dispatch<SetStateAction<boolean | undefined>>;
  userCurrentTrack: Track | undefined;
  setUserCurrentTrack: Dispatch<SetStateAction<Track | undefined>>;
}

export const TrackInfo = ({
  setID,
  ID,
  token,
  isPlaying,
  setIsPlaying,
  userCurrentTrack,
  setUserCurrentTrack,
}: Props) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [features, setFeatures] = useState<TrackFeatures | null>(null);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    const findTrack = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/tracks/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrack(data);
    };

    const checkIfTrackIsSaved = async () => {
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/me/tracks/contains`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              ids: ID,
            },
          }
        );
        setSaved(data[0]);
      } catch (error) {
        console.error("Error checking if track is saved:", error);
      }
    };

    const findTrackFeatures = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/audio-features/${ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeatures(data);
    };

    if (ID) {
      findTrack();
      checkIfTrackIsSaved();
      findTrackFeatures();
    }
  }, [ID, token]);

  const playTrack = async (position_ms = 0) => {
    try {
      await axios.put(
        `https://api.spotify.com/v1/me/player/play`,
        {
          uris: [`spotify:track:${ID}`],
          position_ms: position_ms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsPlaying(true);
      track && setUserCurrentTrack(track);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const pauseTrack = async () => {
    try {
      await axios.put(`https://api.spotify.com/v1/me/player/pause`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsPlaying(false);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const saveTrack = async () => {
    try {
      await axios.put(`https://api.spotify.com/v1/me/tracks?ids=${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const unsaveTrack = async () => {
    try {
      await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleSave = () => {
    saveTrack();
    setSaved(true);
  };

  const handleUnsave = () => {
    unsaveTrack();
    setSaved(false);
  };

  const togglePlayback = async () => {
    if (isPlaying && ID === userCurrentTrack?.id) {
      pauseTrack();
    } else {
      if (ID !== userCurrentTrack?.id) {
        playTrack(0);
      } else {
        let position_ms = 0;
        try {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/me/player/currently-playing`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          position_ms = data.progress_ms || 0;
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de la position :",
            error
          );
        }
        playTrack(position_ms);
      }
    }
  };

  return (
    <>
      {track && features ? (
        <>
          <div className="flex items-end gap-4 mb-5">
            <img
              src={track.album.images[0].url}
              alt={`${track.album.name} cover`}
              className="min-w-72 max-w-72 rounded-md"
            />
            <div>
              <h2 className="text-6xl font-bold mb-1">{track.name}</h2>
              <div className="flex">
                {track.artists.map((a, i) => (
                  <p key={i} className=" hover:underline clickable">
                    {a.name}
                    {track.artists.length !== i + 1 && (
                      <span className="mr-1">,</span>
                    )}
                  </p>
                ))}
                <p className="ml-1 opacity-75">
                  · {formatDurationMs(track.duration_ms)}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="h-[60px] mt-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    className="w-14 h-14 spotify__btn"
                    onClick={togglePlayback}
                  >
                    {userCurrentTrack?.id === ID && isPlaying ? (
                      <GrPauseFill className="PlayPause__btn" />
                    ) : (
                      <GrPlayFill className="PlayPause__btn" />
                    )}
                  </button>
                  <div className="flex items-center gap-2 overflow-visible">
                    {saved ? (
                      <RiCheckboxCircleFill
                        size={30}
                        onClick={handleUnsave}
                        className="spotify__svg hover:scale-105 cursor-pointer"
                      />
                    ) : (
                      <TbCirclePlus
                        onClick={handleSave}
                        size={30}
                        className="opacity-75 hover:opacity-100 cursor-pointer hover:scale-105"
                      />
                    )}

                    <BsThreeDots
                      size={28}
                      className="opacity-75 hover:scale-105 cursor-pointer"
                    />
                  </div>
                </div>
                <p>
                  {track.explicit && Parental_advisory("h-20 overflow-hidden")}
                </p>
              </div>
              <div className="mt-6">
                <div className="data">
                  <LuAlbum className="stroke-spotifyGreen" size={20} />
                  <p>
                    track n°{track.disc_number} of {track.album.name}
                  </p>
                </div>
                <div className="data">
                  <BsClipboardData className="fill-spotifyGreen" size={20} />
                  <p>
                    {getPitch(features.key)} · {features.tempo.toPrecision(3)}{" "}
                    bpm
                  </p>
                </div>
                <div className="data">
                  <LuArrowUpNarrowWide
                    className="stroke-spotifyGreen"
                    size={20}
                  />
                  <p>{track.popularity} / 100 of popularity</p>
                </div>
                <div className="data gap-2 group cursor-alias">
                  <LuInfo className="stroke-spotifyGreen" size={20} />
                  <p>see id</p>
                  <p className="hidden group-hover:block">{track.id}</p>
                </div>
                <a href={track.external_urls.spotify} target="_blank" className="data gap-2 group cursor-pointer">
                  <IoLinkOutline className="stroke-spotifyGreen" size={20} />
                  <p>
                    Click here to see the song page
                  </p>
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
