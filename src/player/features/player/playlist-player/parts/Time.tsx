import {PlaylistPlayerProps} from "../PlaylistPlayer.types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import Box from "@mui/material/Box";
import React, {useState} from "react";
import styled from "@mui/material/styles/styled";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export function Time({ onPlaylistSeek }: Pick<PlaylistPlayerProps, "onPlaylistSeek">) {
    const playback = useSelector(
        (state: RootState) => state.playlistPlayback.playback
    );

    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }

    // Override the time slider when changing the value
    const [timeOverride, setTimeOverride] = useState<number | null>(null);
    // Commit the time value when letting go of the slider
    function handleTimeChange(_: Event, value: number | number[]) {
        setTimeOverride(null);
        onPlaylistSeek(value as number);
    }

    const time = timeOverride === null ? playback?.progress || 0 : timeOverride;
    const duration = playback?.duration || 0;

    return (
        <Box>
            <TimeSlider
                aria-label="time-indicator"
                size="small"
                value={time}
                min={0}
                step={1}
                max={duration}
                disabled={!!playback}
                onChange={(_, value) => setTimeOverride(value as number)}
                onChangeCommitted={handleTimeChange}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: -2,
                }}
            >
                <TinyText>{formatDuration(time)}</TinyText>
                <TinyText>-{formatDuration(duration - time)}</TinyText>
            </Box>
        </Box>
    );
}

const TimeSlider = styled(Slider)({
    color: "#fff",
    height: 4,
    "& .MuiSlider-thumb": {
        width: 8,
        height: 8,
        "&:before": {
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
        },
        "&:hover, &.Mui-focusVisible": {
            boxShadow: "0px 0px 0px 8px rgb(255 255 255 / 16%)",
        },
        "&.Mui-active": {
            width: 20,
            height: 20,
        },
    },
    "& .MuiSlider-rail": {
        opacity: 0.28,
    },
});

const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});