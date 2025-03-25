import * as dotenv from 'dotenv';
dotenv.config();

console.log('ENV10', process.env.SUPABASE_URL);

import { bot } from './bot';
void bot.launch();
