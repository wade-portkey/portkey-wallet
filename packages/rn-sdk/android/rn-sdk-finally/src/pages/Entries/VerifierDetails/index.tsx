import { OperationTypeEnum, VerificationType } from '@portkey/rn-sdk/src/packages/types/verifier';
import { PortkeyEntries } from '@portkey/rn-sdk/src/config/entries';
import BaseContainer, { BaseContainerProps } from '@portkey/rn-sdk/src/model/container/BaseContainer';
import VerifierDetails from '@portkey/rn-sdk/src/pages/Guardian/VerifierDetails';
import React from 'react';
import { AccountOriginalType } from '@portkey/rn-sdk/src/model/verify/core';
import { GuardianConfig } from '@portkey/rn-sdk/src/model/verify/guardian';

export default class VerifierDetailsEntryPage extends BaseContainer<
  VerifierDetailsPageProps,
  VerifierDetailsPageState,
  VerifierDetailsPageResult
> {
  constructor(props: VerifierDetailsPageProps) {
    super(props);
    const { deliveredGuardianInfo } = props;
    if (!deliveredGuardianInfo) throw new Error('guardianConfig is null!');
    this.state = {
      guardianConfig: JSON.parse(deliveredGuardianInfo),
    };
  }

  getEntryName = (): string => PortkeyEntries.VERIFIER_DETAIL_ENTRY;

  render() {
    const { guardianConfig } = this.state;
    const { operationType = OperationTypeEnum.unknown } = this.props;
    const { accountIdentifier, accountOriginalType } = guardianConfig;
    return (
      <VerifierDetails
        accountIdentifier={accountIdentifier}
        accountOriginalType={accountOriginalType}
        guardianConfig={guardianConfig}
        operationType={operationType}
      />
    );
  }
}

export interface VerifierDetailsPageProps extends BaseContainerProps {
  verificationType: VerificationType;
  accountIdentifier: string;
  accountOriginalType: AccountOriginalType;
  deliveredGuardianInfo: string; // GuardianConfig
  operationType: OperationTypeEnum;
}

export interface VerifierDetailsPageState {
  guardianConfig: GuardianConfig;
}

export interface VerifierDetailsPageResult {
  verifiedData: string; // CheckVerifyCodeResultDTO
}
