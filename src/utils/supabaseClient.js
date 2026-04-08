import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ixzjfvseoelacdzthjyt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4empmdnNlb2VsYWNkenRoanl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2MDk1NjQsImV4cCI6MjA5MTE4NTU2NH0.y1NrCJAg3n-8WVo8E3iO2FDFHhtTJbT-Am3Aju-xuaI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)