import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  const { id } = req.query;
  const { data, error } = await supabase.from('cloaks').select('*').eq('id', id).single();
  if (error || !data) return res.status(404).send('Link not found');

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(`<!DOCTYPE html>
<html><head>
  <meta property="og:image" content="${data.image}">
  <meta http-equiv="refresh" content="0; url=${data.target}">
</head><body></body></html>`);
}
