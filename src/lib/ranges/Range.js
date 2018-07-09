import React, { Component } from 'react'
import { _get,arraysEqual} from '../utility/generic'
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
    selected: React.PropTypes.bool,
    groups: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]).isRequired,
    groupHeights: React.PropTypes.array.isRequired,
    onRangeDoubleClick: React.PropTypes.func,
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
             nextProps.selected === this.props.selected &&
             nextProps.groupHeights === this.props.groupHeights &&
             arraysEqual(nextProps.groups, this.props.groups)
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
  handleDoubleClick = ()=>{
    if(this.props.onRangeDoubleClick) {
      this.props.onRangeDoubleClick(this.props.range);
    }
  }
  render () {
    if (this.props.range.start !== null && this.props.range.end !== null) {
      const { canvasTimeEnd, canvasTimeStart, canvasWidth } = this.props
      let ratio = canvasWidth / (canvasTimeEnd - canvasTimeStart)
      let left = this.left(canvasTimeStart, this.props.range.start, ratio)
      let width = this.width(canvasTimeEnd, canvasTimeStart, canvasWidth, left, this.props.range.end, ratio)
      
      let top = 0;
      let index = 0;
      let height = 0;
      if(this.props.range.group) {
        let index = this.props.groups.indexOf(this.props.range.group)
        for (let i = 0; i < index; i++) {
          top += this.props.groupHeights[i];
        }
        let count = 0
        for (let i = index; i<this.props.groups.length;i++){
          if (this.props.range.group.id !== this.props.groups[i].id && !this.props.groups[i].parent){
            break;
          }
          count++;
        }
        for (let i = index; i < index + count; i++) {
          height += this.props.groupHeights[i];
        }
      }else{
        for (let i = 0; i < this.props.groupHeights.length; i++){
          height += this.props.groupHeights[i];
        }
      }
      let styles = {
        top: `${top}px`,
        left: `${left}px`,
        height: `${height}px`,
        width: `${width}px`
      }
      let classNames = 'rct-range' + (this.props.selected ? ' rct-range-selected': this.props.range.className ? ` ${this.props.range.className}` : '')
      let title = this.props.range.start.format('HH:mm') + ' - ' + this.props.range.end.format('HH:mm')
      return <div className={classNames}
                  style={styles}
                  onClick={this.handleSelect}
                  onDoubleClick={this.handleDoubleClick}
                  title={title}/>
    } else {
      return null
    }
  }
}

Range.defaultProps = {
    selected: false
}
