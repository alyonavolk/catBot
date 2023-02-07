import { AirtableBase } from "airtable/lib/airtable_base";
import { IRandCat } from "./IRandCat";

export class RandCat implements IRandCat {
    table: AirtableBase;

    constructor(table: AirtableBase) {
        this.table = table;
    }

    async getIdArray(table: string) {
        const arrayId: string[] = [];
        await this.table(table).select()
        .firstPage((err, records) => {
            if (err) { console.error(err); return; }
            records?.forEach((record) => {
                console.log(record.getId());
                arrayId.push(record.getId());
            });
        });
        return arrayId;
    }

    randCat(defCat: string, arrayId: string[]): string {
        const rd: number = Math.floor(Math.random() * (arrayId.length + 1));
        return arrayId[rd] == undefined ? defCat : arrayId[rd];
    }

    async getCat(table: string, rd: string) {
        const result = await this.table(table).find(rd);
        return result.fields
    }
}