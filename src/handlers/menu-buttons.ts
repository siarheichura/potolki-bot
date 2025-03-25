import { Markup, Telegraf } from 'telegraf';
import { MenuButtonsEnum } from '../enums/menu-buttons';
import { ManageButtonsEnum } from '../enums/manage-buttons';
import { WorksCallbacksEnum } from '../enums/works-callbacks';
import { ReviewsCallbacksEnum } from '../enums/reviews-callbacks';

export function setupMenuButtonsHandler(bot: Telegraf) {
  const questionText = 'Что хотим сделать?';

  bot.hears(MenuButtonsEnum.Works, (ctx) => {
    ctx.reply(
      `${MenuButtonsEnum.Works}. ${questionText}`,
      Markup.inlineKeyboard([
        [Markup.button.callback(ManageButtonsEnum.Add, WorksCallbacksEnum.Add)],
        [Markup.button.callback(ManageButtonsEnum.Delete, WorksCallbacksEnum.Delete)],
      ]),
    );
  });

  bot.hears(MenuButtonsEnum.Reviews, (ctx) => {
    ctx.reply(
      `${MenuButtonsEnum.Reviews}. ${questionText}`,
      Markup.inlineKeyboard([
        [Markup.button.callback(ManageButtonsEnum.Add, ReviewsCallbacksEnum.Add)],
        [Markup.button.callback(ManageButtonsEnum.Delete, ReviewsCallbacksEnum.Delete)],
      ]),
    );
  });
}
