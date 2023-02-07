import { config, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './IConfigService';

export class ConfigeService implements IConfigService {
    private config: DotenvParseOutput;
    constructor() {
        const {error, parsed} = config();
        if(error) {
            throw new Error('.env не найден');
        }
        if(!parsed) {
            throw new Error('.env не заполнен');
        }
        this.config = parsed;
    }

    getKey(key: string): string {
        const res = this.config[key];
        if(!res) {
            throw new Error('Ключ отсутвует');
        }
        return res;
    }
}