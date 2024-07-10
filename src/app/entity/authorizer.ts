export interface IAuthorizer {
  id: string;
  appId: string;
  authorizerInfo: {
    authorizationInfo: {
      authorizerAppid: string;
      authorizerAccessToken: string;
      expiresIn: number;
      authorizerRefreshToken: string;
      funcInfo: number[]
    };
    authorizerInfo: {
      nickName: string;
      headImg: string;
      serviceTypeInfo: number;
      verifyTypeInfo: number;
      userName: string;
      principalName: string;
      businessInfo: {
        open_pay: number;
        open_shake: number;
        open_scan: number;
        open_card: number;
        open_store: number
      };
      alias: string;
      qrcodeUrl: string;
      accountStatus: number;
      signature: string;
      miniProgramInfo: {
        visitStatus: number;
        network: {
          requestDomain: string[];
          wsRequestDomain: string[];
          uploadDomain: string[];
          downloadDomain: string[];
          bizDomain: []
        };
        categories: {
          first: string;
          second: string
        } []
      };
      registerType: number;
      basicConfig: {
        isPhoneConfigured: boolean;
        isEmailConfigured: boolean
      }
    };
    miniProgram: true
  };
  authTime: number;
  ext: any;
  createdAt: string
}
