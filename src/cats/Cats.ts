import { AirtableBase } from "airtable/lib/airtable_base";


export class Cats {
    table: AirtableBase;

    constructor(table: AirtableBase) {
        this.table = table;
    }

    
}