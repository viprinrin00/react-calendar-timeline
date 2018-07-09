import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { _get, arraysEqual} from '../utility/generic'
import Range from './Range'

export default class Ranges extends Component {
  static propTypes = {
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasTimeStart: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    headerHeight: PropTypes.number.isRequired,
    keys: PropTypes.object.isRequired,
    ranges: PropTypes.array.isRequired,
    visibleTimeStart: PropTypes.number.isRequired,
    visibleTimeEnd: PropTypes.number.isRequired,
    onRangeSelect: PropTypes.func,
    selectedRange:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }
  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.height === this.props.height &&
             nextProps.keys === this.props.keys &&
             nextProps.headerHeight === this.props.headerHeight &&
             arraysEqual(nextProps.ranges, this.props.ranges) &&
             nextProps.visibleTimeStart === this.props.visibleTimeStart &&
             nextProps.visibleTimeEnd === this.props.visibleTimeEnd &&
             nextProps.selectedRange === this.props.selectedRange
      )
  }

  static defaultProps = {}

  getVisibleRanges (visibleTimeStart, visibleTimeEnd, ranges) {
    return ranges.reduce((acc, range) => {
      if (visibleTimeStart < range.end && visibleTimeEnd > range.start) {
        acc.push(range)
        return acc
      } else {
        return acc
      }
    }, [])
  }
  handleRangeSelect = (id) =>{
    if (this.props.onRangeSelect) {
      this.props.onRangeSelect(id);
    }
  }
  isSelected = (range,rangeIdKey)=>{
    return this.props.selectedRange === _get(range, rangeIdKey)
  }
  render() {
    const { rangeIdKey } = this.props.keys
    const { visibleTimeStart, visibleTimeEnd } = this.props
    let visibleRanges = this.getVisibleRanges(visibleTimeStart, visibleTimeEnd, this.props.ranges)
    return (
      <div className='rct-ranges'>
        {visibleRanges.map((range,index) => <Range canvasTimeStart={this.props.canvasTimeStart}
                                           canvasTimeEnd={this.props.canvasTimeEnd}
                                           canvasWidth={this.props.canvasWidth}
                                           className={range.className}
                                           height={this.props.height}
                                           headerHeight={this.props.headerHeight}
                                           key={index}
                                           keys={this.props.keys}
                                           range={range}
                                           onRangeSelect={this.handleRangeSelect}
                                           selected={this.isSelected(range,rangeIdKey)}
                                           rangeStart={range.start}
                                           rangeEnd={range.end} />)}
      </div>
    )
  }
}
