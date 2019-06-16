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
import ListItem from '../components/ListItem'
import Loader from '../components/Loader'
import { colors } from '../constants'

class TabList extends Component {
  static propTypes = {
    requestSymbols: PropTypes.func.isRequired,
    changeSymbolsFilter: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    data: PropTypes.array,
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

  _renderItem = ({ item: { symbol = '', name = '' } }) => {
    return <ListItem name={name} symbol={symbol} />
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
    const { data, isFetching } = this.props
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
          refreshing={isFetching}
          data={data}
          maxToRenderPerBatch={50}
          updateCellsBatchingPeriod={10}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          getItemLayout={this._getItemLayout}
        />
        {!!isFetching && <Loader />}
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
  isFetching: symbolsSelectors.getIsFetching,
  data: symbolsSelectors.getFilteredData,
})

const mapDispatchToProps = {
  requestSymbols,
  changeSymbolsFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabList)
