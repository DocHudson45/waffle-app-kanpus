import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://arindcntzdadqpqlzpyg.supabase.co" 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyaW5kY250emRhZHFwcWx6cHlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4OTM2ODcsImV4cCI6MjA5NDQ2OTY4N30.Fk9nhrXsrRZEH1pLDMFzduaztIZ-RlylgrzaW2k0vHQ"                 // ganti ini (anon public)

export const supabase = createClient(supabaseUrl, supabaseKey)

