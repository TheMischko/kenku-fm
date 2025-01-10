import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import {playPause, repeat, shuffle} from "../../../playlists/playlistPlaybackSlice";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Shuffle from "@mui/icons-material/ShuffleRounded";
import Previous from "@mui/icons-material/SkipPreviousRounded";
import Pause from "@mui/icons-material/PauseRounded";
import PlayArrow from "@mui/icons-material/PlayArrowRounded";
import Next from "@mui/icons-material/SkipNextRounded";
import RepeatIcon from "@mui/icons-material/RepeatRounded";
import RepeatOne from "@mui/icons-material/RepeatOneRounded";
import {PlaylistPlayerProps} from "../PlaylistPlayer.types";
import React from "react";

export function Controls({
                      onPlaylistPrevious,
                      onPlaylistNext,
                  }: Omit<PlaylistPlayerProps, "onPlaylistSeek">) {
    const dispatch = useDispatch();
    const playbackShuffle = useSelector(
        (state: RootState) => state.playlistPlayback.shuffle
    );
    const disabled = useSelector(
        (state: RootState) => !!state.playlistPlayback.playback
    );
    const playing = useSelector(
        (state: RootState) => state.playlistPlayback.playing
    );
    const playbackRepeat = useSelector(
        (state: RootState) => state.playlistPlayback.repeat
    );

    function handlePlay() {
        dispatch(playPause(!playing));
    }

    function handleRepeat() {
        switch (playbackRepeat) {
            case "off":
                dispatch(repeat("playlist"));
                break;
            case "playlist":
                dispatch(repeat("track"));
                break;
            case "track":
                dispatch(repeat("off"));
                break;
        }
    }

    function handleShuffle() {
        const newShuffle = !playbackShuffle;
        dispatch(shuffle(newShuffle));
    }

    return (
        <Box
            sx={{
        display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
            flexGrow: 1,
    }}
>
    <IconButton aria-label="shuffle" onClick={handleShuffle}>
    <Shuffle color={playbackShuffle ? "primary" : undefined} />
    </IconButton>
    <IconButton
    disabled={disabled}
    aria-label="previous"
    onClick={() => onPlaylistPrevious()}
>
    <Previous />
    </IconButton>
    <IconButton
    aria-label={playing ? "pause" : "play"}
    onClick={handlePlay}
    disabled={disabled}
        >
        {playing ? (
                <Pause sx={{ fontSize: "3rem" }} />
) : (
        <PlayArrow sx={{ fontSize: "3rem" }} />
)}
    </IconButton>
    <IconButton
    disabled={disabled}
    aria-label="next"
    onClick={() => onPlaylistNext()}
>
    <Next />
    </IconButton>
    <IconButton aria-label={`repeat ${playbackRepeat}`} onClick={handleRepeat}>
    {playbackRepeat === "off" ? (
        <RepeatIcon />
    ) : playbackRepeat === "playlist" ? (
        <RepeatIcon color="primary" />
    ) : (
        <RepeatOne color="primary" />
    )}
    </IconButton>
    </Box>
);
}