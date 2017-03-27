import React, {PropTypes} from 'react';
import {block} from '../utils';
import './e-checkbox.scss';

const b = block('e-checkbox');

const Checkbox = props =>
  <div
    onClick={() => props.onChange(!props.checked)}
    className={b.is({checked: props.checked}).mix(props.mix)}
  />;

Checkbox.PropTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  mix: PropTypes.string,
};

export default Checkbox;
