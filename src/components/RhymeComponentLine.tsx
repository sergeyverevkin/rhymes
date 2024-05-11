import React from 'react';
import { RhymeLine } from '../model/rhymeLine';
import styles from "./RhymeComponentLine.module.css";
import cn from 'classnames';
import { rhymeStore } from '../store/rhymeStore';
import { RhymeToken } from '../model/rhymeToken';
import classNames from 'classnames';

interface RhymeComponentLineProps {
  isFirst?: number,
  xx: number,
  yy: number,
  rhymeLine?: RhymeLine
}

export function RhymeComponentLine({isFirst, rhymeLine, xx, yy}: RhymeComponentLineProps) {
  const iFontWidth = 8;
  const cns = cn(styles.lyricBlockLine,
    isFirst === 1 ? styles.firstLine : styles.otherLine);
  return <div
    key={rhymeLine?.positionY}
    className={cns}
    title={"Строка " + rhymeLine?.positionY}
  >
      <span className={styles.lyricBlockLineWords}>
        {rhymeLine?.tokens.map((token: RhymeToken) => {
          const cns = classNames(
            token.visible ? styles.word : styles.hidden,
            token.positionX === xx && rhymeLine?.positionY === yy ? styles.hint : ""
          );
          return <span
              key={token.positionX}
              className={cns}
              style={{fontFamily: "monospace", position: "relative", left: token.positionX * iFontWidth}}
              onClick={() => {
                rhymeStore.setToggledWord(token.positionX, rhymeLine?.positionY ?? 0);
              }}
            >
            {token.content}
          </span>;
          }
        )}
      </span>
  </div>;
}