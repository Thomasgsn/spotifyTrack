import { Track } from "@/utils";

interface Props {
  tracks: Track[];
  setTrack: (id: string) => void;
}

export const DisplayTracks = ({ tracks, setTrack }: Props) => {
  return (
    <>
      {tracks.map((t, i) => (
        <button
          key={i}
          className="container__mid group"
          style={{ backgroundImage: `url(${t.album.images[0].url})` }}
          onClick={() => setTrack(t.id)}
        >
          <div className="group-hover:opacity-100">
            <p>{t.name}</p>
            <p>{t.artists[0].name}</p>
          </div>
        </button>
      ))}
    </>
  );
};
