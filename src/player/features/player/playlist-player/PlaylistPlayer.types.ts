export type PlaylistPlayerProps = {
    onPlaylistNext: () => void;
    onPlaylistPrevious: () => void;
    onPlaylistSeek: (to: number) => void;
};