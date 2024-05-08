import React from 'react';
import { Rhyme, rhymeStore } from '../store/rhymeStore';
import { RhymeComponentLine } from './RhymeComponentLine';
import styles from "./RhymeComponent.module.css";

export class RhymeComponent extends React.Component<{ rhyme?: Rhyme }> {
  render() {
    return <div className={styles.rhymeComponent}>
      <div>
        <h2>{this.props.rhyme?.title}</h2>
        <h3>{this.props.rhyme?.author}</h3>
          ({this.props.rhyme?.content.lines.length} строк)
      </div>
      <div className={styles.modeBlock}>
        <div className={styles.block}
             style={{marginLeft: rhymeStore.mode * 2}}
             onClick={() => rhymeStore.addMode(-20)}>Выключать</div>
        <div className={styles.block}
             onClick={() => rhymeStore.addMode(20)}>Включать</div>
      </div>
      <div>
        {this.props.rhyme?.content.lines.map(
          (line, index) =>
            <RhymeComponentLine key={index} rhymeLine={line} index={index}/>
        )}
      </div>
    </div>;
  }
}