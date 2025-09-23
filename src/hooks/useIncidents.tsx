import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Incident {
  id: string;
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
    mutationFn: async (incidentData: Omit<Incident, 'id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('incidents')
        .insert([{ ...incidentData, user_id: user.id }])
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