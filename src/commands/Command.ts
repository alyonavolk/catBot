import { AirtableBase } from "airtable/lib/airtable_base";
import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/IContext";
import { RandCat } from '../randCat/RandCat';

export abstract class Command {
    constructor(public bot: Telegraf<IBotContext>) {}

    abstract handle(): void;
}

export class StartCommand extends Command {
    table: AirtableBase;
    randCat: RandCat;
    private tableFunnyCat: string[] = [];
    private tableSadCats: string[] = [];
    private tableLovelyCats: string[] = [];
    constructor(public bot: Telegraf<IBotContext>, table: AirtableBase) {
        super(bot);
        this.table = table;
        this.randCat = new RandCat(this.table);
    }

    handle() {
        this.bot.start((context) => {
            console.log(context.session);
            context.reply("Привет)", Markup.keyboard([
                ['Получить мем'] 
            ]).resize());
        })

        this.bot.hears('Получить мем', (context) => {
            context.reply("Выберите категорию", Markup.inlineKeyboard([
                [Markup.button.callback("Смешные котики", "FunnyCats"),
                Markup.button.callback("Грустные котики", "SadCats")],
                [Markup.button.callback("Милые котики", "LovelyCats")]
            ]))
        });

        this.bot.command('memcat', (context) => {
            context.reply("Выберите категорию", Markup.inlineKeyboard([
                [Markup.button.callback("Смешные котики", "FunnyCats"),
                Markup.button.callback("Грустные котики", "SadCats")],
                [Markup.button.callback("Милые котики", "LovelyCats")]
            ]))
        });

        this.bot.action("FunnyCats", (context) => {
            context.session.tellJoke = true;

            this.randCat.getIdArray('FunnyCats').then( data => {
                this.tableFunnyCat = data;
            })
            .catch(err => console.error(err));

            console.log(this.tableFunnyCat);
            this.randCat.getCat('FunnyCats', this.randCat.randCat('recZWFHkX4Cqd84Xf', this.tableFunnyCat)).then(data => {
                const {img, descr} = data;
                const { ...dataImg }: any = img;
                const { url } = dataImg[0];
                
                
                typeof descr === 'string' ? context.replyWithPhoto(url, {caption: descr}) 
                : context.replyWithPhoto(url, {caption: '😼'});
            })
        })

        this.bot.action("SadCats", (context) => {
            context.session.tellJoke = true;

            this.randCat.getIdArray('SadCats').then( data => {
                this.tableSadCats = data;
            })
            .catch(err => console.error(err));
            
            this.randCat.getCat('SadCats', this.randCat.randCat('recep4uwiowN5igwC', this.tableSadCats)).then(data => {
                const {img, descr} = data;
                const { ...dataImg }: any = img;
                const { url } = dataImg[0];
                
                typeof descr === 'string' ? context.replyWithPhoto(url, {caption: descr}) 
                : context.replyWithPhoto(url, {caption: '😼'});
            })
        })

        this.bot.action("LovelyCats", (context) => {
            context.session.tellJoke = true;

            this.randCat.getIdArray('LovelyCats').then( data => {
                this.tableLovelyCats = data;
            })
            .catch(err => console.error(err));
            
            this.randCat.getCat('LovelyCats', this.randCat.randCat('recuHauy4sIyhNut6', this.tableLovelyCats)).then(data => {
                const {img, descr} = data;
                const { ...dataImg }: any = img;
                const { url } = dataImg[0];
                
                typeof descr === 'string' ? context.replyWithPhoto(url, {caption: descr}) 
                : context.replyWithPhoto(url, {caption: '😼'});
            })
        })
    }

    
}
