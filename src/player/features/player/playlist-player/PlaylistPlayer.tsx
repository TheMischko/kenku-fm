import React from "react";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import {PlaylistPlayerProps} from "./PlaylistPlayer.types";
import {Title} from "./parts/Title";
import {Controls} from "./parts/Controls";
import {Time} from "./parts/Time";
import {Volume} from "./parts/Volume";


export function PlaylistPlayer({
  onPlaylistNext,
  onPlaylistPrevious,
  onPlaylistSeek,
}: PlaylistPlayerProps) {
  const large = useMediaQuery("(min-width: 500px)");

  if (large) {
    return (
      <>
        <Stack direction="row">
          <Title />
          <Controls
            onPlaylistNext={onPlaylistNext}
            onPlaylistPrevious={onPlaylistPrevious}
          />
          <Volume />
        </Stack>
        <Time onPlaylistSeek={onPlaylistSeek} />
      </>
    );
  } else {
    return (
      <>
        <Title />
        <Time onPlaylistSeek={onPlaylistSeek} />
        <Controls
          onPlaylistNext={onPlaylistNext}
          onPlaylistPrevious={onPlaylistPrevious}
        />
        <Volume />
      </>
    );
  }
}
