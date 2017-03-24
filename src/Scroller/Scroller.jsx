/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import _throttle from 'lodash/throttle';
import {block} from '../utils';
import './e-scroller.scss';

const b = block('e-scroller');

class Scroller extends React.Component {

  static propTypes = {
    mix: PropTypes.string,
    step: PropTypes.number,
    wrapped: PropTypes.bool,
  }

  static defaultProps = {
    mix: '',
    step: 100,
    wrapped: false,
  }

  state = {
    offset: 0,
    isOverflow: false,
    isLastPosition: false,
    isFirstPosition: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize, false);
    this.init();
  }

  componentWillReceiveProps() {
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize, false);
  }

  handleWindowResize = _throttle(() => { this.init(); }, 500);

  calculateView = (offsetX) => {
    let isLastPosition = false;
    let isFirstPosition = false;
    let offset = offsetX;
    const isOverflow = this.$container.offsetWidth < this.$container.scrollWidth;

    if (offset + this.$container.offsetWidth >= this.$container.offsetWidth) {
      offset = 0;
      isLastPosition = true;
    }

    if (this.$container.offsetWidth - offset >= this.$container.scrollWidth) {
      offset = -(this.$container.scrollWidth - this.$container.offsetWidth);
      isFirstPosition = true;
    }

    return ({
      isOverflow,
      isFirstPosition,
      isLastPosition,
      offset,
    });
  }

  init = () => {
    this.setState(this.calculateView(this.state.offset));
  }

  slide = (direction) => {
    let offset;

    if (direction === 'next') {
      offset = this.state.offset + this.props.step;
    } else {
      offset = this.state.offset - this.props.step;
    }

    this.setState(this.calculateView(offset));
  }

  handleSlideBack = () => { this.slide('next'); }

  handleSlideNext = () => { this.slide('back'); }

  handleWell = (e) => {
    if (this.state.isOverflow) {
      if (e.deltaY > 0 && !this.state.isLastPosition) {
        this.slide('next');
        e.preventDefault();
      } else if (e.deltaY < 0 && !this.state.isFirstPosition) {
        this.slide('back');
        e.preventDefault();
      }
    }
  }

  renderChildren = () => (
    this.props.wrapped ?
    React.Children.map(this.props.children, child => <div className={b('element')}>{child}</div>) :
    this.props.children
  );

  render() {
    const props = this.props;
    const state = this.state;
    return (
      <div
        onWheel={this.handleWell}
        className={b.mix(props.mix)}
      >
        <div className={b('root')}>
          <section
            ref={(node) => { this.$wrapper = node; }}
            className={b('wrapper').is({
              overflow: state.isOverflow,
              'first-position': state.isFirstPosition,
              'last-position': state.isLastPosition,
            })}
          >
            <div
              style={{left: state.offset}}
              ref={(node) => { this.$container = node; }}
              className={b('container')}
            >
              {this.renderChildren()}
            </div>
          </section>
          {state.isOverflow &&
            <div className={b('button-box')}>
              {!state.isLastPosition &&
                <button
                  onClick={this.handleSlideBack}
                  type='button' className={b('button').is({back: true})}
                />
              }
              {true &&
                <button
                  onClick={this.handleSlideNext}
                  type='button' className={b('button').is({next: true})}
                />
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Scroller;
