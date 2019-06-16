import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, FlatList } from 'react-native'
import {
  favoritesSelectors,
  requestQuotes,
  removeFromFavorites,
} from '../redux/favorites'
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'

class TabFavorites extends Component {
  static propTypes = {
    requestQuotes: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired,
    favoritesIsFetching: PropTypes.bool,
    favoritesData: PropTypes.array,
  }

  constructor(props) {
    super(props)

    this.state = {
      text: '',
    }
    this.filterTimeout = null
  }

  componentDidMount() {
    this._requestQuotesIfNeded()
  }

  _requestQuotesIfNeded = () => {
    const { favoritesData, requestQuotes } = this.props
    if (favoritesData.length) {
      requestQuotes()
    }
  }

  _onPressFavorite = symbol => {
    const { removeFromFavorites } = this.props
    removeFromFavorites({ symbol })
  }

  _renderItem = ({
    item: {
      symbol = '',
      name = '',
      latestPrice = 0,
      delayedPrice = 0,
      extendedPrice = 0,
      high = 0,
      low = 0,
    },
  }) => {
    return (
      <ListItem
        name={name}
        symbol={symbol}
        favoriteItem
        latestPrice={latestPrice}
        delayedPrice={delayedPrice}
        extendedPrice={extendedPrice}
        high={high}
        low={low}
        isFavorite
        onPressFavorite={this._onPressFavorite}
      />
    )
  }

  _keyExtractor = (item, index) => item.symbol || `${index}`

  render() {
    const { favoritesIsFetching, favoritesData } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={this._requestQuotesIfNeded}
          refreshing={favoritesIsFetching}
          data={favoritesData}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        {!!favoritesIsFetching && <Loader />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = R.applySpec({
  favoritesIsFetching: favoritesSelectors.getIsFetching,
  favoritesData: favoritesSelectors.getData,
})

const mapDispatchToProps = {
  requestQuotes,
  removeFromFavorites,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabFavorites)
