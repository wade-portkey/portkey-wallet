import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PageContainer from 'components/PageContainer';
import { defaultColors } from 'assets/theme';
import GStyles from 'assets/theme/GStyles';
import { pTd } from 'utils/unit';
import { TextL } from 'components/CommonText';
import Chats from '../components/Chats';
import Svg from 'components/Svg';
import Touchable from 'components/Touchable';
import ChatOverlay from '../components/ChatOverlay';
import navigationService from 'utils/navigationService';
import { ChatOperationsEnum } from '@portkey-wallet/constants/constants-ca/chat';
import CommonAvatar from 'components/CommonAvatar';
import { FontStyles } from 'assets/theme/styles';
import AddContactButton from '../components/AddContactButton';
import useRouterParams from '@portkey-wallet/hooks/useRouterParams';
import { ChannelItem } from '@portkey-wallet/im/types';
import {
  useMuteChannel,
  usePinChannel,
  useHideChannel,
  useChannelItemInfo,
  useIsStranger,
  useAddStranger,
} from '@portkey-wallet/hooks/hooks-ca/im';
import ActionSheet from 'components/ActionSheet';
import { useCurrentChannelId } from '../context/hooks';
import CommonToast from 'components/CommonToast';
import { handleErrorMessage } from '@portkey-wallet/utils';
import { fetchContactListAsync } from '@portkey-wallet/store/store-ca/contact/actions';
import { useAppCommonDispatch } from '@portkey-wallet/hooks';
import useLockCallback from '@portkey-wallet/hooks/useLockCallback';
import Loading from 'components/Loading';

type RouterParams = {
  channelInfo?: ChannelItem;
};

const ChatDetails = () => {
  const { channelInfo } = useRouterParams<RouterParams>() || {};
  const dispatch = useAppCommonDispatch();

  const pinChannel = usePinChannel();
  const muteChannel = useMuteChannel();
  const hideChannel = useHideChannel();
  const addStranger = useAddStranger();

  const currentChannelId = useCurrentChannelId();
  const currentChannelInfo = useChannelItemInfo(currentChannelId || '');

  const toRelationId = useMemo(
    () => currentChannelInfo?.toRelationId || channelInfo?.toRelationId,
    [channelInfo?.toRelationId, currentChannelInfo?.toRelationId],
  );
  const isStranger = useIsStranger(currentChannelInfo?.toRelationId || channelInfo?.toRelationId || '');
  const displayName = useMemo(
    () => currentChannelInfo?.displayName || channelInfo?.displayName,
    [channelInfo?.displayName, currentChannelInfo?.displayName],
  );
  const pin = useMemo(() => currentChannelInfo?.pin || channelInfo?.pin, [channelInfo?.pin, currentChannelInfo?.pin]);
  const mute = useMemo(
    () => currentChannelInfo?.mute || channelInfo?.mute,
    [channelInfo?.mute, currentChannelInfo?.mute],
  );

  const onPressMore = useCallback(
    (event: { nativeEvent: { pageX: any; pageY: any } }) => {
      const { pageX, pageY } = event.nativeEvent;
      ChatOverlay.showChatPopover({
        list: [
          {
            title: ChatOperationsEnum.PROFILE,
            iconName: 'chat-profile',
            onPress: () => {
              navigationService.navigate('ChatContactProfile', {
                relationId: toRelationId,
                contact: {
                  name: currentChannelInfo?.displayName,
                },
              });
            },
          },
          {
            title: pin ? ChatOperationsEnum.UNPIN : ChatOperationsEnum.PIN,
            iconName: pin ? 'chat-unpin' : 'chat-pin',
            onPress: () => {
              pinChannel(currentChannelId || '', !pin);
            },
          },
          {
            title: mute ? ChatOperationsEnum.UNMUTE : ChatOperationsEnum.MUTE,
            iconName: mute ? 'chat-unmute' : 'chat-mute',
            onPress: () => {
              muteChannel(currentChannelId || '', !mute);
            },
          },
          {
            title: ChatOperationsEnum.DELETE_CHAT,
            iconName: 'chat-delete',
            onPress: () => {
              ActionSheet.alert({
                title: 'Delete chat?',
                buttons: [
                  {
                    title: 'Cancel',
                    type: 'outline',
                  },
                  {
                    title: 'Confirm',
                    type: 'primary',
                    onPress: async () => {
                      try {
                        Loading.show();
                        await hideChannel(currentChannelId || '');
                        Loading.hide();
                        navigationService.navigate('Tab');
                      } catch (error) {
                        Loading.hide();
                        console.log(error);
                      }
                    },
                  },
                ],
              });
            },
          },
        ],
        px: pageX,
        py: pageY,
        formatType: 'dynamicWidth',
      });
    },
    [currentChannelId, currentChannelInfo?.displayName, hideChannel, mute, muteChannel, pin, pinChannel, toRelationId],
  );

  const addContact = useLockCallback(async () => {
    try {
      await addStranger(toRelationId || '');
      CommonToast.success('Add Success');
      dispatch(fetchContactListAsync());
    } catch (error) {
      CommonToast.fail(handleErrorMessage(error));
    }
  }, [addStranger, dispatch, toRelationId]);

  return (
    <PageContainer
      noCenterDom
      hideTouchable
      safeAreaColor={['blue', 'gray']}
      scrollViewProps={{ disabled: true }}
      containerStyles={styles.container}
      leftCallback={() => navigationService.navigate('ChatHome')}
      leftDom={
        <View style={[GStyles.flexRow, GStyles.itemCenter, GStyles.paddingLeft(pTd(16))]}>
          <Touchable style={GStyles.marginRight(pTd(20))} onPress={navigationService.goBack}>
            <Svg size={pTd(20)} icon="left-arrow" color={defaultColors.bg1} />
          </Touchable>
          <CommonAvatar title={displayName} avatarSize={pTd(32)} style={styles.headerAvatar} />
          <TextL style={[FontStyles.font2, GStyles.marginRight(pTd(4)), GStyles.marginLeft(pTd(8))]}>
            {displayName}
          </TextL>
          {mute && <Svg size={pTd(16)} icon="chat-mute" color={defaultColors.bg1} />}
        </View>
      }
      rightDom={
        <Touchable style={GStyles.marginRight(pTd(16))} onPress={onPressMore}>
          <Svg size={pTd(20)} icon="more" color={defaultColors.bg1} />
        </Touchable>
      }>
      <AddContactButton isStranger={isStranger} onPressButton={addContact} />
      <Chats />
    </PageContainer>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: defaultColors.bg4,
    flex: 1,
    ...GStyles.paddingArg(0),
  },
  headerAvatar: {
    fontSize: pTd(14),
  },
});
