import { FlashSheet } from "./Types";


// This function takes the first letter of each word in the string and capitalizes it.
export function capitalizeWords ( input: string ): string { return input.replace(/\b\w/g, char => char.toUpperCase()) }