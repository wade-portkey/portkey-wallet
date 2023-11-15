import { GuardianVerifyConfig } from 'model/verify/social-recovery';
import { PortkeyEntries } from '../../../config/entries';
import BaseContainer, { BaseContainerProps } from '../../../model/container/BaseContainer';
import GuardianApproval from 'pages/Guardian/GuardianApproval';
import React from 'react';

export default class GuardianApprovalEntryPage extends BaseContainer<
  GuardianApprovalPageProps,
  GuardianApprovalPageState,
  GuardianApprovalPageResult
> {
  constructor(props: GuardianApprovalPageProps) {
    super(props);
    const { deliveredGuardianListInfo } = props;
    if (!deliveredGuardianListInfo) throw new Error('guardianConfig is null!');
    console.log('GuardianApprovalEntryPage', deliveredGuardianListInfo);
    const verifiedTime = new Date().getTime();
    this.state = {
      verifiedTime,
      config: JSON.parse(deliveredGuardianListInfo),
    };
  }

  getEntryName = (): string => PortkeyEntries.GUARDIAN_APPROVAL_ENTRY;

  onPageFinish = (result: GuardianApprovalPageResult) => {
    this.onFinish({
      status: result.isVerified ? 'success' : 'fail',
      data: result,
      animated: false,
    });
  };

  render() {
    const { config: socialRecoveryConfig, verifiedTime } = this.state;
    return (
      <>
        <GuardianApproval
          guardianListConfig={socialRecoveryConfig}
          verifiedTime={verifiedTime}
          onPageFinish={this.onPageFinish}
        />
      </>
    );
  }
}

export interface GuardianApprovalPageProps extends BaseContainerProps {
  deliveredGuardianListInfo: string; // SocialRecoveryConfig
}

export interface GuardianApprovalPageState {
  verifiedTime: number;
  config: GuardianVerifyConfig;
}

export interface GuardianApprovalPageResult {
  isVerified: boolean;
  deliveredVerifiedData?: string;
  errorMessage?: string;
}
