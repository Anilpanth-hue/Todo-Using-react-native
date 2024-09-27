import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import TodoScreen from './src/screen/TodoScreen'

const App = () => {
  return (
    <SafeAreaView>
    <View>
      <TodoScreen />
    </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})