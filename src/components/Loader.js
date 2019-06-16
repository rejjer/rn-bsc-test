import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { colors } from '../constants/'

const Loader = () => (
  <View style={styles.wrapper}>
    <ActivityIndicator animating color={colors.BLACK} size="large" />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE_20,
  },
})

export default Loader
