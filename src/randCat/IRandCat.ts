import { AirtableBase } from "airtable/lib/airtable_base";

export interface IRandCat {
    table: AirtableBase;
    arrayId: string[];

    getIdArray(table: string): void;
    randCat(defCat: string): string
}