import {useSelector} from "react-redux";
import {RootState} from "../../../../app/store";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

export function Title() {
    const playlists = useSelector((state: RootState) => state.playlists);
    const queue = useSelector((state: RootState) => state.playlistPlayback.queue);
    const track = useSelector((state: RootState) => state.playlistPlayback.track);
    const noTrack = track?.title === undefined;

    const large = useMediaQuery("(min-width: 500px)");

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: large ? "30%" : "100%",
                flexDirection: "column",
            }}
        >
            <Typography
                variant="body2"
                sx={{ width: "100%", textAlign: large ? undefined : "center" }}
                noWrap
                gutterBottom
            >
                {noTrack ? "" : track.title}
            </Typography>
            <Typography
                variant="caption"
                color="rgba(255, 255, 255, 0.8)"
                sx={{ width: "100%", textAlign: large ? undefined : "center" }}
                noWrap
            >
                {noTrack ? "" : playlists.playlists.byId[queue.playlistId]?.title}
            </Typography>
        </Box>
    );
}