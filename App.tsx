import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TicTacToe from './components/TicTacToe';  


const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TicTacToe />
    </SafeAreaView>
  );
};

export default App;
