-- Create volunteer_registrations table to store signup records
CREATE TABLE public.volunteer_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  recruitment_id INTEGER NOT NULL,
  recruitment_title TEXT NOT NULL,
  recruitment_time TEXT NOT NULL,
  recruitment_deadline TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '已報名',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.volunteer_registrations ENABLE ROW LEVEL SECURITY;

-- Users can view their own registrations
CREATE POLICY "Users can view their own registrations"
ON public.volunteer_registrations
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own registrations
CREATE POLICY "Users can create their own registrations"
ON public.volunteer_registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can delete their own registrations
CREATE POLICY "Users can delete their own registrations"
ON public.volunteer_registrations
FOR DELETE
USING (auth.uid() = user_id);