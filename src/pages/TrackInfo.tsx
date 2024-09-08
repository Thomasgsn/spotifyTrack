import { BsThreeDots } from "react-icons/bs";
import { TbCirclePlus } from "react-icons/tb";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Track,
  Loader,
  Parental_advisory,
  formatDurationMs,
  TrackFeatures,
  getPitch,
} from "@/utils";

import axios from "axios";

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
  const [saved, setSaved] = useState<boolean>();

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

    if (ID) {
      findTrack();
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
      await axios.put(`https://api.spotify.com/v1/me/tracks?${ID}`, {
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
                  <p key={i} className="opacity-75 hover:underline clickable">
                    {a.name}
                    {track.artists.length !== i + 1 && (
                      <span className="mr-1">,</span>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="w-full mt-5 flex items-center gap-4">
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
                    onClick={() => setSaved(false)}
                    className="spotify__svg hover:scale-105 cursor-pointer"
                  />
                ) : (
                  <TbCirclePlus
                    onClick={() => setSaved(true)}
                    size={30}
                    className="opacity-75 hover:opacity-100 cursor-pointer hover:scale-105"
                  />
                )}

                <BsThreeDots
                  size={28}
                  className="opacity-75 hover:scale-105 cursor-pointer"
                />
              </div>
              <p>{ID}</p>
              <ul>
                <li>
                  track n°{track.disc_number} of {track.album.name}
                </li>
                <li>{track.explicit && Parental_advisory("h-20")}</li>
                <li>{track.popularity} / 100 of popularity</li>
                <li>
                  <div className="flex gap-2 group cursor-alias">
                    <p>see id</p>
                    <p className="hidden group-hover:block">{track.id}</p>
                  </div>
                </li>
                <li>
                  <a href={track.external_urls.spotify} target="blank">
                    link
                  </a>
                </li>
                <li>{formatDurationMs(track.duration_ms)}</li>
                <li>{getPitch(features.key)}</li>
                <li>{features.tempo.toPrecision(3)} bpm</li>
              </ul>
              ;
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
