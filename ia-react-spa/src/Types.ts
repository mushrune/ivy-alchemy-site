// This type exists to help manage state of the tone selector
export type TonePosition = {
    color: string;
    position: number;
}

export type FlashSheet = {
    id: number;
    size_range: string;
    created_date: string;
    url: string;
    title: string;
    tags: string[];
    flash_pieces: FlashPiece[];
    piece_ids: string;
}

export type FlashPiece = {
    id: string;
    created_date: string;
    title: string;
    size_range: string;
    tags: string[];
    url: string;
}