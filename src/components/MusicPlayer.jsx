import {
  useEffect,
  useRef,
  useState,
} from "react";

import { playlistConfig } from "../data/bhajans";

import "./MusicPlayer.css";


export default function MusicPlayer() {

  const playerRef = useRef(null);

  const messageTimer = useRef(null);


  const [ready, setReady] = useState(false);

  const [playing, setPlaying] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [shuffle, setShuffle] = useState(false);

  const [playlist, setPlaylist] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [songTitle, setSongTitle] =
    useState("रामजी के भजन");

  const [artist, setArtist] =
    useState("भक्ति संगीत");

  const [progress, setProgress] = useState(0);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [message, setMessage] =
    useState("राम नाम में ही शांति है 🙏");


  /* =================================
     YOUTUBE API
  ================================= */

  useEffect(() => {

    const createPlayer = () => {

      if (
        !window.YT?.Player ||
        playerRef.current
      ) {
        return;
      }


      playerRef.current =
        new window.YT.Player(
          "ramYoutubePlayer",
          {

            height: "1",

            width: "1",

            playerVars: {

              autoplay: 0,

              controls: 0,

              disablekb: 1,

              playsinline: 1,

              rel: 0,

              modestbranding: 1,

              listType: "playlist",

              list: playlistConfig.id,

            },


            events: {

              onReady: handleReady,

              onStateChange:
                handleStateChange,

              onError:
                handleError,

            },

          }
        );

    };


    if (window.YT?.Player) {

      createPlayer();

      return;

    }


    let script =
      document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );


    if (!script) {

      script =
        document.createElement("script");

      script.src =
        "https://www.youtube.com/iframe_api";

      document.body.appendChild(script);

    }


    const previousCallback =
      window.onYouTubeIframeAPIReady;


    window.onYouTubeIframeAPIReady = () => {

      previousCallback?.();

      createPlayer();

    };


    return () => {

      window.onYouTubeIframeAPIReady =
        previousCallback;

    };

  }, []);


  const handleReady = () => {

    setReady(true);

    updatePlaylist();

    updateSongInfo();

  };


  const updatePlaylist = () => {

    if (!playerRef.current) return;


    try {

      const list =
        playerRef.current.getPlaylist();


      if (
        Array.isArray(list) &&
        list.length
      ) {

        setPlaylist(list);


        const index =
          playerRef.current
            .getPlaylistIndex();


        setCurrentIndex(
          index >= 0 ? index : 0
        );

      }

    } catch {

      // YouTube initialization can take a moment.

    }

  };


  const updateSongInfo = () => {

    if (!playerRef.current) return;


    try {

      const data =
        playerRef.current.getVideoData();


      if (data?.title) {

        setSongTitle(data.title);

        setArtist(
          data.author ||
          "भक्ति संगीत"
        );

      }


      const index =
        playerRef.current
          .getPlaylistIndex();


      if (index >= 0) {

        setCurrentIndex(index);

      }

    } catch {

      // Ignore transient iframe errors.

    }

  };


  const handleStateChange = (event) => {

    if (!window.YT) return;


    if (
      event.data ===
      window.YT.PlayerState.PLAYING
    ) {

      setPlaying(true);

      updateSongInfo();

      updatePlaylist();

      showMessage(
        "महफिल सज गई... जय श्री राम 🙏"
      );

    }


    if (
      event.data ===
      window.YT.PlayerState.PAUSED
    ) {

      setPlaying(false);

    }


    if (
      event.data ===
      window.YT.PlayerState.ENDED
    ) {

      setPlaying(false);

      updatePlaylist();

      updateSongInfo();

    }

  };


  const handleError = (event) => {

    console.warn(
      "YouTube Player Error:",
      event.data
    );


    if (
      event.data === 101 ||
      event.data === 150
    ) {

      setSongTitle(
        "यह भजन embed नहीं हो सकता"
      );

      setArtist(
        "YouTube ने embedding रोक रखी है"
      );

    }

  };


  /* =================================
     PLAY / PAUSE
  ================================= */

  const togglePlay = () => {

    if (
      !ready ||
      !playerRef.current
    ) {

      showMessage(
        "भजन तैयार हो रहा है..."
      );

      return;

    }


    if (playing) {

      playerRef.current.pauseVideo();

    } else {

      playerRef.current.playVideo();

    }

  };


  /* =================================
     NEXT
  ================================= */

  const next = () => {

    if (
      !ready ||
      !playerRef.current
    ) {
      return;
    }


    if (
      shuffle &&
      playlist.length > 1
    ) {

      let random =
        currentIndex;


      while (
        random === currentIndex
      ) {

        random =
          Math.floor(
            Math.random() *
            playlist.length
          );

      }


      playerRef.current
        .playVideoAt(random);

    } else {

      playerRef.current
        .nextVideo();

    }


    showMessage(
      "अगला भजन 🎵"
    );


    setTimeout(
      updateSongInfo,
      700
    );

  };


  /* =================================
     PREVIOUS
  ================================= */

  const previous = () => {

    if (
      !ready ||
      !playerRef.current
    ) {
      return;
    }


    playerRef.current
      .previousVideo();


    showMessage(
      "पिछला भजन 🎵"
    );


    setTimeout(
      updateSongInfo,
      700
    );

  };


  /* =================================
     SELECT SONG
  ================================= */

  const selectSong = (index) => {

    if (
      !ready ||
      !playerRef.current
    ) {
      return;
    }


    playerRef.current
      .playVideoAt(index);


    setCurrentIndex(index);

    setDrawerOpen(false);


    showMessage(
      "भजन बदल दिया गया 🎵"
    );


    setTimeout(
      updateSongInfo,
      700
    );

  };


  /* =================================
     SHUFFLE
  ================================= */

  const toggleShuffle = () => {

    if (
      !ready ||
      !playerRef.current
    ) {
      return;
    }


    const nextValue =
      !shuffle;


    setShuffle(nextValue);


    try {

      playerRef.current
        .setShuffle(nextValue);

    } catch {

      // Ignore if YouTube isn't ready.

    }


    showMessage(
      nextValue
        ? "Random भजन चालू 🔀"
        : "भजन क्रम से चलेंगे"
    );

  };


  /* =================================
     PROGRESS
  ================================= */

  useEffect(() => {

    const interval =
      setInterval(() => {

        if (
          !playerRef.current ||
          !ready
        ) {
          return;
        }


        try {

          const current =
            playerRef.current
              .getCurrentTime();


          const total =
            playerRef.current
              .getDuration();


          if (total > 0) {

            setCurrentTime(current);

            setDuration(total);

            setProgress(
              (current / total) * 100
            );

          }

        } catch {

          // Ignore timing errors.

        }

      }, 500);


    return () =>
      clearInterval(interval);

  }, [ready]);


  const seek = (event) => {

    if (
      !ready ||
      !playerRef.current
    ) {
      return;
    }


    const rect =
      event.currentTarget
        .getBoundingClientRect();


    const percentage =
      Math.max(
        0,
        Math.min(
          1,
          (event.clientX - rect.left) /
            rect.width
        )
      );


    playerRef.current.seekTo(

      playerRef.current
        .getDuration() *
        percentage,

      true

    );

  };


  /* =================================
     KEYBOARD
  ================================= */

  useEffect(() => {

    const handleKey = (event) => {

      if (
        event.target instanceof
          HTMLInputElement ||
        event.target instanceof
          HTMLTextAreaElement
      ) {
        return;
      }


      if (event.code === "Space") {

        event.preventDefault();

        togglePlay();

      }


      if (
        event.key.toLowerCase() === "n"
      ) {
        next();
      }


      if (
        event.key.toLowerCase() === "p"
      ) {
        previous();
      }


      if (
        event.key.toLowerCase() === "l"
      ) {

        setDrawerOpen(
          (current) => !current
        );

      }

    };


    window.addEventListener(
      "keydown",
      handleKey
    );


    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [
    ready,
    playing,
    shuffle,
    playlist,
    currentIndex,
  ]);


  /* =================================
     HERO EVENTS
  ================================= */

  useEffect(() => {

    const playToggle =
      () => togglePlay();


    const openPlaylist =
      () => setDrawerOpen(true);


    window.addEventListener(
      "ramji-play-toggle",
      playToggle
    );


    window.addEventListener(
      "ramji-open-playlist",
      openPlaylist
    );


    return () => {

      window.removeEventListener(
        "ramji-play-toggle",
        playToggle
      );


      window.removeEventListener(
        "ramji-open-playlist",
        openPlaylist
      );

    };

  }, [ready, playing]);


  const showMessage = (text) => {

    setMessage(text);


    clearTimeout(
      messageTimer.current
    );


    messageTimer.current =
      setTimeout(() => {

        setMessage(
          "राम नाम में ही शांति है 🙏"
        );

      }, 2500);

  };


  const formatTime = (seconds) => {

    if (
      !seconds ||
      Number.isNaN(seconds)
    ) {
      return "0:00";
    }


    const minutes =
      Math.floor(
        seconds / 60
      );


    const secs =
      Math.floor(
        seconds % 60
      );


    return `${minutes}:${String(
      secs
    ).padStart(2, "0")}`;

  };


  return (

    <>

      {/* HIDDEN YOUTUBE */}

      <div className="youtube-player-hidden">

        <div id="ramYoutubePlayer"></div>

      </div>


      {/* TOP MESSAGE */}

      <div className="player-message">
        {message}
      </div>


      {/* PLAYLIST DRAWER */}

      <aside
        className={`playlist-drawer ${
          drawerOpen
            ? "drawer-open"
            : ""
        }`}
      >

        <div className="drawer-header">

          <div>

            <span>
              ॥ भक्ति महफिल ॥
            </span>

            <h3>
              भजन सूची
            </h3>

          </div>


          <button
            className="drawer-close"
            onClick={() =>
              setDrawerOpen(false)
            }
          >
            ×
          </button>

        </div>


        <div className="drawer-note">

          इस playlist के भजन
          अपनी पसंद से सुनिए।

          <br />

          जिस भजन पर मन ठहर जाए,
          वही आपकी महफिल।

        </div>


        <div className="playlist-items">

          {playlist.length === 0 ? (

            <div className="playlist-loading">

              भजन सूची तैयार हो रही है...

            </div>

          ) : (

            playlist.map(
              (videoId, index) => (

                <button
                  className={`playlist-item ${
                    index === currentIndex
                      ? "active-song"
                      : ""
                  }`}
                  key={`${videoId}-${index}`}
                  onClick={() =>
                    selectSong(index)
                  }
                >

                  <span className="song-number">

                    {String(
                      index + 1
                    ).padStart(2, "0")}

                  </span>


                  <span className="song-name">

                    {index === currentIndex
                      ? "▶ अभी बज रहा है"
                      : `भजन ${index + 1}`}

                  </span>


                  {index === currentIndex && (

                    <span className="playing-bars">
                      ▂▅▃▇
                    </span>

                  )}

                </button>

              )
            )

          )}

        </div>


        <a
          href={`https://www.youtube.com/playlist?list=${playlistConfig.id}`}
          target="_blank"
          rel="noreferrer"
          className="youtube-playlist-link"
        >

          ▶ YouTube पर पूरी playlist

        </a>

      </aside>


      {drawerOpen && (

        <div
          className="drawer-overlay"
          onClick={() =>
            setDrawerOpen(false)
          }
        ></div>

      )}


      {/* PLAYER */}

      <section
        className={`music-player ${
          playing
            ? "is-playing"
            : ""
        }`}
      >

        <div className="player-top">


          <div className="player-art">

            <div className="art-ring">
              ॐ
            </div>

            <div className="art-label">
              राम
            </div>

          </div>


          <div className="player-info">

            <div className="player-live">

              ●{" "}
              {playing
                ? "अभी बज रहा है"
                : "भजन रुका हुआ है"}

            </div>


            <h3>
              {songTitle}
            </h3>


            <p>
              {artist}
            </p>

          </div>


          <div className="player-controls">


            <button
              onClick={toggleShuffle}
              className={
                shuffle
                  ? "shuffle-active"
                  : ""
              }
              title="Shuffle"
            >
              🔀
            </button>


            <button
              onClick={previous}
              title="Previous"
            >
              ⏮
            </button>


            <button
              className="main-play"
              onClick={togglePlay}
              title="Play / Pause"
            >

              {playing
                ? "❚❚"
                : "▶"}

            </button>


            <button
              onClick={next}
              title="Next"
            >
              ⏭
            </button>


            <button
              className="list-button"
              onClick={() =>
                setDrawerOpen(true)
              }
              title="Playlist"
            >
              ☰
            </button>

          </div>

        </div>


        {/* PROGRESS */}

        <div className="progress-container">

          <span>
            {formatTime(currentTime)}
          </span>


          <div
            className="progress-track"
            onClick={seek}
          >

            <div
              className="progress-value"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>


          <span>
            {formatTime(duration)}
          </span>

        </div>


        <div className="player-footer">

          <span>
            🪔 रामजी के भजन
          </span>


          <button
            onClick={() =>
              setDrawerOpen(true)
            }
          >
            ☰ भजन सूची
          </button>


          <span>
            🔀 Shuffle
          </span>


          <span>
            Space · Play
          </span>

        </div>

      </section>

    </>

  );

}