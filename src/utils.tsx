export interface UserData {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  product: string;
  type: string;
  uri: string;
}

export interface Track {
  album: {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: [
      {
        url: string;
        height: number;
        width: number;
      }
    ];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
      reason: string;
    };
    uri: string;
    artists: [
      {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        uri: string;
      }
    ];
  };

  artists: [
    {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      uri: string;
    }
  ];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: {};
  restrictions: {
    reason: string;
  };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  uri: string;
  is_local: false;
}

export interface RecentTrack {
  track: {
    album: {
      album_type: "album" | "single" | "compilation";
      total_tracks: number;
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: [
        {
          url: string;
          height: number;
          width: number;
        }
      ];
      name: string;
      release_date: string;
      release_date_precision: string;
      restrictions: {
        reason: string;
      };
      uri: string;
      artists: [
        {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          uri: string;
        }
      ];
    };

    artists: [
      {
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        uri: string;
      }
    ];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
      ean: string;
      upc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {};
    restrictions: {
      reason: string;
    };
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    uri: string;
    is_local: false;
  };
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  popularity: number;
  uri: string;
}

export interface Album {
  album_type: "album" | "single" | "compilation";
  total_tracks: 9;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  uri: string;
  artists: [
    {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      uri: string;
    }
  ];
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: [
      {
        artists: [
          {
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            uri: string;
          }
        ];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: boolean;
        linked_from: {
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          type: string;
          uri: string;
        };
        restrictions: {
          reason: string;
        };
        name: string;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: boolean;
      }
    ];
  };
  copyrights: [
    {
      text: string;
      type: string;
    }
  ];
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  genres: string[];
  label: string;
  popularity: number;
}

export interface TrackFeatures {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}

export const Loader = () => {
  return (
    <div className="Loader">
      <div className="cube">
        <div className="cube__inner"></div>
      </div>
      <div className="cube">
        <div className="cube__inner"></div>
      </div>
      <div className="cube">
        <div className="cube__inner"></div>
      </div>
    </div>
  );
};

export const formatDurationMs = (durationMs: number) => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${seconds.toString().padStart(2, "0")} s`;
};

export const getPitch = (key: number) => {
  const pitchClasses = [
    "C",
    "C♯ / D♭",
    "D",
    "D♯ / E♭",
    "E",
    "F",
    "F♯ / G♭",
    "G",
    "G♯ / A♭",
    "A",
    "A♯ / B♭",
    "B",
  ];

  if (key === -1) {
    return "No Key Detected";
  } else if (key >= 0 && key <= 11) {
    return pitchClasses[key];
  } else {
    return "Invalid Key";
  }
};

export const Parental_advisory = (className: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="256"
      height="256"
      viewBox="0 0 256 256"
      className={`${className}`}
    >
      <defs></defs>
      <g
        style={{ strokeWidth: 0, opacity: 1 }}
        transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
      >
        <rect
          x="0"
          y="16.41"
          rx="0"
          ry="0"
          width="90"
          height="57"
          style={{ strokeWidth: 1, fill: "rgb(255,255,255)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <rect
          x="0"
          y="73.39"
          rx="0"
          ry="0"
          width="90"
          height="0.02"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 7.872 33.499 c 0.001 0.002 -2.464 0 -2.464 0 l -1.014 8.331 c -0.526 4.455 -1.125 8.806 -1.244 9.754 l -0.133 1.057 l -0.084 0.67 h 2.769 l 0.469 -4.783 c 0.056 -0.006 1.057 -0.017 1.094 -0.003 c 0.04 0.015 0.267 4.788 0.267 4.786 c 0 -0.002 2.677 0 2.676 0 C 10.206 53.31 7.871 33.496 7.872 33.499 z M 6.226 46.455 c -0.022 -0.008 0.46 -8.577 0.479 -8.574 c -0.029 -0.034 0.41 6.575 0.481 8.569 C 7.172 46.452 6.244 46.461 6.226 46.455 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 21.51 35.937 c -0.599 -1.71 -1.685 -2.438 -4.354 -2.438 h -2.463 l 0.001 19.812 h 2.381 c 2.087 0 2.489 -0.092 3.251 -0.734 c 0.479 -0.403 1.029 -1.262 1.223 -1.91 C 22.029 49.067 21.998 37.328 21.51 35.937 z M 18.92 49.757 c -0.208 0.497 -1.536 0.501 -1.534 0.496 c 0.005 -0.011 0.097 -13.7 0.102 -13.699 c 0.002 0 0.806 -0.01 1.229 0.414 c 0.413 0.413 0.485 1.348 0.485 6.333 C 19.202 46.758 19.094 49.329 18.92 49.757 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 28.26 53.311 c -0.556 -6.608 -1.344 -13.204 -1.864 -19.812 c 0 -0.001 2.306 -0.003 2.306 0 c 0.542 3.882 0.522 7.821 0.99 11.71 l 1.506 -11.71 c 0 0 2.396 0.001 2.396 0 c -0.003 -0.003 -2.391 19.812 -2.391 19.812 C 31.204 53.31 28.26 53.31 28.26 53.311 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <rect
          x="37.8"
          y="33.5"
          rx="0"
          ry="0"
          width="2.71"
          height="19.81"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
        />
        <path
          d="M 46.906 52.998 c -1.065 -0.516 -1.662 -1.993 -1.552 -3.847 l -0.053 -1.65 h 1.35 h 1.294 l 0.056 1.5 c 0.125 1.25 0.25 1.5 0.75 1.5 c 0.508 0 0.613 -0.229 0.687 -1.5 c 0.091 -1.571 0.048 -1.706 -2.887 -6.347 c -1.263 -1.996 -1.75 -4.352 -1.264 -6.118 c 0.474 -1.725 1.768 -3.038 3.006 -3.038 c 2.247 0 3.608 1.655 3.608 4.368 v 1.377 c 0 0 -2.579 -0.032 -2.581 -0.034 c -0.005 -0.005 0.018 -0.564 0.031 -1.258 c 0.028 -1.396 -0.675 -1.877 -1.272 -1.382 c -0.317 0.263 -0.403 0.771 -0.305 1.796 c 0.107 1.118 0.54 2.04 1.989 4.236 c 2.015 3.056 2.442 4.187 2.432 6.248 c -0.008 1.6 -0.728 3.697 -1.748 4.178 C 49.515 53.466 47.766 53.414 46.906 52.998 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 63.625 43.279 c -0.018 -2.663 0.033 -4.663 -0.026 -5.939 c -0.177 -2.199 -1.136 -3.815 -3.585 -3.842 c -2.079 0.056 -3.221 1.666 -3.24 3.668 c -0.094 3.389 -0.188 11.331 0.077 13.528 c 0.334 1.693 1.244 2.627 3.443 2.617 c 2.14 -0.092 2.728 -1.136 3.07 -2.568 C 63.521 49.695 63.655 47.747 63.625 43.279 z M 60.282 50.62 c -1.071 0.016 -0.981 -0.662 -1.039 -1.914 c -0.057 -1.236 -0.057 -10.32 0 -11.367 c 0.049 -0.901 0.434 -1.413 0.995 -1.405 c 0.477 0.007 0.856 0.222 0.892 1.279 c 0.03 0.909 0.009 9.989 0 11.327 C 61.124 49.284 61.239 50.606 60.282 50.62 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 74.329 43.144 l 0.636 -0.808 c 0.526 -0.668 0.636 -1.218 0.636 -3.177 c 0 -2.559 -0.422 -3.948 -1.489 -4.899 c -0.522 -0.466 -1.2 -0.678 -3.041 -0.761 H 68.7 V 53.31 h 2.705 v -8.7 c 0.007 0.002 0.804 -0.018 0.902 0.021 c 0.517 0.211 0.593 1.192 0.593 4.802 v 3.875 h 2.696 l 0.004 -4.405 c 0 -4.075 -0.048 -4.456 -0.636 -5.082 L 74.329 43.144 z M 72.884 40.536 c -0.074 0.677 -0.235 0.904 -0.344 1.013 c -0.363 0.363 -1.092 0.365 -1.094 0.369 c -0.001 0.001 0.039 -5.342 0.044 -5.334 c 0.013 0.019 1.447 -0.186 1.447 1.762 C 72.938 38.887 72.951 39.926 72.884 40.536 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 82.05 53.31 c -0.004 0 0.004 -9.035 0.001 -9.036 c 0 -0.005 -2.001 -10.738 -1.967 -10.775 c 0.001 0.001 2.18 0 2.18 0 c -0.002 -0.003 1.238 7.179 1.265 7.154 c 0.032 -0.029 0.973 -7.157 0.97 -7.154 c 0 0 2.222 0.002 2.221 0 c -0.001 -0.002 0.003 0 0.003 0 c 0.003 -0.002 -1.983 10.802 -1.983 10.812 l 0 8.998 C 84.741 53.309 82.048 53.306 82.05 53.31 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 72.31 25.722 c 0.008 0.005 0.882 0 0.9 0 c -0.091 -0.801 -0.433 -3.424 -0.452 -3.448 C 72.644 22.827 72.296 25.725 72.31 25.722 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 17.621 25.727 c 0.002 -0.006 0.802 0.005 0.782 0.002 c 0.006 -0.026 -0.427 -3.432 -0.426 -3.43 C 17.968 22.298 17.614 25.725 17.621 25.727 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 0.003 16.41 V 31.71 H 90 V 16.41 H 0.003 z M 8.866 24.973 c -0.583 0.427 -1.322 0.502 -1.984 0.749 c -0.019 0.992 0.002 1.996 0 2.987 c 0.001 0 -1.781 0.003 -1.778 0 c 0.003 -0.003 -0.001 -2.102 -0.001 -4.55 v -4.478 h 1.514 c 2.116 0 2.986 0.902 2.986 3.028 C 9.603 23.931 9.457 24.386 8.866 24.973 z M 18.611 28.71 c -0.037 -0.021 -0.195 -2.116 -0.195 -2.118 c -0.001 0.001 -0.787 -0.005 -0.788 -0.005 c 0.003 0 -0.232 2.128 -0.226 2.124 c -0.007 -0.001 -1.629 0.002 -1.63 0 c 0.002 -0.003 1.431 -9.03 1.434 -9.028 c -0.003 -0.001 1.262 -0.002 1.26 0 c 0.002 -0.001 1.906 9.031 1.907 9.028 C 20.373 28.707 18.611 28.707 18.611 28.71 z M 31.099 28.71 h -1.717 l 0.019 -3.598 c -0.199 0 -0.399 0.001 -0.598 -0.001 c -0.004 -0.01 -0.001 3.598 -0.001 3.599 h -1.8 v -9.028 h 2.532 c 1.209 0 1.563 1.125 1.563 2.667 c 0 1.013 -0.177 1.251 -0.286 1.474 c -0.052 0.114 -0.207 0.309 -0.207 0.308 c 0.001 -0.001 0.193 0.426 0.192 0.444 c 0.184 0.503 0.303 0.98 0.303 2.27 L 31.099 28.71 z M 41.696 20.567 c 0.001 0.009 0.003 0.939 0.002 0.927 c -0.001 -0.009 -1.794 0.008 -1.819 0.008 c -0.016 0 -0.009 1.82 0 1.82 c 0.008 0 1.178 -0.007 1.188 0 c 0.007 0.005 0.01 1.486 0 1.486 c -0.007 -0.001 -1.182 0.001 -1.188 0 c -0.006 -0.001 -0.005 2.401 0 2.4 c 0.006 -0.001 1.812 0.002 1.818 0.002 c 0.008 0 -0.013 1.49 -0.013 1.5 c 0 -0.009 -1.871 0 -1.878 0 h -1.705 v -9.028 h 3.597 C 41.706 19.681 41.695 20.558 41.696 20.567 z M 53.208 28.71 c -0.001 0.001 -1.59 0.002 -1.594 0 c 0 0.001 -1.604 -4.937 -1.602 -4.934 c 0.009 0.005 0.087 4.935 0.089 4.934 h -1.819 v -9.028 h 1.501 c 0 0.003 1.837 4.431 1.838 4.444 c -0.006 -0.019 -0.024 -4.443 -0.024 -4.444 h 1.611 C 53.209 19.682 53.211 28.709 53.208 28.71 z M 64.202 21.51 c -0.001 0 -1.202 0 -1.202 0 c -0.003 0.001 0.009 7.199 0 7.2 c -0.014 0.001 -1.804 0 -1.804 0 c -0.012 0.002 0.005 -7.211 0 -7.211 c -0.007 0 -1.18 -0.002 -1.181 0 c -0.004 0.005 0 -1.817 0 -1.817 c -0.001 0.002 4.19 0 4.187 0 V 21.51 z M 73.532 28.71 c -0.004 0 -0.387 -2.099 -0.395 -2.099 c -0.011 -0.001 -0.836 0.003 -0.815 0 c 0.015 -0.002 -0.326 2.102 -0.324 2.099 c 0 0 -1.345 0 -1.345 0 s 1.389 -9.036 1.386 -9.028 c -0.003 0.008 1.371 0 1.371 0 l 1.667 9.028 H 73.532 z M 85.212 28.71 h -3.595 v -9.028 h 1.825 v 7.526 h 1.769 C 85.213 27.209 85.212 28.71 85.212 28.71 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 28.801 21.509 c 0.006 0 0.001 0.674 0.001 0.901 c 0 0.231 -0.007 0.9 -0.001 0.9 c 0.004 0 0.596 -0.003 0.606 0 c 0.004 0.001 0.115 -0.378 0.115 -0.873 c 0 -0.495 -0.116 -0.931 -0.124 -0.931 C 29.394 21.505 28.797 21.509 28.801 21.509 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 7.176 21.497 c -0.078 0 -0.257 0.004 -0.264 0.005 c -0.005 0.001 -0.009 0.341 -0.009 1.207 s 0.003 1.214 0.004 1.215 c 0.002 0.002 0.086 0 0.122 0.002 c 0.655 0.031 0.767 -0.298 0.771 -0.673 c 0.002 -0.203 0 -0.418 0.005 -0.594 c 0.006 -0.181 0.004 -0.391 -0.008 -0.582 C 7.778 21.761 7.657 21.497 7.176 21.497 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 17.346 60.823 c -0.177 -0.034 -0.364 -0.01 -0.366 -0.016 c -0.006 -0.013 0.01 2.992 0.001 2.991 c -0.009 -0.001 0.16 0.012 0.347 -0.024 c 0.407 -0.078 0.684 -0.418 0.684 -1.457 C 18.012 61.278 17.753 60.902 17.346 60.823 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 55.813 60.675 c -0.114 0 -0.308 0.089 -0.377 0.34 c -0.112 0.41 -0.095 1.384 -0.123 3.08 c -0.045 2.718 -0.021 3.698 0.534 3.687 c 0.24 -0.005 0.309 -0.255 0.346 -0.358 c 0.135 -0.376 0.085 -1.479 0.118 -3.316 c 0.031 -1.697 -0.02 -2.69 -0.132 -3.1 C 56.111 60.759 55.933 60.675 55.813 60.675 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
        <path
          d="M 0.003 55.709 V 73.59 L 90 73.567 V 55.709 C 60.001 55.709 30.002 55.709 0.003 55.709 z M 5.103 68.912 v -9.603 h 3.136 c 0 -0.001 -0.002 1.201 0 1.199 c 0.002 -0.001 -1.954 0 -1.954 0 c 0.001 0.001 0 2.671 -0.001 2.671 c -0.002 0.001 1.183 0.001 1.185 0 c 0.004 -0.002 -0.002 1.235 0 1.235 c 0 0 -1.17 0.002 -1.169 0 c 0.001 -0.001 0.001 3.294 0 3.294 c -0.002 0.001 1.938 0 1.939 0 c 0.002 0.002 0.004 1.201 0.004 1.201 C 8.243 68.908 5.103 68.912 5.103 68.912 z M 12.421 68.908 l -0.526 -3.544 c 0.004 0.002 -0.781 3.545 -0.779 3.544 c 0.002 0 -1.144 -0.002 -1.143 0 c 0.004 0.006 0.964 -4.925 0.965 -4.926 c 0.001 -0.002 -1.002 -4.674 -1.002 -4.674 c 0 0 1.186 -0.002 1.184 0 c -0.002 0.002 0.775 3.626 0.775 3.622 c 0 0.003 0.58 -3.622 0.579 -3.622 c -0.001 0 1.068 0 1.07 0 c 0.001 0 -0.67 4.674 -0.671 4.674 c 0 0 0.731 4.923 0.731 4.926 C 13.606 68.911 12.423 68.91 12.421 68.908 z M 18.474 64.59 c -0.555 0.651 -1.454 0.715 -1.466 0.702 c -0.025 -0.027 -0.026 3.617 -0.026 3.617 c 0 -0.001 -1.183 0.001 -1.183 0.001 c 0.003 0.004 0 -9.601 0 -9.601 h 1.36 c 1.543 -0.028 2.034 1.429 2.033 2.871 C 19.191 63.172 19.109 63.846 18.474 64.59 z M 21.597 68.909 c -0.002 0 0.001 -9.601 0.001 -9.6 c 0.001 0.002 1.198 0 1.196 0 c -0.001 0 0.003 8.4 0.003 8.4 l 1.748 0.009 c -0.002 0 0 1.194 0.001 1.193 S 21.597 68.909 21.597 68.909 z M 27.617 68.908 c 0 0 -1.198 0 -1.199 -0.001 c -0.001 0 0 -9.599 0 -9.599 c 0.002 0 1.201 0.001 1.199 0 C 27.616 59.308 27.618 68.908 27.617 68.908 z M 33.699 61.99 c -0.001 0.002 -1.107 -0.005 -1.11 -0.004 c -0.003 0.001 0 -0.734 0 -1.009 c -0.001 -0.744 -0.951 -0.685 -1.052 0.08 c -0.068 0.519 -0.01 1.505 -0.017 3.06 c -0.005 1.283 -0.019 2.382 0.016 2.974 c -0.008 0.924 1.053 0.975 1.049 0.029 c 0 -0.312 0.003 -0.895 0.002 -0.894 c 0 0 1.101 -0.002 1.109 0.001 c 0.01 0.391 0.026 0.781 0.005 1.179 c -0.05 0.942 -0.694 1.52 -1.749 1.56 c -1.249 -0.01 -1.659 -0.858 -1.666 -2.027 c -0.002 -0.032 0 -2.821 0 -2.813 c -0.001 0.008 -0.014 -3.267 0.134 -3.733 c 0.243 -0.763 0.852 -1.077 1.557 -1.085 c 0.403 -0.005 1.035 0.026 1.414 0.541 c 0.172 0.233 0.331 0.763 0.311 1.252 C 33.689 61.433 33.701 61.987 33.699 61.99 z M 36.901 68.91 c -0.007 -0.002 -1.2 -0.001 -1.199 0 c 0.001 0.001 0 -9.602 0 -9.601 c 0 0 1.2 -0.002 1.199 0 C 36.899 59.313 36.908 68.911 36.901 68.91 z M 42.583 60.509 c -0.002 -0.001 -1.178 -0.003 -1.182 0 c -0.005 0.003 0.001 8.398 0 8.4 l -1.197 0 c -0.002 0 0 -8.396 0 -8.399 c 0 -0.002 -1.187 0 -1.185 0 c 0.001 0 0.001 -1.198 0 -1.2 c -0.001 -0.002 3.557 -0.006 3.561 0 C 42.584 59.315 42.584 60.51 42.583 60.509 z M 52.208 61.997 c 0.002 0 -1.21 -0.002 -1.213 0 c 0 0 0.002 -0.805 -0.031 -0.942 c -0.107 -0.441 -0.852 -0.498 -0.943 0.052 c -0.067 0.403 -0.024 5.813 -0.021 5.88 c 0.01 0.22 0.031 0.439 0.081 0.525 c 0.059 0.102 0.118 0.294 0.392 0.294 c 0.263 0 0.468 -0.231 0.502 -0.323 c 0.067 -0.181 0.06 -1.263 0.061 -1.267 c 0 -0.001 1.168 0.001 1.165 0.001 c -0.003 0 0.074 1.534 -0.284 2.178 c -0.291 0.53 -0.925 0.653 -1.456 0.662 c -0.783 0.013 -1.505 -0.478 -1.622 -1.336 c -0.086 -0.631 -0.04 -2.214 -0.04 -3.656 c 0 -1.442 -0.038 -2.418 0.024 -3.039 c 0.073 -0.743 0.266 -1.034 0.525 -1.269 c 0.826 -0.747 2.034 -0.523 2.518 0.332 C 52.27 60.804 52.206 61.997 52.208 61.997 z M 56.868 68.575 c -0.546 0.601 -1.667 0.616 -2.203 -0.086 c -0.378 -0.495 -0.514 -1.092 -0.467 -4.38 c 0.038 -2.606 0.168 -3.914 0.72 -4.384 c 0.363 -0.559 1.72 -0.63 2.163 0.155 c 0.392 0.599 0.417 1.84 0.417 4.229 C 57.498 67.215 57.248 68.195 56.868 68.575 z M 63.605 68.908 c -0.001 0 -1.193 0 -1.193 0 c 0.003 0.003 -1.45 -6.126 -1.45 -6.126 c 0.001 0 0 6.126 0 6.126 s -1.195 -0.001 -1.194 0 c 0.001 0.001 -0.001 -9.6 0 -9.599 c 0 0 1.13 -0.002 1.128 0 c -0.001 0 1.515 6.28 1.514 6.278 c -0.001 -0.001 -0.001 -6.281 0 -6.282 c 0.001 -0.002 1.198 0.003 1.198 0.003 C 63.608 59.31 63.605 68.908 63.605 68.908 z M 69.002 60.509 c 0 0.001 -1.207 0.001 -1.205 0 c 0.001 0 -0.001 8.403 0 8.399 c 0.001 -0.003 -1.191 -0.001 -1.192 0 c -0.003 0.004 0.001 -8.397 0 -8.399 s -1.205 0 -1.206 0 c -0.002 0 -0.002 -1.201 0 -1.2 c 0.002 0.001 3.603 0.001 3.602 0 C 68.999 59.306 69.002 60.509 69.002 60.509 z M 74.059 60.493 c 0.003 0 -1.753 0.004 -1.754 0.001 c -0.001 -0.002 0.001 2.684 0 2.684 c -0.001 0 1.182 0 1.182 0 c 0.002 0.001 0 1.235 0 1.235 s -1.182 -0.001 -1.182 0 c 0 0.001 -0.004 3.293 0 3.294 c 0.001 0 1.755 0.002 1.754 0 c -0.002 -0.003 0 1.198 0 1.2 H 71.1 v -4.826 v -4.773 h 2.959 C 74.06 59.309 74.058 60.493 74.059 60.493 z M 80.137 68.908 c 0.002 -0.001 -1.18 0 -1.18 0 l -1.461 -6.138 c 0 -0.001 0 6.138 0 6.138 s -1.196 0 -1.197 0 c -0.001 0.001 0.015 -9.598 0.015 -9.599 c 0.001 -0.001 1.116 0 1.117 0 l 1.514 6.302 v -6.302 c 0 -0.002 1.191 0 1.192 0 C 80.137 59.308 80.137 68.908 80.137 68.908 z M 85.502 60.509 c 0 0.001 -1.209 0 -1.213 0 c 0 0 0 8.398 0 8.399 c 0 0 -1.2 -0.002 -1.199 0 c 0 0.001 0.001 -8.402 0 -8.399 c -0.001 0.003 -1.2 0.002 -1.205 0 c 0.001 0.001 0.002 -1.195 0 -1.2 c 0.002 0.001 3.618 0 3.617 0 C 85.499 59.31 85.502 60.508 85.502 60.509 z"
          style={{ strokeWidth: 1, fill: "rgb(0,0,0)", opacity: 1 }}
          transform=" matrix(1 0 0 1 0 0) "
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};
