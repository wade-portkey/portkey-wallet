import React, { FC, useMemo, useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';

export const RNTabView = (config: UseTabConfig) => {
  const { tabs } = config;
  const [index, setIndex] = useState(0);
  const [routes] = useState(tabs.map(item => ({ key: item.key, title: item.title })));
  const sceneMap = useMemo(() => {
    const sceneProps: SceneMap = {};
    tabs.forEach(item => {
      sceneProps[item.key] = item.component;
    });
    return SceneMap(sceneProps);
  }, [tabs]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={sceneMap}
      onIndexChange={setIndex}
      initialLayout={{ width: 0, height: 0 }}
    />
  );
};

export interface UseTabConfig {
  tabs: TabProps[];
  defaultTab?: string;
}

interface SceneMap {
  [key: string]: FC;
}

export interface TabProps {
  key: string;
  title: string;
  component: FC;
}
