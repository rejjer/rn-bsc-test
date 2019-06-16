import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'
import { style, colors } from '../constants'

class ListItem extends PureComponent {
  static propTypes = {
    symbol: PropTypes.string,
    name: PropTypes.string,
  }

  render() {
    const { symbol, name } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.symbol} numberOfLines={1}>
          {symbol}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  symbol: {
    ...style.text,
    color: colors.BLACK,
  },
  name: {
    ...style.text,
    color: colors.GRAY,
  },
})

export default ListItem
