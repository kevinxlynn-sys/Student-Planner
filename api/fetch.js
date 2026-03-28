export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { url } = req.query;
  if (!url) { res.status(400).json({ error: 'No URL provided' }); return; }

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.status(200).json({ content: text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
