import { AirtableBase } from "airtable/lib/airtable_base";
import { IRandCat } from "./IRandCat";

export class RandCat implements IRandCat {
    table: AirtableBase;
    arrayId: string[] = [];

    constructor(table: AirtableBase) {
        this.table = table;
    }

    async getIdArray(table: string) {
        this.arrayId = [];
        await this.table(table).select()
        .eachPage((records, fetchNextPage) => {
            try {
                records.forEach((record: { getId: () => string; }) => {
                    console.log(record.getId());
                    this.arrayId.push(record.getId());
                });
                fetchNextPage();
            } catch(e){ console.log('error inside eachPage => ',e)
        }}, (err) => {
            if (err) { console.error(err); return; }
        });
        console.log('длина массива massJoke : ' + this.arrayId.length);
        for(let i = 0; i < this.arrayId.length; i++) {
            console.log(`id массива getIdArray ${i}: ${this.arrayId[i]}`);
        }
    }

    randCat(defCat: string): string {
        for(let i = 0; i < this.arrayId.length; i++) {
            console.log(`id массива randCat ${i}: ${this.arrayId[i]}`);
        }
        const rd: number = Math.floor(Math.random() * (this.arrayId.length + 1));
        console.log('random cat: ' + this.arrayId[rd]);
        return this.arrayId[rd] == undefined ? defCat : this.arrayId[rd];
    }

    async getCat(table: string, rd: string) {
        const result = await this.table(table).find(rd);
        return result.fields
    }
}