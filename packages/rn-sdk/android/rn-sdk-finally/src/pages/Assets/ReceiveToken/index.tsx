import React from 'react';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { TextL, TextM, TextXL, TextS } from '@portkey/rn-sdk/src/components/CommonText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import CommonAvatar from '@portkey/rn-sdk/src/components/CommonAvatar';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import { formatChainInfoToShow } from '@portkey/rn-sdk/src/packages/utils';
import AccountCard from '@portkey/rn-sdk/src/components/AccountCard';
import { copyText } from '@portkey/rn-sdk/src/utils/commonUtil';
import { useSymbolImages } from '@portkey/rn-sdk/src/components/TokenOverlay/hooks';
import { NetworkType } from '@portkey/rn-sdk/src/packages/types';

export default function ReceiveTokenPage(props: {
  token: string;
  currentNetwork: NetworkType;
  currentCaAddress: string;
  defaultToken: string;
}) {
  const { t } = useLanguage();
  const { token, currentNetwork, currentCaAddress, defaultToken: defaultTokenJSONStr } = props;
  let tokenObj;
  if (typeof token === 'string') {
    tokenObj = JSON.parse(token);
  } else {
    tokenObj = token;
  }
  let defaultToken;
  if (typeof defaultTokenJSONStr === 'string') {
    defaultToken = JSON.parse(defaultTokenJSONStr);
  } else {
    defaultToken = defaultTokenJSONStr;
  }
  const { chainId, symbol } = tokenObj;
  const symbolImages = useSymbolImages();

  return (
    <PageContainer titleDom={t('Receive')} safeAreaColor={['blue', 'gray']} containerStyles={styles.containerStyles}>
      <TextXL style={styles.tips}>{t('You can provide QR code to receive')}</TextXL>
      <View style={styles.topWrap}>
        <CommonAvatar
          hasBorder
          style={styles.svgStyle}
          title={symbol}
          avatarSize={pTd(32)}
          svgName={symbol === defaultToken.symbol ? 'elf-icon' : undefined}
          imageUrl={symbolImages?.[symbol] || ''}
        />
        <View>
          <TextL>{symbol}</TextL>
          <TextS>{formatChainInfoToShow(chainId, currentNetwork)}</TextS>
        </View>
      </View>

      <AccountCard
        toCaAddress={`ELF_${currentCaAddress}_${chainId}`}
        tokenInfo={tokenObj}
        style={styles.accountCardStyle}
      />

      <View style={styles.buttonWrap}>
        <TouchableOpacity
          style={styles.buttonTop}
          onPress={() => {
            const tmpStr = `ELF_${currentCaAddress}_${chainId}`;
            copyText(tmpStr);
          }}>
          <Svg icon="copy" size={pTd(20)} color={defaultColors.font2} />
        </TouchableOpacity>
        <TextM style={styles.buttonText}>{t('Copy')}</TextM>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  containerStyles: {
    backgroundColor: defaultColors.bg4,
  },
  tips: {
    marginTop: pTd(49),
    width: '100%',
    color: defaultColors.font5,
    textAlign: 'center',
  },
  topWrap: {
    ...GStyles.flexRowWrap,
    marginTop: pTd(20),
    height: pTd(38),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgStyle: {
    marginRight: pTd(8),
    fontSize: pTd(16),
  },

  accountCardStyle: {
    marginTop: pTd(40),
    // width: pTd(280),
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonTop: {
    marginTop: pTd(40),
    width: pTd(48),
    height: pTd(48),
    borderRadius: pTd(48),
    backgroundColor: defaultColors.bg5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: defaultColors.font4,
    textAlign: 'center',
    marginTop: pTd(4),
    fontSize: pTd(14),
    lineHeight: pTd(20),
  },
});
