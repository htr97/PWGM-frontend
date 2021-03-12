export interface GetMaintenance {
  id: number;
  deviceName: string;
  startDate: Date;
  endDate: Date;
  userName: string;
  company: string;
  priority: string;
  problem: string;
  maintenanceType: string;
  description: string;
}
