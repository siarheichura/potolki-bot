import * as dotenv from 'dotenv';
dotenv.config();

console.log('ENV', process.env);
console.log('URL', process.env.SUPDABASE_URL);

import { bot } from './bot';
void bot.launch();
