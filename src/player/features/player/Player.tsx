import React from "react";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import { SoundboardPlayer } from "./SoundboardPlayer";
import { PlaylistPlayer } from "./playlist-player/PlaylistPlayer";

type PlayerProps = {
  onPlaylistNext: () => void;
  onPlaylistPrevious: () => void;
  onPlaylistSeek: (to: number) => void;
  onSoundboardStop: (id: string) => void;
};

export function Player({
  onPlaylistNext,
  onPlaylistPrevious,
  onPlaylistSeek,
  onSoundboardStop,
}: PlayerProps) {
  return (
    <Container
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
      }}
      maxWidth="md"
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <SoundboardPlayer onSoundboardStop={onSoundboardStop} />
        <PlaylistPlayer
          onPlaylistNext={onPlaylistNext}
          onPlaylistPrevious={onPlaylistPrevious}
          onPlaylistSeek={onPlaylistSeek}
        />
      </Paper>
    </Container>
  );
}
