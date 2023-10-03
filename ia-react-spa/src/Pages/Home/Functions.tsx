import {FlashSheet, SearchOption} from "./Types";

// This function takes an array of flash sheet data as input, and computes an array of search options for the search bar
export function computeSearchOptions ( sheets: FlashSheet[] ): SearchOption[] {
    const accumulator: Map<string, number[]> = new Map();

    for ( const sheet of sheets ) {
        // handle / reduce titles using accumulator
        if ( accumulator.has(sheet.title) ) {
            // If the title exists in the accumulator, add the sheet id to that search option
            accumulator.get(sheet.title)!.push(sheet.id)
        } else {
            // Add the title and the sheet id to the new search option
            accumulator.set(sheet.title, [sheet.id])
        }

        // handle / reduce tags using accumulator
        for ( const tag of sheet.tags ) {
            if ( accumulator.has(tag)) {
                // if the tag exists in the accumulator, add the sheet id to the search option for that tag
                accumulator.get(tag)!.push(sheet.id)
            } else {
                // if there is no search option for that tag, add it and the sheet id
                accumulator.set(tag, [sheet.id])
            }
        }
    }

    return Array.from( accumulator ).map( ( [label, ids] ) => ({ label, ids } as SearchOption) )
}

// This function takes the selected search options as input and outputs the currently selected sheets.
export function computeSelectedSheets ( selectedOptions: SearchOption[] | null, flashSheets: FlashSheet[] ): FlashSheet[] {
    // if there are any sheets selected, filter the available flash sheets
    if ( selectedOptions !== null && selectedOptions.length > 0 ) {
        var selectedSheetIds: number[] = selectedOptions
            // select just the ids from the selected options, not the labels
            .map( ( option ) => option.ids )
            // flatten the id arrays into a single dimentional array.
            .reduce( ( accumulator, id ) => accumulator.concat(id), [] )
        // distinct the ids among each other
        selectedSheetIds = Array.from( new Set( selectedSheetIds ) )
        // select sheets from available flash sheets
        const selectedSheets: FlashSheet[] = selectedSheetIds
            .map( ( id ) => flashSheets.filter( ( sheet ) => sheet.id == id )[0] )
        return selectedSheets ?? []
    } else {
        return flashSheets
    }
}

// This function takes the first letter of each word in the string and capitalizes it.
export function capitalizeWords ( input: string ): string { return input.replace(/\b\w/g, char => char.toUpperCase()) }