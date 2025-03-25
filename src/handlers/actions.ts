import { Telegraf } from 'telegraf';
import { WorksCallbacksEnum } from '../enums/works-callbacks';
import { ReviewsCallbacksEnum } from '../enums/reviews-callbacks';
import { CURRENT_STATE_MAP } from '../bot';

export function setupActionsHandler(bot: Telegraf) {
  bot.action(WorksCallbacksEnum.Add, async (ctx) => {
    CURRENT_STATE_MAP.set(ctx.from.id, WorksCallbacksEnum.Add);
    await ctx.answerCbQuery();
    await ctx.reply('Отправь фото с примерами работы.');
  });

  bot.action(WorksCallbacksEnum.Delete, async (ctx) => {
    CURRENT_STATE_MAP.set(ctx.from.id, WorksCallbacksEnum.Delete);
    await ctx.answerCbQuery();
    await ctx.reply('Отправь айди фото для удаления (в процессе...)');
  });

  bot.action(ReviewsCallbacksEnum.Add, async (ctx) => {
    CURRENT_STATE_MAP.set(ctx.from.id, ReviewsCallbacksEnum.Add);
    await ctx.answerCbQuery();
    await ctx.reply('Отправь фото с отзывами');
  });

  bot.action(ReviewsCallbacksEnum.Delete, async (ctx) => {
    CURRENT_STATE_MAP.set(ctx.from.id, ReviewsCallbacksEnum.Delete);
    await ctx.answerCbQuery();
    await ctx.reply('Отправь айди фото для удаления (в процессе...)');
  });
}
