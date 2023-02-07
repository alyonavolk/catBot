import { AirtableBase } from "airtable/lib/airtable_base";

export interface IRandCat {
    table: AirtableBase;

    getIdArray(table: string): void;
    randCat(defCat: string, arrayId: string[]): string
}