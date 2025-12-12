/**
 * Script de test de l'API
 * Usage: node test-api.js
 */

const API_URL = 'http://localhost:5000/api';

// Codes couleur pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Fonction utilitaire pour afficher
const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

// Fonction pour faire une requête
async function makeRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    return { success: response.ok, status: response.status, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Tests
async function runTests() {
  log('\n🧪 TESTS DE L\'API - Plateforme de Gestion des Stages\n', 'cyan');
  
  let testsPassed = 0;
  let testsFailed = 0;
  let createdStageId = null;

  // Test 1: Récupérer tous les stages
  log('Test 1: GET /api/stages - Récupérer tous les stages', 'blue');
  const test1 = await makeRequest('/stages');
  if (test1.success) {
    log(`✓ Succès - ${test1.data.length} stages trouvés`, 'green');
    console.log(`  Exemple:`, test1.data[0] || 'Aucun stage');
    testsPassed++;
  } else {
    log(`✗ Échec - ${test1.error}`, 'red');
    testsFailed++;
  }

  // Test 2: Créer un nouveau stage
  log('\nTest 2: POST /api/stages - Créer un nouveau stage', 'blue');
  const newStage = {
    id_etudiant: `ETU${Date.now()}`,
    nom_etudiant: 'Test Automatique',
    email_etudiant: 'test@ecole.fr',
    entreprise: 'Test Company',
    sujet: 'Stage de test créé automatiquement',
    date_debut: '2025-06-01',
    date_fin: '2025-12-31'
  };
  
  const test2 = await makeRequest('/stages', 'POST', newStage);
  if (test2.success) {
    createdStageId = test2.data.id;
    log(`✓ Succès - Stage créé avec ID: ${createdStageId}`, 'green');
    console.log('  Stage créé:', test2.data);
    testsPassed++;
  } else {
    log(`✗ Échec - ${test2.error}`, 'red');
    testsFailed++;
  }

  // Test 3: Récupérer un stage par ID
  if (createdStageId) {
    log(`\nTest 3: GET /api/stages/${createdStageId} - Récupérer le stage créé`, 'blue');
    const test3 = await makeRequest(`/stages/${createdStageId}`);
    if (test3.success) {
      log(`✓ Succès - Stage trouvé`, 'green');
      console.log('  Stage:', test3.data);
      testsPassed++;
    } else {
      log(`✗ Échec - ${test3.error}`, 'red');
      testsFailed++;
    }
  }

  // Test 4: Mettre à jour le statut du stage
  if (createdStageId) {
    log(`\nTest 4: PUT /api/stages/${createdStageId}/status - Valider le stage`, 'blue');
    const test4 = await makeRequest(`/stages/${createdStageId}/status`, 'PUT', {
      statut: 'validé'
    });
    if (test4.success) {
      log(`✓ Succès - Statut mis à jour: ${test4.data.statut}`, 'green');
      testsPassed++;
    } else {
      log(`✗ Échec - ${test4.error}`, 'red');
      testsFailed++;
    }
  }

  // Test 5: Obtenir les statistiques
  log('\nTest 5: GET /api/stages/stats/summary - Statistiques', 'blue');
  const test5 = await makeRequest('/stages/stats/summary');
  if (test5.success) {
    log(`✓ Succès - Statistiques récupérées`, 'green');
    console.log('  Stats:', test5.data);
    testsPassed++;
  } else {
    log(`✗ Échec - ${test5.error}`, 'red');
    testsFailed++;
  }

  // Test 6: Supprimer le stage de test
  if (createdStageId) {
    log(`\nTest 6: DELETE /api/stages/${createdStageId} - Supprimer le stage de test`, 'blue');
    const test6 = await makeRequest(`/stages/${createdStageId}`, 'DELETE');
    if (test6.success) {
      log(`✓ Succès - Stage supprimé`, 'green');
      testsPassed++;
    } else {
      log(`✗ Échec - ${test6.error}`, 'red');
      testsFailed++;
    }
  }

  // Test 7: Vérifier que le stage est bien supprimé
  if (createdStageId) {
    log(`\nTest 7: GET /api/stages/${createdStageId} - Vérifier la suppression`, 'blue');
    const test7 = await makeRequest(`/stages/${createdStageId}`);
    if (!test7.success && test7.status === 404) {
      log(`✓ Succès - Stage introuvable (supprimé)`, 'green');
      testsPassed++;
    } else {
      log(`✗ Échec - Le stage existe encore`, 'red');
      testsFailed++;
    }
  }

  // Résumé
  log('\n' + '='.repeat(50), 'cyan');
  log(`\n📊 RÉSUMÉ DES TESTS`, 'cyan');
  log(`Tests réussis: ${testsPassed}`, 'green');
  log(`Tests échoués: ${testsFailed}`, testsFailed > 0 ? 'red' : 'green');
  log(`Total: ${testsPassed + testsFailed}\n`, 'cyan');

  if (testsFailed === 0) {
    log('🎉 Tous les tests sont passés avec succès!', 'green');
  } else {
    log('⚠️  Certains tests ont échoué. Vérifiez que:', 'yellow');
    log('  - Le serveur backend est démarré (npm run dev)', 'yellow');
    log('  - MySQL est en cours d\'exécution', 'yellow');
    log('  - La base de données est initialisée (npm run init-db)', 'yellow');
  }
  
  log('\n' + '='.repeat(50) + '\n', 'cyan');
}

// Vérifier que le serveur est accessible
async function checkServer() {
  try {
    const response = await fetch('http://localhost:5000/');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

// Exécution
(async () => {
  log('🔍 Vérification de la connexion au serveur...', 'yellow');
  
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    log('❌ Le serveur n\'est pas accessible sur http://localhost:5000', 'red');
    log('Assurez-vous que le backend est démarré:', 'yellow');
    log('  cd backend && npm run dev\n', 'cyan');
    process.exit(1);
  }
  
  log('✓ Serveur accessible\n', 'green');
  
  await runTests();
})();
