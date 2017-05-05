/* eslint react/no-find-dom-node: 0 */
/* eslint react/no-unused-prop-types: 0 */
import {
  React,
  PropTypes,
  Component,
  findDOMNode,
  DragSource,
  DropTarget,
  b,
  constants,
  _isEqual,
  DropDownMenu,
  getEmptyImage
} from './import';

const setExpanded = (props, expanded) => {
  props.actionSetExpanded({id: props.id, expanded});

  if (!Array.isArray(props.treeNodes)) {
    props.actionUpdate({
      id: props.id,
      urlName: props.urlName,
      config: props.config
    });
  }
};

class TreeItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,

    moveStart: PropTypes.func.isRequired,
    moveStep: PropTypes.func.isRequired,
    moveEnd: PropTypes.func.isRequired,

    actionSetExpanded: PropTypes.func.isRequired,
    actionUpdate: PropTypes.func.isRequired,
    actionSetNode: PropTypes.func.isRequired,
    actionShowRemoveConfirmation: PropTypes.func.isRequired,

    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    expandable: PropTypes.bool,
    selected: PropTypes.bool,
    expanded: PropTypes.bool,
    urlName: PropTypes.string.isRequired,
    treeNodes: PropTypes.array,

    isDragging: PropTypes.bool.isRequired,
    hasDragNode: PropTypes.bool.isRequired,
    config: PropTypes.object,
    hoverNode: PropTypes.shape({
      id: PropTypes.number,
      index: PropTypes.number,
      target: PropTypes.string,
    }),
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {captureDraggingState: true});
  }

  shouldComponentUpdate(nextProps) {
    return !_isEqual(this.props, nextProps);
  }

  getClassName() {
    const {selected, expanded, hoverNode, id, isDragging} = this.props;

    if (hoverNode && (hoverNode.id === id) && !isDragging) {
      return b('item').is({
        active: selected,
        open: expanded,
        [hoverNode.target]: true
      });
    }

    return b('item').is({
      active: selected,
      open: expanded,
      move: isDragging
    });
  }

  hendlerClickExpanded(e) {
    e.stopPropagation();

    this.clickExpanded(!this.props.expanded);
  }

  hendlerClickSelected() {
    this.props.actionSetNode({id: this.props.id, urlName: this.props.urlName});

    if (this.props.expandable) { this.clickExpanded(true); }
  }

  clickExpanded(expanded) {
    setExpanded(this.props, expanded);
  }

  render() {
    const {
      id,
      orderUrl,
      count,
      expandable,
      name,
      connectDragSource,
      connectDropTarget,
      actionShowRemoveConfirmation
    } = this.props;

    return connectDragSource(connectDropTarget(
      <div
        className={this.getClassName()}
        data-count={`(${count})`}
        onClick={() => this.hendlerClickSelected()}
      >
        <span
          className={expandable ? b('arrow') : ''}
          onClick={e => this.hendlerClickExpanded(e)}
        />
        <span className={b('item-title')}>{name}</span>
        <DropDownMenu
          mix='is-settings'
          trigger={['hover']}
          items={[
            {
              title: 'Редактировать',
              id: 'edit',
            },
            {
              title: 'Изменить порядок товаров',
              id: 'reorderGoods',
            },
            {
              title: <span className={b('remove')}>Удалить</span>,
              id: 'remove',
            },
          ]}
          onSelect={(action) => {
            if (action === 'edit') {
              console.log('Todo: добавить вызов редактирования');
            }
            if (action === 'remove') {
              actionShowRemoveConfirmation(id);
            }
            if (action === 'reorderGoods') {
              window.open(orderUrl);
            }
          }}
        >
          <span className={b('settings')} />
        </DropDownMenu>
        <span className={b('drag')} />
      </div>
    ));
  }
}

const nodeSource = {
  beginDrag(props) {
    props.moveStart(true);

    return props;
  },

  endDrag(props) {
    props.moveEnd(props.id);
  },

  canDrag(props) {
    return props.hasDragNode;
  }
};

const nodeTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor, component) {
    const {id} = monitor.getItem();

    if (props.id !== id) {
      const elemPosition = findDOMNode(component).getBoundingClientRect();
      const cursorPosition = monitor.getClientOffset();
      let target = 'center';

      if (props.expandable && !props.expanded) { setExpanded(props, true); }
      if ((cursorPosition.y - elemPosition.top) < 10) { target = 'top'; }
      if ((cursorPosition.y - elemPosition.top) > 25) { target = 'bottom'; }

      props.moveStep(props.id, props.index, target);
    }
  }
};

export default DropTarget(
  constants.TREE,
  nodeTarget,
  connect => ({connectDropTarget: connect.dropTarget()})
)(
  DragSource(
    constants.TREE,
    nodeSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  )(TreeItem)
);
