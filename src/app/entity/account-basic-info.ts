export interface IAccountBasicInfo{
  appId: string;
  accountType: number;
  principalType: number;
  principalName: string;
  realnameStatus: number;
  nickname: string;
  wxVerifyInfo: {
    qualificationVerify: boolean;
    namingVerify: boolean;
    annualReview: boolean;
    annualReviewBeginTime: number;
    annualReviewEndTime: number;
  };
  signatureInfo: {
    signature: string;
    modifyUsedCount: number;
    modifyQuota: number;
  };
  headImageInfo: {
    headImageUrl: string;
    modifyUsedCount: number;
    modifyQuota: number;
  };
  nicknameInfo: {
    nickname: string;
    modifyUsedCount: number;
    modifyQuota: number;
  };
  registeredCountry: number;
  credential: string;
  customerType: number;
}
