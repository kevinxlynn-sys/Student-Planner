const SUPABASE_URL = 'https://jyuofmbbitaswgxtnsgnp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dW9mbWJiaXRhc3dneHRuc2dwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDY0NjUwMywiZXhwIjoyMDkwMjIyNTAzfQ.M0hQ4btCLUbhUkhSEqBa2UtpifFgK8gtNTmxPvTAFBw';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const { table, method, body, query } = req.method === 'GET' ? req.query : req.body;
  const url = `${SUPABASE_URL}/rest/v1/${table}${query || ''}`;

  try {
    const response = await fetch(url, {
      method: method
