import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FileText, Plus } from 'lucide-react';
import { toast } from 'sonner';

export interface Stage {
  id: string;
  id_etudiant: string;
  nom_etudiant: string;
  email_etudiant: string;
  entreprise: string;
  sujet: string;
  date_debut: string;
  date_fin: string;
  statut: 'en attente' | 'validé' | 'refusé';
  date_soumission: string;
}

interface StudentViewProps {
  stages: Stage[];
  onAddStage: (stage: Omit<Stage, 'id' | 'statut' | 'date_soumission'>) => void;
}

export function StudentView({ stages, onAddStage }: StudentViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom_etudiant: '',
    email_etudiant: '',
    entreprise: '',
    sujet: '',
    date_debut: '',
    date_fin: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const id_etudiant = `ETU${Date.now()}`;
    
    onAddStage({
      id_etudiant,
      ...formData,
    });

    toast.success('Stage déclaré avec succès!');
    
    setFormData({
      nom_etudiant: '',
      email_etudiant: '',
      entreprise: '',
      sujet: '',
      date_debut: '',
      date_fin: '',
    });
    setShowForm(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (statut: Stage['statut']) => {
    switch (statut) {
      case 'validé':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'refusé':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec bouton */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">Interface Étudiant</h2>
          <p className="text-gray-600">Déclarez votre stage et consultez son statut</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="size-4 mr-2" />
            Déclarer un stage
          </Button>
        )}
      </div>

      {/* Formulaire de déclaration */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Déclarer un nouveau stage</CardTitle>
            <CardDescription>Remplissez les informations concernant votre stage</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom_etudiant">Nom complet *</Label>
                  <Input
                    id="nom_etudiant"
                    value={formData.nom_etudiant}
                    onChange={(e) => handleChange('nom_etudiant', e.target.value)}
                    required
                    placeholder="Prénom Nom"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email_etudiant">Email *</Label>
                  <Input
                    id="email_etudiant"
                    type="email"
                    value={formData.email_etudiant}
                    onChange={(e) => handleChange('email_etudiant', e.target.value)}
                    required
                    placeholder="votre.email@ecole.fr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="entreprise">Entreprise d'accueil *</Label>
                <Input
                  id="entreprise"
                  value={formData.entreprise}
                  onChange={(e) => handleChange('entreprise', e.target.value)}
                  required
                  placeholder="Nom de l'entreprise"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sujet">Sujet du stage *</Label>
                <Textarea
                  id="sujet"
                  value={formData.sujet}
                  onChange={(e) => handleChange('sujet', e.target.value)}
                  required
                  placeholder="Décrivez le sujet et les missions de votre stage..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_debut">Date de début *</Label>
                  <Input
                    id="date_debut"
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => handleChange('date_debut', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_fin">Date de fin *</Label>
                  <Input
                    id="date_fin"
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => handleChange('date_fin', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Soumettre la déclaration
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste des déclarations */}
      <Card>
        <CardHeader>
          <CardTitle>Mes déclarations de stage</CardTitle>
          <CardDescription>Consultez le statut de vos déclarations</CardDescription>
        </CardHeader>
        <CardContent>
          {stages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="size-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Aucune déclaration de stage</p>
              <p className="text-sm text-gray-400">Cliquez sur "Déclarer un stage" pour commencer</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stages.map((stage) => (
                <div key={stage.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{stage.entreprise}</h3>
                      <p className="text-sm text-gray-600">{stage.nom_etudiant}</p>
                    </div>
                    <Badge className={getStatusColor(stage.statut)}>
                      {stage.statut}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Sujet: </span>
                      <span className="text-sm">{stage.sujet}</span>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Début: </span>
                        <span>{new Date(stage.date_debut).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fin: </span>
                        <span>{new Date(stage.date_fin).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-400">
                      Déclaré le {new Date(stage.date_soumission).toLocaleDateString('fr-FR')} à{' '}
                      {new Date(stage.date_soumission).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
