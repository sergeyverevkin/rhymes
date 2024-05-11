import React, { useState } from 'react';
import { rhymeStore } from '../store/rhymeStore';
import { RhymeComponentLine } from './RhymeComponentLine';
import styles from "./RhymeComponent.module.css";
import { Rhyme } from '../model/rhyme';
import { observer } from 'mobx-react-lite';


interface RhymeComponentProps {
  rhyme?: Rhyme;
  xx: number;
  yy: number;
}

export const RhymeComponent = observer(({rhyme, xx, yy}: RhymeComponentProps) => {
  const {showPercent} = rhymeStore;
  const arGrouppedCount = [2, 3, 4, 5, 6];
  const [grouppedCount, setGrouppedCount] =
    useState<number>(4);
  const lines = rhyme?.content.lines ?? [];

  return <div className={styles.rhymeComponent}>
    <div>
      <h2>{rhyme?.title}</h2>
      <h3>{rhyme?.author}</h3>
      ({rhyme?.content.lines.length} строк)
    </div>
    <div className={styles.modeBlock}>
      <div className={styles.block}
           onClick={() => rhymeStore.addMode(-20)}>&#8595;</div>
      <div className={styles.percent}>{showPercent} %</div>
      <div className={styles.block}
           onClick={() => rhymeStore.addMode(20)}>&#8593;</div>
      <div>Строфа:
        <select
          name={"grouppedCount"}
          value={grouppedCount}
          onChange={(v) =>
            setGrouppedCount(parseInt(v.currentTarget.value) ?? 4)}
        >{
          arGrouppedCount.map((cnt: number) => <option key={cnt} value={cnt}>{cnt}</option>)
        }</select></div>
    </div>
    <div>
      {lines.map(
        (line, index: number) => {
          return <RhymeComponentLine
            isFirst={(line.positionY % grouppedCount === 0) ? 1 : 0}
            xx={xx}
            yy={yy}
            key={line.positionY + index}
            rhymeLine={line}
          />
        }
      )}
    </div>
  </div>;
});