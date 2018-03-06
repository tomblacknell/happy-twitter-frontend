import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Tooltip, actions as tooltipActions } from 'redux-tooltip';
import copy from 'deepcopy';
import Treemap from './treemap';
import DATA from './visualizations/treemap/data';

function crop(path) {
  let cropped = DATA;
  const remain = [...path];
  while (0 < remain.length) {
    const name = remain.shift();
    if (typeof cropped.children === 'undefined') {
      console.warn(`No children, this is a leaf node`);
      break;
    }
    const matches = cropped.children.filter(c => c.name === name);
    if (1 < matches.length) {
      console.warn(`Found multiple nodes which have same name: '${name}'`);
      break;
    }
    if (matches.length === 0) {
      console.warn(`No child named '${name}'`);
      break;
    }
    cropped = matches[0];
  }
  return copy(cropped);
}

@connect(({ app }) => ({ app }))
export default class Home extends Component {
  static displayName = 'Home';
  static contextTypes = { router: PropTypes.object };

  handleMoveDown(name) {
    const { location } = this.props;
    const { router } = this.context;
    if (location.pathname.slice(-1) !== '/') {
      name = '/' + name;
    }
    router.push(`${location.pathname}${name}`);
  }

  handleHover(origin, name) {
    this.props.dispatch(tooltipActions.show({ origin, content: name }));
  }

  handleLeave() {
    this.props.dispatch(tooltipActions.hide());
  }

  render() {
    const { location, app: { base } } = this.props;
    const pathname = location.pathname.replace(base, '');
    const path = pathname.split('/').filter(s => 0 < s.length);
    const data = crop(path);
    return (
      <div id="home" style={{ position: 'relative' }}>
        <h1>treemap-with-router</h1>
        <div className="path">
          <Link to={`${base}`} key="top" className="path-item">[ROOT]</Link>
          {path.map((name, i) => (
            <Link to={`${base}/` + path.slice(0, i + 1).join('/')} key={`l_${name}_${i}`} className="path-item">{name}</Link>
          ))}
        </div>
        <Treemap
          { ...{ data, path } }
          onMoveDown={::this.handleMoveDown}
          onShowDetail={::this.handleHover}
          onHideDetail={::this.handleLeave}
        />
        <Tooltip />
      </div>
    );
  }
}
