import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useChannel,
  useHideChannel,
  useIMChannelListNetMapState,
  useIMGroupInfoMapNetMapState,
  useRelationId,
} from '.';
import im, {
  ChannelInfo,
  ChannelItem,
  ChannelMemberInfo,
  ChannelStatusEnum,
  ChannelTypeEnum,
  SocketMessage,
} from '@portkey-wallet/im';
import { useAppCommonDispatch } from '../../index';
import {
  addChannel,
  addChannelMembers,
  removeChannelMembers,
  setGroupInfo,
  transferChannelOwner,
  updateChannelAttribute,
  updateGroupInfo,
} from '@portkey-wallet/store/store-ca/im/actions';
import { useCurrentNetworkInfo } from '../network';
import { sleep } from '@portkey-wallet/utils';

export const useDisbandChannel = (channelId: string) => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();
  const hideChannel = useHideChannel();

  const disbandChannel = useCallback(async () => {
    await im.service.disbandChannel({ channelUuid: channelId });
    dispatch(
      updateChannelAttribute({
        network: networkType,
        channelId,
        value: {
          status: ChannelStatusEnum.DISBAND,
        },
      }),
    );
    await sleep(100);

    await hideChannel(channelId);
  }, [channelId, dispatch, hideChannel, networkType]);

  return disbandChannel;
};

export const useTransferChannelOwner = (channelId: string) => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();

  return useCallback(
    async (relationId: string) => {
      await im.service.transferChannelOwner({
        channelUuid: channelId,
        relationId,
      });

      dispatch(
        transferChannelOwner({
          network: networkType,
          channelId,
          relationId,
        }),
      );
    },
    [channelId, dispatch, networkType],
  );
};

export const useAddChannelMembers = (channelId: string) => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();

  return useCallback(
    async (memberInfos: ChannelMemberInfo[]) => {
      await im.service.addChannelMembers({
        channelUuid: channelId,
        members: memberInfos.map(item => item.relationId),
      });

      dispatch(
        addChannelMembers({
          network: networkType,
          channelId,
          memberInfos,
        }),
      );
    },
    [channelId, dispatch, networkType],
  );
};

export const useRemoveChannelMembers = (channelId: string) => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();

  return useCallback(
    async (members: string[]) => {
      await im.service.removeChannelMembers({
        channelUuid: channelId,
        members,
      });

      dispatch(
        removeChannelMembers({
          network: networkType,
          channelId,
          members,
        }),
      );
    },
    [channelId, dispatch, networkType],
  );
};

export const useLeaveChannel = () => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();
  const hideChannel = useHideChannel();

  const leaveChannel = useCallback(
    async (channelId: string) => {
      await im.service.leaveChannel({
        channelUuid: channelId,
      });

      dispatch(
        updateChannelAttribute({
          network: networkType,
          channelId,
          value: {
            status: ChannelStatusEnum.LEFT,
          },
        }),
      );

      await sleep(100);
      await hideChannel(channelId);
    },
    [dispatch, hideChannel, networkType],
  );

  return leaveChannel;
};

export const useUpdateChannelName = () => {
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();

  const updateChannelName = useCallback(
    async (channelId: string, name: string) => {
      await im.service.updateChannelName({
        channelUuid: channelId,
        channelName: name,
      });

      dispatch(
        updateChannelAttribute({
          network: networkType,
          channelId,
          value: {
            displayName: name,
          },
        }),
      );

      dispatch(
        updateGroupInfo({
          network: networkType,
          channelId,
          value: {
            name,
          },
        }),
      );
    },
    [dispatch, networkType],
  );

  return updateChannelName;
};

export const useGroupChannelInfo = (channelId: string, isInit = false) => {
  const { networkType } = useCurrentNetworkInfo();
  const dispatch = useAppCommonDispatch();

  const groupInfoMapNetMap = useIMGroupInfoMapNetMapState();
  const groupInfo = useMemo<ChannelInfo | undefined>(
    () => groupInfoMapNetMap?.[networkType]?.[channelId],
    [channelId, groupInfoMapNetMap, networkType],
  );

  const relationId = useRelationId();

  const refresh = useCallback(async () => {
    const { data: groupInfo } = await im.service.getChannelInfo({
      channelUuid: channelId,
    });
    dispatch(
      setGroupInfo({
        network: networkType,
        groupInfo,
      }),
    );
  }, [channelId, dispatch, networkType]);

  const isAdmin = useMemo(() => {
    if (!groupInfo || !relationId) return false;
    if (groupInfo.type !== ChannelTypeEnum.GROUP) return false;
    const adminMember = groupInfo.members[0];
    return adminMember && adminMember.relationId === relationId;
  }, [groupInfo, relationId]);

  useEffect(() => {
    isInit && refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    groupInfo,
    isAdmin,
    refresh,
  };
};

export const useGroupChannel = (channelId: string) => {
  const channel = useChannel(channelId);
  const { groupInfo, isAdmin, refresh: refreshGroupInfo } = useGroupChannelInfo(channelId, true);
  const disband = useDisbandChannel(channelId);
  const dispatch = useAppCommonDispatch();
  const { networkType } = useCurrentNetworkInfo();

  const updateList = useCallback(
    (e: any) => {
      const rawMsg: SocketMessage = e['im-message'];
      if (rawMsg.type !== 'SYS') return;
      console.log('receive SYS msg');
      const content = rawMsg.content;

      if (content.indexOf('changed the group name to') > 0) {
        const name = content.split('changed the group name to')[1].trim();
        dispatch(
          updateGroupInfo({
            network: networkType,
            channelId,
            value: {
              name,
            },
          }),
        );

        dispatch(
          updateChannelAttribute({
            network: networkType,
            channelId,
            value: {
              displayName: name,
            },
          }),
        );
        return;
      }
    },
    [channelId, dispatch, networkType],
  );
  const updateListRef = useRef(updateList);
  updateListRef.current = updateList;

  useEffect(() => {
    const { remove: removeMsgObserver } = im.registerChannelMsgObserver(channelId, e => {
      updateListRef.current(e);
    });
    return removeMsgObserver;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...channel,
    groupInfo,
    refreshGroupInfo,
    disband,
    isAdmin,
  };
};

export const useJoinGroupChannel = () => {
  const { networkType } = useCurrentNetworkInfo();
  const dispatch = useAppCommonDispatch();
  const channelListNetMap = useIMChannelListNetMapState();
  const list = useMemo(() => channelListNetMap?.[networkType]?.list || [], [channelListNetMap, networkType]);
  const listRef = useRef(list);
  listRef.current = list;

  const join = useCallback(
    async (channelId: string) => {
      await im.service.joinChannel({
        channelUuid: channelId,
      });
      await sleep(1000);
      if (listRef.current.find(item => item.channelUuid === channelId)) {
        console.log('joinGroupChannel addChannel exist');
        return;
      }
      const channel: ChannelItem = {
        status: ChannelStatusEnum.NORMAL,
        channelUuid: channelId,
        displayName: '',
        channelIcon: '',
        channelType: ChannelTypeEnum.GROUP,
        unreadMessageCount: 1,
        mentionsCount: 0,
        lastMessageType: 'SYS',
        lastMessageContent: '',
        lastPostAt: `${Date.now()}`,
        mute: false,
        pin: false,
        pinAt: '0',
      };

      dispatch(
        addChannel({
          network: networkType,
          channel,
        }),
      );

      (async () => {
        try {
          const { data: channelInfo } = await im.service.getChannelInfo({
            channelUuid: channelId,
          });
          dispatch(
            updateChannelAttribute({
              network: networkType,
              channelId,
              value: {
                displayName: channelInfo.name,
                channelIcon: channelInfo.icon,
              },
            }),
          );
          console.log('joinGroupChannel refreshChannelInfo');
        } catch (error) {
          console.log('joinGroupChannel getChannelInfo: error', error);
        }
      })();

      console.log('joinGroupChannel success');
    },
    [dispatch, networkType],
  );

  return join;
};
