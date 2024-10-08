import { Track } from "@/utils";
import { FiSquare } from "react-icons/fi";
import { CiBoxList } from "react-icons/ci";
import { Dispatch, SetStateAction } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { RiCheckboxCircleFill } from "react-icons/ri";
interface Props {
  setDuration: Dispatch<SetStateAction<"short" | "medium" | "long">>;
  duration: string;
  setList: Dispatch<SetStateAction<"square" | "rectangle">>;
  list: string;
  userCurrentTrack: Track | undefined;
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
  setID: Dispatch<SetStateAction<string | null>>;
}

export const Container__right = ({
  setDuration,
  duration,
  setList,
  list,
  userCurrentTrack,
  setSelected,
  setID,
}: Props) => {
  const setTrack = (id: string) => {
    setID(id);
    setSelected("track");
  };

  const setArtist = (id: string) => {
    setID(id);
    setSelected("artist");
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <IoSettingsOutline size={20} />
        <h2 className="font-bold text-md">Settings :</h2>
      </div>
      <div className="term__btn">
        <button onClick={() => setDuration("long")}>
          <div className="flex items-center justify-between">
            <h3>1 YEAR</h3>
            {duration === "long" ? (
              <RiCheckboxCircleFill
                size={24}
                className="spotify__svg hover:scale-105 cursor-pointer"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-[#2c2c2c] border-2 border-white/50"></div>
            )}
          </div>
        </button>
        <button onClick={() => setDuration("medium")}>
          <div className="flex items-center justify-between">
            <h3>6 MONTHS</h3>
            {duration === "medium" ? (
              <RiCheckboxCircleFill
                size={24}
                className="spotify__svg hover:scale-105 cursor-pointer"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-[#2c2c2c] border-2 border-white/50"></div>
            )}
          </div>
        </button>
        <button onClick={() => setDuration("short")}>
          <div className="flex items-center justify-between">
            <h3>4 WEEKS</h3>
            {duration === "short" ? (
              <RiCheckboxCircleFill
                size={24}
                className="spotify__svg hover:scale-105 cursor-pointer"
              />
            ) : (
              <div className="h-6 w-6 rounded-full bg-[#2c2c2c] border-2 border-white/50"></div>
            )}
          </div>
        </button>
      </div>
      <div className="list__btn">
        <button
          onClick={() => setList("square")}
          className={`${list === "square" && "active"}`}
        >
          <div>
            <FiSquare />
            <FiSquare />
          </div>
          <div>
            <FiSquare />
            <FiSquare />
          </div>
        </button>

        <button
          onClick={() => setList("rectangle")}
          className={`${list === "rectangle" && "active"}`}
        >
          <div>
            <CiBoxList size={32} />
          </div>
        </button>
      </div>
      <hr className="mt-8 mb-7 opacity-5" />
      <h2 className="font-bold mb-6 text-xl">Titre Actuel</h2>
      <div className="current__track">
        {userCurrentTrack && (
          <>
            <img
              src={`${userCurrentTrack.album.images[0].url}`}
              className="w-full object-cover rounded-md mb-3"
              alt={`${userCurrentTrack.name} cover`}
            />
            <div className="flex justify-between items-center overflow-visible">
              <button
                onClick={() => setTrack(userCurrentTrack.id)}
                className="current__track__name"
              >
                {userCurrentTrack.name}
              </button>
              <RiCheckboxCircleFill
                size={30}
                className="spotify__svg hover:scale-105 cursor-pointer"
              />

              {/* <TbCirclePlus
                size={30}
                className="opacity-75 hover:opacity-100 cursor-pointer hover:scale-105"
              /> */}
            </div>
            <div className="flex">
              {userCurrentTrack.artists.map((a, i) => (
                <p
                  key={i}
                  className="opacity-75 hover:underline clickable"
                  onClick={() => setArtist(a.id)}
                >
                  {a.name}
                  {userCurrentTrack.artists.length != i + 1 && (
                    <span className="mr-1">,</span>
                  )}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
