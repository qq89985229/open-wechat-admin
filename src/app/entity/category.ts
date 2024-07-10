export interface ICategory{
  limit: number;
  quota: number;
  categoryLimit: number;
  categories: {
      first: number;
      firstName: string;
      second: number;
      secondName: string;
      auditStatus: number;
      auditReason: string
  }[];
}
