/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
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
    step: 100,
    wrapped: false,
    isLastPosition: false,
    isFirstPosition: false,
  }

  state = {
    scroll: 0,
    isOverflow: false,
  }

  componentDidMount() {
    window.addEventListener('resize', this.init, false);
  }

  componentWillReceiveProps() {
    this.init();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.init, false);
  }

  calculateView = (scroll) => {
    const canScrollNext =
      this.$container.offsetWidth - scroll - this.props.step >=
      this.$container.scrollWidth;
    const canScrollBack = scroll + this.props.step + this.$container.offsetWidth >
      this.$container.offsetWidth;
    const isOverflow = this.$container.offsetWidth < this.$container.scrollWidth;

    return ({
      isOverflow,
      isFirstPosition: canScrollNext,
      isLastPosition: canScrollBack,
      scroll: isOverflow ? this.state.scroll : 0,
    });
  }

  init = () => {
    this.setState(this.calculateView(this.state.scroll));
  }


  slide = (direction) => {
    let scroll;
    let isLastPosition = false;
    let isFirstPosition = false;

    if (direction === 'next') {
      scroll = this.state.scroll + this.props.step;
      if (scroll + this.$container.offsetWidth > this.$container.offsetWidth) {
        scroll = 0;
        isLastPosition = true;
      }
    } else {
      scroll = this.state.scroll - this.props.step;
      if (this.$container.offsetWidth - scroll >= this.$container.scrollWidth) {
        scroll = -(this.$container.scrollWidth - this.$container.offsetWidth);
        isFirstPosition = true;
      }
    }

    this.setState({
      scroll,
      isLastPosition,
      isFirstPosition,
    });
  }

  handleSlideBack = () => { this.slide('next'); }

  handleSlideNext = () => { this.slide('back'); }

  handleWell = (e) => {
    if (this.state.isOverflow) {
      e.preventDefault();
      this.slide(e.deltaY > 0 ? 'next' : 'prev');
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
              style={{left: state.scroll}}
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
                  // disabled={!state.isFirstPosition}
                  type='button' className={b('button').is({back: true})}
                />
              }
              {true &&
                <button
                  onClick={this.handleSlideNext}
                  // disabled={!state.isLastPosition}
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
