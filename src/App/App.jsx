import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ButtonExample from '../Button/example';
import TogglerExample from '../Toggler/example';
import HeaderExample from '../Header/example';
import PaginationExample from '../Pagination/example';
import ComboSelectExample from '../ComboSelect/example';
import TableExample from '../Table/example';
import ScrollerExample from '../Scroller/example';
import ActionsPanelExample from '../ActionsPanel/example';

import * as actions from './actions';
import {block} from '../utils';

import './style.scss';

const b = block('example-wrapper');

class App extends React.Component {
  componentWillMount() {
    this.props.actions.loadTableDataStart();
  }

  render() {
    return (
      <div>
        <div className={b}>
          <HeaderExample />
        </div>
        <div className={b}>
          <ButtonExample />
        </div>
        <div className={b}>
          <TogglerExample />
        </div>
        <div className={b}>
          <PaginationExample />
        </div>
        <div className={b}>
          <ComboSelectExample />
        </div>
        <div>
          <ScrollerExample />
        </div>
        <div style={{margin: '20px 0 20px 370px'}} className={b}>
          <ActionsPanelExample />
        </div>
        <div className={b('table')}>
          <TableExample tableData={this.props.tableData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tableData: state.app.table
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
