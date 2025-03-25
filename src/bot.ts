import { Telegraf } from 'telegraf';
import { WorksCallbacksEnum } from './enums/works-callbacks';
import { ReviewsCallbacksEnum } from './enums/reviews-callbacks';
import { setupStartHandler } from './handlers/start';
import { setupMenuButtonsHandler } from './handlers/menu-buttons';
import { setupActionsHandler } from './handlers/actions';
import { setupDocumentMessageHandler, setupDocumentPhotoHandler } from './handlers/message';

export const bot = new Telegraf(process.env.BOT_TOKEN as string);

export const CURRENT_STATE_MAP = new Map<
  number,
  WorksCallbacksEnum | ReviewsCallbacksEnum | null
>();

setupStartHandler(bot);
setupMenuButtonsHandler(bot);
setupActionsHandler(bot);
setupDocumentMessageHandler(bot);
setupDocumentPhotoHandler(bot);
