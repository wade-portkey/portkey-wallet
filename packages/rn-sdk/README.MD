## Installation

**Step 1: Install npm package**

```
npm install @portkey/rn-sdk --save
or
yarn add @portkey/rn-sdk
```
<br>

**Step 2: Create .env file** <br>
In order to use Google login, You need to create an **.env** file in the same directory as **package.json**, the file  must contain **GOOGLE_WEB_CLIENT_ID**, **GOOGLE_IOS_CLIENT_ID**,**GOOGLE_ANDROID_CLIENT_ID**
```
# .env file
GOOGLE_WEB_CLIENT_ID="your google web client id"
GOOGLE_IOS_CLIENT_ID = "your google ios client id"
GOOGLE_ANDROID_CLIENT_ID = "your google android client id"
```

**Step 3: Init**
```
// Please import the following statement in your entry file
import '@portkey/rn-sdk';
```
> Note: We use autolink, so you don't need to configure any Android/IOS dependencies. But you need to recompile your Android/IOS project so that the autolink takes effect.

Now, all configuration is complete and you can use the portkey service freely.

## Usage
```
import { portkey } from '@portkey/rn-sdk';
// get walletInfo
const walletInfo = await portkey.getWalletInfo();
// open assets dashboard
portkey.openAssetsDashboard();
```

## Function Introduction
```
import { portkey } from '@portkey/rn-sdk';

// Open login page and return UnlockedWallet object after login
function login(): Promise<UnlockedWallet | undefined>;

// Open assets dashboard
function openAssetsDashboard();

// Open guardians manager page
function guardiansManager();

// Open settings manager page
function settingsManager();

// Open payment security manager page
function paymentSecurityManager();

// Unlock wallet and return UnlockedWallet object
function unlockWallet(): Promise<UnlockedWallet | undefined>;

// Call contract method
function callCaContractMethod(props: CallCaMethodProps): Promise<BaseMethodResult>;

// Get wallet info
function getWalletInfo(): Promise<UnlockedWallet>;

// Get wallet state
function getWalletState(): Promise<WalletState>();

// Lock wallet
function lockWallet(): Promise<boolean>();

// Exit wallet
function exitWallet(): Promise<boolean>();
```

## Q&A



