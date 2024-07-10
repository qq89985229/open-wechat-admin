export interface ITemplate {
  draftId: number;
  templateId: number;
  userVersion: string;
  userDesc: string;
  templateType: number;
  createTime: number;
  sourceMiniProgramAppid: string;
  sourceMiniProgram: string;
  auditScene: string;
  auditStatus: string;
  reason: string;
  developer: string
}
