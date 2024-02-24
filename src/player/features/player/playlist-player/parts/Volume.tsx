import styled from "@mui/material/styles/styled";
import Slider from "@mui/material/Slider";
import {useDispatch, useSelector} from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RootState} from "../../../../app/store";
import {adjustVolume, mute} from "../../../playlists/playlistPlaybackSlice";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import VolumeOff from "@mui/icons-material/VolumeOffRounded";
import VolumeDown from "@mui/icons-material/VolumeDownRounded";
import Box from "@mui/material/Box";
import VolumeUp from "@mui/icons-material/VolumeUp";
import React from "react";

export function Volume() {
    const dispatch = useDispatch();
    const large = useMediaQuery("(min-width: 500px)");

    const muted = useSelector((state: RootState) => state.playlistPlayback.muted);
    const volume = useSelector(
        (state: RootState) => state.playlistPlayback.volume
    );

    function handleVolumeChange(_: Event, value: number | number[]) {
        dispatch(adjustVolume(value as number));
        // TODO: handle value isArray
        if (muted) {
            if (!Array.isArray(value) && value > 0) {
                dispatch(mute(false));
            }
        }
    }

    function handleMute() {
        dispatch(mute(!muted));
    }

    return (
        <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1, width: large ? "30%" : "100%" }}
            alignItems="center"
        >
            <IconButton aria-label={muted ? "unmute" : "mute"} onClick={handleMute}>
                {muted ? <VolumeOff /> : <VolumeDown />}
            </IconButton>
            <VolumeSlider
                aria-label="Volume"
                value={muted ? 0 : volume}
                step={0.01}
                min={0}
                max={1}
                onChange={handleVolumeChange}
            />
            {!large && (
                <Box px={2} height="24px">
                    <VolumeUp sx={{ color: "rgba(255,255,255,0.4)" }} />
                </Box>
            )}
        </Stack>
    );
}

const VolumeSlider = styled(Slider)({
    color: "#fff",
    "& .MuiSlider-track": {
        border: "none",
    },
    "& .MuiSlider-thumb": {
        width: 24,
        height: 24,
        backgroundColor: "#fff",
        "&:hover, &.Mui-focusVisible, &.Mui-active": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
        },
    },
});