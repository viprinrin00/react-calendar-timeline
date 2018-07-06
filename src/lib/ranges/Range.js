import React, { Component } from 'react'
import { _get } from '../utils'
export default class Range extends Component {
  static propTypes = {
    canvasTimeStart: React.PropTypes.number.isRequired,
    canvasTimeEnd: React.PropTypes.number.isRequired,
    canvasWidth: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    headerHeight: React.PropTypes.number.isRequired,
    keys: React.PropTypes.object.isRequired,
    range: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      rangeId: _get(props.range, props.keys.rangeIdKey),
      rangeTimeStart: _get(props.range, props.keys.rangeTimeStartKey),
      rangeTimeEnd: _get(props.range, props.keys.rangeTimeEndKey)
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.height === this.props.height &&
             nextProps.headerHeight === this.props.headerHeight &&
             nextProps.keys === this.props.keys &&
             nextProps.range === this.props.range
    )
  }

  left (canvasTimeStart, rangeTimeStart, ratio) {
    if (rangeTimeStart < canvasTimeStart) {
      return 0
    }

    if (rangeTimeStart > canvasTimeStart) {
      return Math.round(((rangeTimeStart - canvasTimeStart) * ratio))
    }
  }

  width (canvasTimeEnd, canvasTimeStart, canvasWidth, left, rangeTimeEnd, ratio) {
    if (rangeTimeEnd < canvasTimeEnd) {
      return Math.round(((rangeTimeEnd - canvasTimeStart) * ratio) - left)
    }

    if (rangeTimeEnd > canvasTimeEnd) {
      return canvasWidth
    }
  }

  render () {
    const { rangeTimeStart, rangeTimeEnd } = this.state
    if (rangeTimeStart !== null && rangeTimeEnd !== null) {
      const { canvasTimeEnd, canvasTimeStart, canvasWidth } = this.props
      let ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
      let top = this.props.headerHeight
      let height = this.props.height - this.props.headerHeight
      let left = this.left(canvasTimeStart, rangeTimeStart, ratio)
      let width = this.width(canvasTimeEnd, canvasTimeStart, canvasWidth, left, rangeTimeEnd, ratio)

      let styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`
      }

      let classNames = 'rct-range' + (this.props.range.className ? ` ${this.props.range.className}` : '')
      return <div className={classNames} style={styles} />
    } else {
      return null
    }
  }
}

Range.defaultProps = {
}
