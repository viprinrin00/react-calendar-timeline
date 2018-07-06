import React, { Component, PropTypes } from 'react'
import Range from './Range'
import { _get, arraysEqual } from '../utils'

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
    visibleTimeEnd: PropTypes.number.isRequired
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
             nextProps.visibleTimeEnd === this.props.visibleTimeEnd
      )
  }

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

  render () {
    const { visibleTimeStart, visibleTimeEnd } = this.props
    const { rangeIdKey } = this.props.keys
    let visibleRanges = this.getVisibleRanges(visibleTimeStart, visibleTimeEnd, this.props.ranges)

    return (
      <div className='rct-ranges'>
        {visibleRanges.map(range => <Range canvasTimeStart={this.props.canvasTimeStart}
                                           canvasTimeEnd={this.props.canvasTimeEnd}
                                           canvasWidth={this.props.canvasWidth}
                                           className={range.className}
                                           height={this.props.height}
                                           headerHeight={this.props.headerHeight}
                                           key={_get(range, rangeIdKey)}
                                           keys={this.props.keys}
                                           range={range}
                                           rangeStart={range.start}
                                           rangeEnd={range.end} />)}
      </div>
    )
  }
}
