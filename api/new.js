import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { target, image } = req.body;
  const id = Math.random().toString(36).substring(2, 8);
  const { error } = await supabase.from('cloaks').insert([{ id, target, image }]);
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ id });
}
