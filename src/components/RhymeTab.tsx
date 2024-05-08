import React, { Component } from 'react';
import { Rhyme } from '../store/rhymeStore';
import styles from './RhymeTab.module.css';

type RhymeTabProps = {
  rhyme: Rhyme,
  fnClick: (rhyme: Rhyme) => void,
  isSelected: boolean
};

export class RhymeTab extends Component<RhymeTabProps> {

  render() {
    return <div onClick={() => {
      return this.props.fnClick(this.props.rhyme);
    }} className={this.props.isSelected ? "selected" : ""}>
      <span className={styles.title}>
        <span className={styles.name}>{this.props.rhyme.title}</span>
        <span className={styles.author}>({this.props.rhyme.author})</span>
      </span>
      </div>;
  }
}