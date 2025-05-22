enum MaintenanceType {
  PREVENTIVE = 'PREVENTIVE', // Entretien régulier (vidange, filtres, etc.)
  CORRECTIVE = 'CORRECTIVE', // Réparation suite à panne ou problème détecté
  INSPECTION = 'INSPECTION', // Contrôle technique ou vérification périodique
}

enum MaintenanceStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export { MaintenanceStatus, MaintenanceType }
