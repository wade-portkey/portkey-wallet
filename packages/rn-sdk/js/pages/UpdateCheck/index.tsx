import React, { Component } from 'react';

import { StyleSheet, Platform, Text, View, Alert, TouchableOpacity, Linking } from 'react-native';

import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
  downloadAndInstallApk,
  onPushyEvents,
  getCurrentVersionInfo,
} from 'react-native-update';

import _updateConfig from '../../../update.json';
const { appKey } = _updateConfig[Platform.OS];
onPushyEvents(({ type, data }) => {
  // 热更成功或报错的事件回调
  // 可上报自有或第三方数据统计服务
});

export default class UpdateCheckPage extends Component {
  state = {
    received: 0,
    total: 0,
    currentBundleVersion: '空',
  };
  componentDidMount() {
    if (isFirstTime) {
      // 必须调用此更新成功标记方法
      // 否则默认更新失败，下一次启动会自动回滚
      markSuccess();
      console.log('更新完成');
    } else if (isRolledBack) {
      console.log('刚刚更新失败了,版本被回滚.');
    }
    getCurrentVersionInfo().then(result => {
      this.setState({ currentBundleVersion: result.name });
    });
  }
  doUpdate = async info => {
    try {
      const hash = await downloadUpdate(info, {
        onDownloadProgress: ({ received, total }) => {
          this.setState({
            received,
            total,
          });
        },
      });
      if (!hash) {
        return;
      }
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {
          text: '是',
          onPress: () => {
            switchVersion(hash);
          },
        },
        { text: '否' },
        {
          text: '下次启动时',
          onPress: () => {
            switchVersionLater(hash);
          },
        },
      ]);
    } catch (err) {
      Alert.alert('更新失败', err.message);
    }
  };
  checkUpdate = async () => {
    if (__DEV__) {
      // 开发模式不支持热更新，跳过检查
      return;
    }
    let info;
    try {
      info = await checkUpdate(appKey);
    } catch (err) {
      Alert.alert('更新检查失败', err.message);
      return;
    }
    if (info.expired) {
      Alert.alert('提示', '您的应用版本已更新，点击确定下载安装新版本', [
        {
          text: '确定',
          onPress: () => {
            if (info.downloadUrl) {
              // apk可直接下载安装
              if (Platform.OS === 'android' && info.downloadUrl.endsWith('.apk')) {
                downloadAndInstallApk({
                  url: info.downloadUrl,
                  onDownloadProgress: ({ received, total }) => {
                    this.setState({
                      received,
                      total,
                    });
                  },
                });
              } else {
                Linking.openURL(info.downloadUrl);
              }
            }
          },
        },
      ]);
    } else if (info.upToDate) {
      Alert.alert('提示', '您的应用版本已是最新.');
    } else {
      Alert.alert('提示', '检查到新的版本' + info.name + ',是否下载?\n' + info.description, [
        {
          text: '是',
          onPress: () => {
            this.doUpdate(info);
          },
        },
        { text: '否' },
      ]);
    }
  };
  render() {
    const { received, total } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>欢迎使用热更新服务</Text>
        <Text style={styles.instructions}>
          这是版本一 {'\n'}
          当前原生包版本号: {packageVersion}
          {'\n'}
          当前热更新版本Hash: {currentVersion || '(空)'}
          {'\n'}
          当前热更新版本名: {this.state.currentBundleVersion || '(空)'}
        </Text>
        <Text>
          下载进度：{received} / {total}
        </Text>
        <TouchableOpacity onPress={this.checkUpdate}>
          <Text style={styles.instructions}>点击这里检查更新</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
