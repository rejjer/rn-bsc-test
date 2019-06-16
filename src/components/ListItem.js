import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { style, colors, images } from '../constants'

class ListItem extends PureComponent {
  static propTypes = {
    favoriteItem: PropTypes.bool,
    symbol: PropTypes.string,
    name: PropTypes.string,
    isFavorite: PropTypes.bool,
    onPressFavorite: PropTypes.func.isRequired,
    latestPrice: PropTypes.number,
    delayedPrice: PropTypes.number,
    extendedPrice: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
  }

  static defaultProps = {
    favoriteItem: false,
  }

  _onPressFavorite = () => {
    const { symbol, name, onPressFavorite } = this.props
    onPressFavorite && onPressFavorite(symbol, name)
  }

  render() {
    const {
      symbol,
      name,
      isFavorite,
      favoriteItem,
      latestPrice,
      delayedPrice,
      extendedPrice,
      high,
      low,
    } = this.props
    return (
      <TouchableOpacity
        style={[styles.container, !favoriteItem && styles.containerFixed]}
        onPress={this._onPressFavorite}
      >
        <View style={styles.star}>
          <Image
            source={
              isFavorite
                ? images.CONTROL_FAVORITE_SELECTED
                : images.CONTROL_FAVORITE
            }
          />
        </View>
        <View>
          <Text style={styles.symbol} numberOfLines={favoriteItem ? 0 : 1}>
            {symbol}
          </Text>
          <Text style={styles.description} numberOfLines={favoriteItem ? 0 : 1}>
            {name}
          </Text>
          {!!favoriteItem && (
            <View>
              {!!latestPrice && (
                <Text style={styles.description}>
                  {`Latest price: ${latestPrice}`}
                </Text>
              )}
              {!!extendedPrice && (
                <Text style={styles.description}>
                  {`Extended price: ${extendedPrice}`}
                </Text>
              )}
              {!!delayedPrice && (
                <Text style={styles.description}>
                  {`Delayed price: ${delayedPrice}`}
                </Text>
              )}
              {!!high && (
                <Text style={styles.description}>
                  {`Highest price: ${high}`}
                </Text>
              )}
              {!!low && (
                <Text style={styles.description}>{`Lowest price: ${low}`}</Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  containerFixed: {
    height: 44,
  },
  star: {
    paddingRight: 8,
  },
  symbol: {
    ...style.text,
    color: colors.BLACK,
  },
  description: {
    ...style.text,
    color: colors.GRAY,
  },
})

export default ListItem
