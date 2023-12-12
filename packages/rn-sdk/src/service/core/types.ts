const TYPES = {
  AccountModule: Symbol.for('AccountModule'),
  UIManagerModule: Symbol.for('UIManagerModule'),
};
export { TYPES };

export enum WalletState {
  NONE,
  LOCKED,
  UNLOCKED,
}
