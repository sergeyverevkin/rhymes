import React from 'react';
import { RhymeLine, RhymeToken } from '../model/rhymeLine';
import styles from "./RhymeComponentLine.module.css";
import { rhymeStore } from '../store/rhymeStore';

export class RhymeComponentLine extends React.Component<{ rhymeLine: RhymeLine, index?: number }> {
  render() {
    const iFontWidth = 8;
    return <div key={this.props.index} className={styles.lyricBlockLine}>
      {/*
      <span className={styles.lyricBlockLineNumber}>
        #{this.props.index}
      </span>*/}
      <span className={styles.lyricBlockLineWords}>
        {this.props.rhymeLine.tokens.map((token: RhymeToken) => (
          <span
            key={token.positionX}
            className={token.visible ? styles.word : styles.hidden }
            style={{fontFamily: "monospace", position: "relative", left: token.positionX * iFontWidth }}
            onClick={() => token.visible = !token.visible}
          >
            {token.content}
          </span>
        ))}
      </span>
    </div>;
  }
}