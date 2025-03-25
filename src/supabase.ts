import { createClient } from '@supabase/supabase-js';

console.log('ENV1', process.env.SUPABASE_URL);

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
);

export const bucketName = process.env.SUPABASE_BUCKET as string;
