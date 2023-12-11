import { bottomBarHeight } from '@portkey/rn-sdk/src/packages/utils/mobile/device';
import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import PageContainer from '@portkey/rn-sdk/src/components/PageContainer';
import { countryCodeFilter } from '@portkey/rn-sdk/src/packages/constants/constants-ca/country';
import GStyles from '@portkey/rn-sdk/src/assets/theme/GStyles';
import IndexBarLargeList from '@portkey/rn-sdk/src/components/CommonLargeList/IndexBarLargeList';
import CommonInput from '@portkey/rn-sdk/src/components/CommonInput';
import { CountryItem } from '@portkey/rn-sdk/src/packages/types/types-ca/country';
import { defaultColors } from '@portkey/rn-sdk/src/assets/theme';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { TextL, TextM } from '@portkey/rn-sdk/src/components/CommonText';
import { FontStyles } from '@portkey/rn-sdk/src/assets/theme/styles';
import NoData from '@portkey/rn-sdk/src/components/NoData';
import { headerHeight } from '@portkey/rn-sdk/src/components/CustomHeader/style/index.style';
import { getCountryCodeIndex } from '@portkey/rn-sdk/src/packages/constants/constants-ca/country';
import useEffectOnce from '@portkey/rn-sdk/src/hooks/useEffectOnce';
import { getCachedCountryCodeData } from '@portkey/rn-sdk/src/model/global';
import { GlobalStorage } from '@portkey/rn-sdk/src/service/storage';
import { CURRENT_USING_COUNTRY_CODE } from '@portkey/rn-sdk/src/model/global';

const IndexHeight = 56,
  SectionHeight = 20;

export default function SelectCountry({
  selectCountry,
  navigateBack,
}: {
  selectCountry?: CountryItem;
  navigateBack: (item: CountryItem | null | undefined) => void;
}) {
  const [phoneCountryCodeList, setPhoneCountryCodeList] = useState<CountryItem[]>([]);
  const [List, setList] = useState<{ index: string; items: CountryItem[] }[]>();
  const [searchList, setSearchList] = useState<CountryItem[]>();
  useEffectOnce(() => {
    checkMMKVStorage();
  });

  const checkMMKVStorage = async () => {
    const countryCodeList = (await getCachedCountryCodeData())?.data;
    setPhoneCountryCodeList(countryCodeList);
    const codeIndex = getCountryCodeIndex(countryCodeList);
    const list = codeIndex.map(i => ({ index: i[0], items: i[1] }));
    setList(list);
  };

  const data = useMemo(() => searchList || List, [List, searchList]);
  const _renderItem = ({ section, row }: { section: number; row: number }) => {
    let item: CountryItem;
    if (!data) return <View />;
    if ('items' in data[section]) {
      item = (data[section] as { items: CountryItem[] }).items[row];
    } else {
      item = data[row] as CountryItem;
    }
    const isSelected = selectCountry?.code === item.code;
    return (
      <Touchable
        style={[styles.itemRow, GStyles.itemCenter, GStyles.spaceBetween]}
        onPress={() => {
          GlobalStorage.set(CURRENT_USING_COUNTRY_CODE, JSON.stringify(item));
          navigateBack(item);
        }}>
        <TextL style={isSelected ? FontStyles.font4 : null}>{item.country}</TextL>
        <TextM style={[FontStyles.font3, isSelected ? FontStyles.font4 : null]}>+ {item.code}</TextM>
      </Touchable>
    );
  };
  const _renderSection = (index: any) => {
    if (!List) return <View />;
    const contact = List[index];
    return (
      <View style={styles.sectionRow}>
        <TextL style={FontStyles.font7}>{contact.index}</TextL>
      </View>
    );
  };
  if (!data) {
    return <View />;
  }
  return (
    <PageContainer
      titleDom="Country/Region"
      safeAreaColor={['blue', 'white']}
      containerStyles={styles.containerStyles}
      leftCallback={() => {
        navigateBack(null);
      }}
      scrollViewProps={{ disabled: true }}>
      <View style={styles.inputContainerStyle}>
        <CommonInput
          placeholder="Search countries and regions"
          type="search"
          onChangeText={s => setSearchList(!s ? undefined : countryCodeFilter(s, phoneCountryCodeList))}
        />
      </View>
      <View style={styles.indexBarRow}>
        <IndexBarLargeList
          data={data}
          renderItem={_renderItem}
          indexHeight={IndexHeight}
          indexBarBoxStyle={styles.indexBarBoxStyle}
          sectionHeight={searchList ? 0 : SectionHeight}
          extraHeight={headerHeight + bottomBarHeight + 120}
          renderSection={searchList ? undefined : _renderSection}
          indexArray={
            searchList ? undefined : data.map(item => (item as { index: string; items: CountryItem[] }).index)
          }
          renderEmpty={() => <NoData topDistance={64} noPic message={'There is no search result.'} />}
        />
      </View>
    </PageContainer>
  );
}

export interface SelectCountryResult {
  result: string;
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    height: IndexHeight,
    paddingLeft: pTd(20),
    paddingRight: pTd(40),
  },
  sectionRow: {
    paddingHorizontal: pTd(20),
    height: SectionHeight,
    backgroundColor: defaultColors.bg1,
  },
  containerStyles: {
    ...GStyles.paddingArg(10, 0),
    backgroundColor: defaultColors.bg1,
    height: '100%',
  },
  inputContainerStyle: {
    marginBottom: 20,
    paddingHorizontal: pTd(20),
  },
  indexBarBoxStyle: {
    // top: 20,
    // bottom: screenHeight > 850 ? 100 : 60,
  },
  indexBarRow: {
    overflow: 'hidden',
    flex: 1,
  },
});
