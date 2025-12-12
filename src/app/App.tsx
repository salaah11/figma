import { useState, useEffect } from 'react';
import { GraduationCap, ShieldCheck, FileText } from 'lucide-react';
import { StudentView, Stage } from './components/student-view';
import { AdminView } from './components/admin-view';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import stageAPI from './services/api';

type UserRole = 'student' | 'admin' | null;

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les données depuis l'API au démarrage
  useEffect(() => {
    if (role) {
      loadStages();
    }
  }, [role]);

  const loadStages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await stageAPI.getAll();
      setStages(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(errorMessage);
      toast.error(`Erreur: ${errorMessage}`);
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStage = async (stageData: Omit<Stage, 'id' | 'statut' | 'date_soumission'>) => {
    try {
      const newStage = await stageAPI.create(stageData);
      setStages(prev => [newStage, ...prev]);
      toast.success('Stage déclaré avec succès!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création';
      toast.error(`Erreur: ${errorMessage}`);
      console.error('Erreur:', err);
    }
  };

  const handleUpdateStatus = async (id: string, statut: 'validé' | 'refusé') => {
    try {
      const updatedStage = await stageAPI.updateStatus(id, statut);
      setStages(prev =>
        prev.map(stage => (stage.id === id ? updatedStage : stage))
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      toast.error(`Erreur: ${errorMessage}`);
      console.error('Erreur:', err);
    }
  };

  const handleResetData = async () => {
    if (confirm('Voulez-vous vraiment recharger les données depuis le serveur ?')) {
      await loadStages();
      toast.success('Données rechargées');
    }
  };

  // Écran de sélection de rôle
  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Toaster />
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <FileText className="size-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl mb-2">Plateforme de Déclaration de Stages</h1>
            <p className="text-gray-600 text-lg">
              Centralisation et suivi des stages étudiants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Étudiant */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-blue-500">
              <CardContent className="p-8 text-center" onClick={() => setRole('student')}>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    <GraduationCap className="size-12 text-blue-600" />
                  </div>
                </div>
                <h2 className="text-2xl mb-3">Interface Étudiant</h2>
                <p className="text-gray-600 mb-6">
                  Déclarez votre stage et consultez le statut de vos déclarations
                </p>
                <ul className="text-left text-sm space-y-2 mb-6 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span>Déclarer un nouveau stage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span>Suivre le statut de validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">✓</span>
                    <span>Consulter l'historique</span>
                  </li>
                </ul>
                <Button className="w-full" size="lg">
                  Accéder en tant qu'Étudiant
                </Button>
              </CardContent>
            </Card>

            {/* Carte Administration */}
            <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-green-500">
              <CardContent className="p-8 text-center" onClick={() => setRole('admin')}>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <ShieldCheck className="size-12 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl mb-3">Interface Administration</h2>
                <p className="text-gray-600 mb-6">
                  Gérez et validez les déclarations de stage des étudiants
                </p>
                <ul className="text-left text-sm space-y-2 mb-6 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Voir toutes les déclarations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Valider ou refuser les stages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Statistiques et suivi global</span>
                  </li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  Accéder en tant qu'Admin
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Aucune authentification requise - Sélectionnez votre rôle pour continuer</p>
          </div>
        </div>
      </div>
    );
  }

  // Interface principale avec le rôle sélectionné
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${role === 'admin' ? 'bg-green-500' : 'bg-blue-500'}`}>
                {role === 'admin' ? (
                  <ShieldCheck className="size-6 text-white" />
                ) : (
                  <GraduationCap className="size-6 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-xl">Plateforme de Déclaration de Stages</h1>
                <p className="text-sm text-gray-600">
                  {role === 'admin' ? 'Mode Administration' : 'Mode Étudiant'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setRole(null)}>
                Changer de rôle
              </Button>
              <Button variant="outline" size="sm" onClick={handleResetData}>
                Réinitialiser les données
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {role === 'student' ? (
          <StudentView stages={stages} onAddStage={handleAddStage} />
        ) : (
          <AdminView stages={stages} onUpdateStatus={handleUpdateStatus} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Mini-Plateforme de Déclaration & Suivi de Stages - Données stockées localement
          </p>
        </div>
      </footer>
    </div>
  );
}