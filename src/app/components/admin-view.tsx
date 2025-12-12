import { Check, X, Clock, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Stage } from './student-view';
import { toast } from 'sonner';

interface AdminViewProps {
  stages: Stage[];
  onUpdateStatus: (id: string, statut: 'validé' | 'refusé') => void;
}

export function AdminView({ stages, onUpdateStatus }: AdminViewProps) {
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

  const handleValidate = (id: string, nom: string) => {
    onUpdateStatus(id, 'validé');
    toast.success(`Stage de ${nom} validé`);
  };

  const handleReject = (id: string, nom: string) => {
    onUpdateStatus(id, 'refusé');
    toast.error(`Stage de ${nom} refusé`);
  };

  const stats = {
    total: stages.length,
    enAttente: stages.filter(s => s.statut === 'en attente').length,
    valides: stages.filter(s => s.statut === 'validé').length,
    refuses: stages.filter(s => s.statut === 'refusé').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl">Interface Administration</h2>
        <p className="text-gray-600">Gérez et validez les déclarations de stage</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
              <FileText className="size-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-semibold">{stats.enAttente}</p>
              </div>
              <Clock className="size-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Validés</p>
                <p className="text-2xl font-semibold">{stats.valides}</p>
              </div>
              <Check className="size-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Refusés</p>
                <p className="text-2xl font-semibold">{stats.refuses}</p>
              </div>
              <X className="size-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des stages */}
      <Card>
        <CardHeader>
          <CardTitle>Déclarations de stage</CardTitle>
          <CardDescription>
            {stats.enAttente > 0 
              ? `${stats.enAttente} déclaration${stats.enAttente > 1 ? 's' : ''} en attente de validation`
              : 'Toutes les déclarations ont été traitées'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="size-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Aucune déclaration de stage</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Étudiant</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Date soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stages.map((stage) => (
                    <TableRow key={stage.id}>
                      <TableCell>
                        <div>
                          <div>{stage.nom_etudiant}</div>
                          <div className="text-sm text-gray-500">{stage.email_etudiant}</div>
                        </div>
                      </TableCell>
                      <TableCell>{stage.entreprise}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={stage.sujet}>
                          {stage.sujet}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm whitespace-nowrap">
                          <div>{new Date(stage.date_debut).toLocaleDateString('fr-FR')}</div>
                          <div className="text-gray-500">
                            {new Date(stage.date_fin).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm whitespace-nowrap">
                        {new Date(stage.date_soumission).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(stage.statut)}>
                          {stage.statut}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {stage.statut === 'en attente' ? (
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleValidate(stage.id, stage.nom_etudiant)}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              <Check className="size-4 mr-1" />
                              Valider
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(stage.id, stage.nom_etudiant)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="size-4 mr-1" />
                              Refuser
                            </Button>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 text-right">
                            Traité
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
