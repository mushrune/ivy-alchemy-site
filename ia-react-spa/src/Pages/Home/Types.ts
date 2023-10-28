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
    count: number;
}

export type Filter = {
    label: string;
    type: string;
    count: number;
}

// This type exists to help manage state of the tone selector between renders
export type TonePosition = {
    tone: string;
    position: number;
}