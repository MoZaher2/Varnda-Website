import React from 'react';
import ReactPlayer from 'react-player';
import Style from "./VideoEmbed.module.css"
export default function VideoEmbed({ videoUrl }) {
  return (
    <div className={Style.frame}>
      <div className={Style.playerCont}>
        <ReactPlayer
          url={videoUrl}
          className={Style.player}
          width='100%'
          height='100%'
          controls
        />
      </div>
    </div>
  );
}
