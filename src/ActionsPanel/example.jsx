/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import ActionsPanel from './ActionsPanel';
import Scroller from '../Scroller/Scroller';
import {block} from '../utils';

const b = block('e-actions-panel');

export default class ButtonExample extends React.Component {
  state = {
    backHistory: true,
    nextHistory: false,
    filters: [
      {id: 1, name: 'Без фотографии'},
      {id: 2, name: 'C рубрикой'},
      {id: 3, name: 'C котиком'},
      {id: 4, name: 'С колбасой 40 штук'},
      {id: 5, name: 'С описанием'},
    ],
  }
  historyBack = () => {
    console.log('historyBack');
    this.setState({backHistory: false, nextHistory: true});
  }
  historyNext = () => {
    console.log('historyNext');
    this.setState({backHistory: true, nextHistory: false});
  }
  removeFilter = (id) => {
    console.log('remove filter', id);
    const filters = this.state.filters.filter(filter => filter.id !== id);
    console.log(filters);
    this.setState({
      filters,
    });
  }
  render() {
    const state = this.state;
    return (
      <div>
        <h3>ActionsPanel:</h3>
        <ActionsPanel
          onActionBack={this.historyBack}
          onActionNext={this.historyNext}
          onRemoveFilter={this.removeFilter}
          backHistory={state.backHistory}
          nextHistory={state.nextHistory}
          filters={state.filters}
        >
          <Scroller>
            <a className={b('breadcrumb-item')} href=''>Все группы</a>
            <a className={b('breadcrumb-item')} href=''>Труба</a>
            <span className={b('breadcrumb-item')}>Труба металлическая</span>
          </Scroller>
        </ActionsPanel>
      </div>
    );
  }
}
