import R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, FlatList } from 'react-native'
import {
  symbolsSelectors,
  requestSymbols,
  changeSymbolsFilter,
} from '../redux/symbols'
import {
  favoritesSelectors,
  addToFavorites,
  removeFromFavorites,
} from '../redux/favorites'
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'
import { colors } from '../constants'

class TabList extends Component {
  static propTypes = {
    requestSymbols: PropTypes.func.isRequired,
    changeSymbolsFilter: PropTypes.func.isRequired,
    symbolsIsFetching: PropTypes.bool,
    data: PropTypes.array,
    addToFavorites: PropTypes.func.isRequired,
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
    this.props.changeSymbolsFilter('')
    this.props.requestSymbols()
  }

  _onRefresh = () => {
    this.props.requestSymbols()
  }

  _onPressFavorite = (symbol, name) => {
    const { addToFavorites, removeFromFavorites } = this.props
    if (!this._isFavorite(symbol)) {
      addToFavorites({ symbol, name })
    } else {
      removeFromFavorites({ symbol })
    }
  }

  _isFavorite = symbol => {
    const { favoritesData } = this.props
    let result = false
    favoritesData.forEach(item => {
      if (item.symbol === symbol) {
        result = true
      }
    })
    return result
  }

  _renderItem = ({ item: { symbol = '', name = '' } }) => {
    return (
      <ListItem
        name={name}
        symbol={symbol}
        isFavorite={this._isFavorite(symbol)}
        onPressFavorite={this._onPressFavorite}
      />
    )
  }

  _keyExtractor = (item, index) => item.iexId || `${index}`

  _getItemLayout = (data, index) => ({
    length: 44,
    offset: 44 * index,
    index,
  })

  _onChangeText = text => {
    this.setState({ text }, () => this._requestFilterData())
  }

  _requestFilterData = () => {
    clearTimeout(this.filterTimeout)
    this.filterTimeout = setTimeout(() => {
      const { text } = this.state
      this.props.changeSymbolsFilter(text)
    }, 200)
  }

  render() {
    const { text } = this.state
    const {
      data,
      symbolsIsFetching,
      favoritesIsFetching,
      favoritesData,
    } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="name or title"
          value={text}
          onChangeText={this._onChangeText}
        />
        <FlatList
          onRefresh={this._onRefresh}
          refreshing={symbolsIsFetching}
          data={data}
          extraData={favoritesData}
          maxToRenderPerBatch={50}
          updateCellsBatchingPeriod={10}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          getItemLayout={this._getItemLayout}
        />
        {(symbolsIsFetching || favoritesIsFetching) && <Loader />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY,
    borderWidth: 1,
    margin: 8,
    padding: 8,
  },
})

const mapStateToProps = R.applySpec({
  symbolsIsFetching: symbolsSelectors.getIsFetching,
  data: symbolsSelectors.getFilteredData,
  favoritesIsFetching: favoritesSelectors.getIsFetching,
  favoritesData: favoritesSelectors.getData,
})

const mapDispatchToProps = {
  requestSymbols,
  changeSymbolsFilter,
  addToFavorites,
  removeFromFavorites,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabList)
