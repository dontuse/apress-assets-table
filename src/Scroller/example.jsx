/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import Scroller from './Scroller';
import {block} from '../utils';

const b = block('example');

export default class ScrollerExample extends React.Component {

  render() {
    return (
      <div className={b('wrapper')}>
        <h3>Scroller:</h3>
        <Scroller mix={b('test-mix other-mix').is({modificator: true})()} wrapped step={200}>
          <div className={b('test-box')}>osakdoaskdoasdk</div>
          <div className={b('test-box')}>osakdoaskdoasdk</div>
          <div className={b('test-box')}>osakdoaskdoasdk</div>
          <div className={b('test-box')}>osakdoaskdoasdk</div>
          <div className={b('test-box')}>sadsadasdasdasdasdasdasd</div>
          <div className={b('test-box')}>osakdoaskdoasdk</div>
        </Scroller>
      </div>
    );
  }
}
