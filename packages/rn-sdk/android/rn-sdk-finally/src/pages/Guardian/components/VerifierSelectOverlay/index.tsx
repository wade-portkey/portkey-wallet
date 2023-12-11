import React from 'react';
import OverlayModal from '@portkey/rn-sdk/src/components/OverlayModal';
import { Keyboard, ScrollView, View } from 'react-native';
import Touchable from '@portkey/rn-sdk/src/components/Touchable';
import styles from '@portkey/rn-sdk/src/pages/Guardian/components/VerifierSelectOverlay/styles';
import Svg from '@portkey/rn-sdk/src/components/Svg';
import { TextL } from '@portkey/rn-sdk/src/components/CommonText';
import { pTd } from '@portkey/rn-sdk/src/utils/unit';
import { useLanguage } from '@portkey/rn-sdk/src/i18n/hooks';
import { VerifierImage } from '@portkey/rn-sdk/src/pages/Guardian/components/VerifierImage';
import { ModalBody } from '@portkey/rn-sdk/src/components/ModalBody';

type ValueType = string | number;
type DefaultValueType = string;

type ItemTypeBase<T extends ValueType = DefaultValueType> = {
  id: T;
  [key: string]: any;
};

type SelectListProps<ItemType extends ItemTypeBase<ItemValueType>, ItemValueType extends ValueType> = {
  id?: ItemValueType;
  list: Array<ItemType>;
  callBack: (item: ItemType) => void;
  labelAttrName?: string;
};

const SelectList = <ItemType extends ItemTypeBase<ItemValueType>, ItemValueType extends ValueType>({
  list,
  callBack,
  id,
  labelAttrName = 'id',
}: SelectListProps<ItemType, ItemValueType>) => {
  const { t } = useLanguage();

  return (
    <ModalBody title={t('Select verifiers')} modalBodyType="bottom">
      <ScrollView alwaysBounceVertical={false}>
        {list.map(item => {
          return (
            <Touchable
              key={item.id}
              onPress={() => {
                OverlayModal.hide();
                callBack(item);
              }}>
              <View style={styles.itemRow}>
                <VerifierImage
                  label={item[labelAttrName]}
                  style={styles.verifierImageStyle}
                  size={pTd(35.5)}
                  uri={item.imageUrl}
                />
                <View style={styles.itemContent}>
                  <TextL>{item[labelAttrName]}</TextL>
                  {id !== undefined && id === item.id && (
                    <Svg iconStyle={styles.itemIcon} icon="selected" size={pTd(24)} />
                  )}
                </View>
              </View>
            </Touchable>
          );
        })}
      </ScrollView>
    </ModalBody>
  );
};

const showList = <ItemType extends ItemTypeBase<ItemValueType>, ItemValueType extends ValueType = DefaultValueType>(
  params: SelectListProps<ItemType, ItemValueType>,
) => {
  Keyboard.dismiss();
  OverlayModal.show(<SelectList<ItemType, ItemValueType> {...params} />, {
    position: 'bottom',
  });
};

export default {
  showList,
};
