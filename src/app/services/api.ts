import { Stage } from '../components/student-view';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fonction utilitaire pour gérer les erreurs
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Erreur réseau' }));
    throw new Error(error.error || `Erreur HTTP: ${response.status}`);
  }
  return response.json();
};

// ==================== API SERVICES ====================

export const stageAPI = {
  // Récupérer tous les stages
  getAll: async (): Promise<Stage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stages`);
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des stages:', error);
      throw error;
    }
  },

  // Récupérer un stage par ID
  getById: async (id: string): Promise<Stage> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stages/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération du stage:', error);
      throw error;
    }
  },

  // Créer un nouveau stage
  create: async (stageData: Omit<Stage, 'id' | 'statut' | 'date_soumission'>): Promise<Stage> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stageData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la création du stage:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'un stage
  updateStatus: async (id: string, statut: 'en attente' | 'validé' | 'refusé'): Promise<Stage> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stages/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statut }),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },

  // Supprimer un stage
  delete: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stages/${id}`, {
        method: 'DELETE',
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la suppression du stage:', error);
      throw error;
    }
  },

  // Obtenir les statistiques
  getStats: async (): Promise<{
    total: number;
    en_attente: number;
    valides: number;
    refuses: number;
  }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/stages/stats/summary`);
      return handleResponse(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },
};

export default stageAPI;
