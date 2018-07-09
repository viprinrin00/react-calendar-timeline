import React, { Component } from 'react'
import { _get} from '../utility/generic'
export default class Range extends Component {
  static propTypes = {
    canvasTimeStart: React.PropTypes.number.isRequired,
    canvasTimeEnd: React.PropTypes.number.isRequired,
    canvasWidth: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    headerHeight: React.PropTypes.number.isRequired,
    keys: React.PropTypes.object.isRequired,
    range: React.PropTypes.object.isRequired,
    onRangeSelect: React.PropTypes.func,
    selected: React.PropTypes.bool
  }

  constructor (props) {
    super(props)

    this.state = {
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !(nextProps.canvasTimeStart === this.props.canvasTimeStart &&
             nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
             nextProps.canvasWidth === this.props.canvasWidth &&
             nextProps.height === this.props.height &&
             nextProps.headerHeight === this.props.headerHeight &&
             nextProps.keys === this.props.keys &&
             nextProps.range === this.props.range &&
             nextProps.selected === this.props.selected
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
  handleSelect = ()=> {
    if (this.props.onRangeSelect){
      this.props.onRangeSelect(this.props.range.id);
    }
  }
  render () {
    if (this.props.range.start !== null && this.props.range.end !== null) {
      const { canvasTimeEnd, canvasTimeStart, canvasWidth } = this.props
      let ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
      let top = 0
      let height = this.props.height
      let left = this.left(canvasTimeStart, this.props.range.start, ratio)
      let width = this.width(canvasTimeEnd, canvasTimeStart, canvasWidth, left, this.props.range.end, ratio)

      let styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`
      }
      let classNames = 'rct-range' + (this.props.range.className ? ` ${this.props.range.className}` : '') + (this.props.selected ? ' rct-range-selected':'')
      let title = this.props.range.start.format('HH:mm') + ' - ' + this.props.range.end.format('HH:mm')
      return <div className={classNames} style={styles} onClick={this.handleSelect} title={title}/>
    } else {
      return null
    }
  }
}

Range.defaultProps = {
    selected: false
}
