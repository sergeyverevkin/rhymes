import React, { Component } from 'react';
import styles from './RhymeTab.module.css';
import { Rhyme } from '../model/rhyme';

type RhymeListTabProps = {
  rhyme: Rhyme,
  fnClick: (rhyme: Rhyme) => void,
  isSelected: boolean
};

export class RhymeListTab extends Component<RhymeListTabProps> {

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