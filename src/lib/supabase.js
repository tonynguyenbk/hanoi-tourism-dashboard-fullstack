import { createClient } from '@supabase/supabase-js'

/**
 * Supabase client — dùng chung toàn app
 * Đọc URL và key từ biến môi trường (.env)
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
