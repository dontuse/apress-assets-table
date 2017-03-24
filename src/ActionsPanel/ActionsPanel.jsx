/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import {block} from '../utils';
import Scroller from '../Scroller/Scroller';
import './e-actions-panel.scss';

const b = block('e-actions-panel');

class ActionsPanel extends React.Component {
  render() {
    const props = this.props;

    return (
      <div className={b.mix(props.mix)}>
        <div className={b('container')}>
          <section className={b('section-1')}>
            <div className={b('scroll-box')}>
              {this.props.children}
            </div>
          </section>
          <section className={b('section-2')}>
            <div className={b('last-actions-box')}>
              <span className={b('last-actions-label')}>Последние действия:</span>
              <button
                type='button'
                onClick={(e) => { props.backHistory && props.onActionBack(e); }}
                className={b('button').is({back: true, active: props.backHistory})}
              />
              <button
                type='button'
                onClick={(e) => { props.nextHistory && props.onActionNext(e); }}
                className={b('button').is({next: true, active: props.nextHistory})}
              />
            </div>
            <div className={b('filter-box')}>
              <span className={b('filter-title')}>Установлены фильтры:</span>
              <div className={b('scroll-box')}>
                <Scroller wrapped >
                  {props.filters.map(filter =>
                    <span key={filter.id} className={b('filter-item')}>
                      <i
                        onClick={() => { props.onRemoveFilter(filter.id); }}
                        className={b('remove')} title='Убрать'
                      />
                      <span className={b('filter-item-box')}>{filter.name}</span>
                    </span>
                  )}
                </Scroller>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}


ActionsPanel.propTypes = {
  mix: PropTypes.string,
  filters: PropTypes.array,
  nextHistory: PropTypes.bool,
  backHistory: PropTypes.bool,
  onActionBack: PropTypes.func,
  onActionNext: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  step: PropTypes.number,
};

ActionsPanel.defaultProps = {
  mix: '',
  filters: [],
  step: 100,
};

export default ActionsPanel;
