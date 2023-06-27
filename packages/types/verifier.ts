export enum VerifyStatus {
  NotVerified = 'NotVerified',
  Verifying = 'Verifying',
  Verified = 'Verified',
}

export interface VerifierItem {
  id: string; // aelf.Hash
  name: string;
  imageUrl: string;
  endPoints: string[];
  verifierAddresses: string[];
}

// 0: register, 1: community recovery, 2: Add Guardian 3: Set LoginAccount 4: addManager
export enum VerificationType {
  register,
  communityRecovery,
  addGuardian,
  setLoginAccount,
  addManager,
  editGuardian,
  removeOtherManager,
  addGuardianByApprove,
  deleteGuardian,
}

export enum ApprovalType {
  communityRecovery,
  addGuardian,
  deleteGuardian,
  editGuardian,
  removeOtherManager,
}

export enum RecaptchaType {
  register = 0,
  communityRecovery = 1,
  optGuardian = 2,
}

// Indicates the type of operation to generate a signature file
export enum VerifierCodeOperationType {
  unknown = 0,
  register = 1,
  communityRecovery = 2,
  addGuardian = 3,
  removeGuardian = 4,
  editGuardian = 5,
  removeOtherManager = 6,
}

export interface VerifierInfo {
  verifierId: string;
  verificationDoc: string;
  signature: string;
}

export interface AuthenticationInfo {
  [userId: string]: string;
}
