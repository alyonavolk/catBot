import { Telegraf } from 'telegraf';
import Airtable from 'airtable';
import LocalSession from 'telegraf-session-local';
import { Command, StartCommand } from './commands/Command';
import { ConfigeService } from './config/ConfigService';
import { IConfigService } from './config/IConfigService';
import { AirtableBase } from 'airtable/lib/airtable_base';

class Bot {
    bot: Telegraf<any>;
    command: Command[] = [];
    table: AirtableBase;

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<any>(this.configService.getKey("TOKEN"));
        this.table = new Airtable({
            endpointUrl: 'https://api.airtable.com',
            apiKey: this.configService.getKey("APIKEY")
        }).base(this.configService.getKey("AIRTABLEBASE"));
        this.bot.use(new LocalSession({database: 'catBotSession.json'}).middleware());
    }

    init() {
        this.command = [new StartCommand(this.bot, this.table)];
        for(const command of this.command) {
            command.handle();
        }
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigeService());
bot.init();