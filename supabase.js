// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvtvaagnqoeqzniftwsh.supabase.co'; // Ideally, use an environment variable
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dHZhYWducW9lcXpuaWZ0d3NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwNjI3MzksImV4cCI6MjAxNjYzODczOX0.89gGfytg9D6SZ139for-CFmxoxeilqcxgLkh9fENcpM'; // Ideally, use an environment variable

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
