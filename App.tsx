import React, {useEffect} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import HomeView from './src/views/HomeView';
import Intro from './src/views/Intro';
import {Provider} from 'react-redux';
import {store} from './src/store';
import CodePush from 'react-native-code-push';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    CodePush.sync({
      updateDialog: {
        title: 'New version',
        optionalInstallButtonLabel: 'Install',
        optionalIgnoreButtonLabel: 'Cancel',
        optionalUpdateMessage: 'The new version available',
      },
      installMode: CodePush.InstallMode.IMMEDIATE,
    });

    CodePush.checkForUpdate().then(res => {
      console.log('res: ', res);
    });
  }, []);

  return (
    <Provider store={store}>
      <View style={[backgroundStyle, styles.container]}>
        <Intro />
        <HomeView />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CodePush(App);
