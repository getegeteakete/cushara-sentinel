import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Incident {
  id: string;
  user_id: string;
  title: string;
  description: string;
  incident_date: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  ai_is_cushara: boolean | null;
  ai_categories: string[] | null;
  ai_risk_score: number | null;
  ai_reasoning: string | null;
  ai_recommended_actions: string[] | null;
  ai_guideline_refs: string[] | null;
  personal_info_masked: boolean;
  created_at: string;
  updated_at: string;
}

export const useIncidents = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['incidents'],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Incident[];
    },
    enabled: !!user,
  });
};

export const useCreateIncident = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (incidentData: {
      title: string;
      description: string;
      incident_date?: string;
      status?: 'pending' | 'reviewing' | 'resolved' | 'escalated';
      priority?: 'low' | 'medium' | 'high' | 'urgent';
      personal_info_masked?: boolean;
    }) => {
      if (!user) throw new Error('User not authenticated');

      const insertData = { 
        user_id: user.id,
        title: incidentData.title,
        description: incidentData.description,
        incident_date: incidentData.incident_date || new Date().toISOString(),
        status: incidentData.status || 'pending',
        priority: incidentData.priority || 'medium',
        personal_info_masked: incidentData.personal_info_masked || false
      };

      const { data, error } = await supabase
        .from('incidents')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
    },
  });
};