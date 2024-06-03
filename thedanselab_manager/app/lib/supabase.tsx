import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 'https://laxqbtjwobwlqedzbkxv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxheHFidGp3b2J3bHFlZHpia3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjE2OTgsImV4cCI6MjAzMjYzNzY5OH0.P7deAbYM_uq-lHwSRWA1NW6eAej1oLoEvGJE81WPZOU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


