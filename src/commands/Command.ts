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
    private tableFunnyCat;
    private tableSadCats;
    private tableLovelyCats;
    constructor(public bot: Telegraf<IBotContext>, table: AirtableBase) {
        super(bot);
        this.table = table;
        this.randCat = new RandCat(this.table);
        this.tableFunnyCat = this.randCat.getIdArray('FunnyCats');
        this.tableSadCats = this.randCat.getIdArray("SadCats");
        this.tableLovelyCats = this.randCat.getIdArray("LovelyCats");
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
            console.log('action joke: ' + this.randCat.getCat('FunnyCats', 'recZWFHkX4Cqd84Xf'));

            this.tableFunnyCat.then(() => {
                // this.randCat.getIdArray('FunnyCats')
                this.randCat.getCat('FunnyCats', this.randCat.randCat('recZWFHkX4Cqd84Xf')).then(data => {
                    const {img, descr} = data;
                    console.log('THEN: ' + img, descr);
                    const { ...dataImg }: any = img;
                    const { url } = dataImg[0];
                    console.log('object img: ' + url);
                    
                    
                    typeof descr === 'string' ? context.replyWithPhoto(url, {caption: descr}) 
                    : context.replyWithPhoto(url, {caption: 'шутка...'});
                    // typeof descr === 'string' ? context.editMessageText(descr) 
                    // : context.editMessageText('шутка...');
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));



            // this.table('joke').find(this.massJoke.randJoke(), (err, record) => {
            //     if (err) { console.error(err); return; }
            //     console.log('random: ', this.massJoke.randJoke());
            //     const res = record?.get('Notes');
            //     const resImg = record?.get('img');
            //     const { ...dataImg}: any = resImg; 
            //     const {id, url, ...all} = dataImg[0];
            //     console.log('object img: ' + url);
                
                
            //     typeof res === 'string' ? context.replyWithPhoto(url, {caption: `${res} '\n' ${res}`}) 
            //     : context.replyWithPhoto(url, {caption: 'шутка...'});

            //     typeof res === 'string' ? context.sendPhoto(url, {caption: res}) 
            //     : context.sendPhoto(url, {caption: 'шутка...'});

            //     typeof res === 'string' ? context.editMessageText(res) 
            //     : context.editMessageText('шутка...');
            // });
        })

    }

    
}
