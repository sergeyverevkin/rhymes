import React from 'react';
import { rhymeStore } from '../store/rhymeStore';
import { RhymeListTab } from './RhymeListTab';
import styles from './RhymeList.module.css'
import { Rhyme } from '../model/rhyme';

export class RhymeList extends React.Component<{ rhymes: Rhyme[], selected: string }> {
  render() {
    return <div className={styles.tab}>
      {this.props.rhymes.map(rhyme =>
        <RhymeListTab fnClick={() => rhymeStore.setSelectedRhyme(rhyme.id)} rhyme={rhyme} key={rhyme.id} isSelected={this.props.selected === rhyme.id}/>)
      }
    </div>;
  }
}