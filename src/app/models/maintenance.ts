export interface Maintenance {
  startDate: Date;
  endDate: Date;
  description: string
  maintenanceTypeId: number;
  priorityId: number;
  userEmail: string;
  problemId: number;
  equipmentId: number;
}
