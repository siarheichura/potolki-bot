import { Telegraf } from 'telegraf';
import { CURRENT_STATE_MAP } from '../bot';
import { message } from 'telegraf/filters';
import { BucketFoldersEnum } from '../enums/bucket-folders';
import { WorksCallbacksEnum } from '../enums/works-callbacks';
import { fromBuffer } from 'file-type';
import { bucketName, supabase } from '../supabase';
import { v4 as uuidv4 } from 'uuid';

export function setupDocumentMessageHandler(bot: Telegraf) {
  bot.on(message('document'), async (ctx) => {
    if (!CURRENT_STATE_MAP.get(ctx.from.id)) {
      return await ctx.reply('Oops!');
    }

    const document = ctx.message.document;
    const mime = document.mime_type;
    const id = document.file_id;

    if (!mime?.startsWith('image/')) {
      return ctx.reply('❌ Это не изображение');
    }

    const link = await ctx.telegram.getFileLink(id).then((res) => res.href);
    const folder = getFolder(ctx.from.id);
    const message = await upload({ link, folder });

    CURRENT_STATE_MAP.set(ctx.from.id, null);
    return ctx.reply(message);
  });
}

export function setupDocumentPhotoHandler(bot: Telegraf) {
  bot.on(message('photo'), async (ctx) => {
    if (!CURRENT_STATE_MAP.get(ctx.from.id)) {
      return await ctx.reply('Oops!');
    }

    const id = ctx.message.photo.pop()?.file_id;

    if (!id) return ctx.reply('❌ Ошибка загрузки фото');

    const link = await ctx.telegram.getFileLink(id).then((res) => res.href);
    const folder = getFolder(ctx.from.id);
    const message = await upload({ link, folder });

    CURRENT_STATE_MAP.set(ctx.from.id, null);
    return ctx.reply(message);
  });
}

/* <--- helpers ---> */

function getFolder(id: number): BucketFoldersEnum {
  const currentState = CURRENT_STATE_MAP.get(id);

  return currentState === WorksCallbacksEnum.Add
    ? BucketFoldersEnum.Works
    : BucketFoldersEnum.Reviews;
}

async function upload(params: { link: string; folder: BucketFoldersEnum }): Promise<string> {
  const file = await fetch(params.link).then((res) => res.arrayBuffer());
  const fileType = await fromBuffer(file);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`${params.folder}/${uuidv4()}`, file, {
      contentType: fileType?.mime,
    });

  if (error) {
    return `❌ Ошибка загрузки фото. ${JSON.stringify(error)}. Попробуйте начать сначала`;
  }

  return '✅ Фото успешно загружено';
}
