export type FlashSheet = {
    id: number;
    artist_id: string;
    size_range: string;
    url: string;
    title: string;
    tags: string[];
    flash_pieces: FlashPiece[];
}

export type FlashPiece = {
    id: string;
    artist_id: string;
    title: string;
    size_range: string;
    tags: string[];
    url: string;
}

export type SearchOption = {
    label: string;
    ids: number[];
}