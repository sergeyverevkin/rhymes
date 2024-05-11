import { RhymeToken } from './rhymeToken';

export class RhymeLine {
  positionY: number = 0;
  tokens: RhymeToken[] = [];
  setMode(mode: number) {
    this.tokens = this.tokens.map((token) => {
      const state = (Math.random() * 100) < mode;
      return {...token, visible: state};
    });
  }

  setExcept(exceptX: number) {
    this.tokens = this.tokens.map( (token) => {
      return {...token, visible: exceptX === token.positionX ? true : token.visible};
    })
  }

}

