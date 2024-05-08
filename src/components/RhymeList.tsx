import React from 'react';
import { Rhyme, rhymeStore } from '../store/rhymeStore';
import { RhymeTab } from './RhymeTab';
import styles from './RhymeList.module.css'

export class RhymeList extends React.Component<{ rhymes: Rhyme[], selected: string }> {
  render() {
    return <div className={styles.tab}>
      {this.props.rhymes.map(rhyme =>
        <RhymeTab fnClick={() => rhymeStore.setSelectedRhyme(rhyme)} rhyme={rhyme} key={rhyme.id} isSelected={this.props.selected === rhyme.id}/>)
      }
    </div>;
  }
}