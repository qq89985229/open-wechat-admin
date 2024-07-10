export interface ILatestAuditStatus{
  auditId: number;
  status: number;
  reason: string | null;
  screenShot: string | null;
  userVersion: string;
  userDesc: string;
  submitAuditTime: number;
  success: boolean;
}
