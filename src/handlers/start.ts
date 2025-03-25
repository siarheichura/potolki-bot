import { Markup, Telegraf } from 'telegraf';
import { MenuButtonsEnum } from '../enums/menu-buttons';
import { CURRENT_STATE_MAP } from '../bot';

export function setupStartHandler(bot: Telegraf) {
  bot.start((ctx) => {
    CURRENT_STATE_MAP.set(ctx.from.id, null);
    ctx.reply('Welcome 👋', Markup.keyboard([Object.values(MenuButtonsEnum)]));
  });
}
