/* eslint no-console: 0 */
/* eslint no-alert: 0 */
import React from 'react';
import Checkbox from './Checkbox';

export default class Example extends React.Component {

  state = {
    val: true,
  }

  changeVal = (val) => {
    console.log('checked', val);
    this.setState({
      val,
    });
  }

  render() {
    return (
      <section className='example-wrapper'>
        <h3>Checkbox:</h3>
        <Checkbox
          onChange={this.changeVal}
          checked={this.state.val}
        />
      </section>
    );
  }
}
