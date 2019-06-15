import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

class TabBlog extends Component {
  static propTypes = {}

  render() {
    return (
      <View style={styles.container}>
        <Text>TabFavorites</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default TabBlog
