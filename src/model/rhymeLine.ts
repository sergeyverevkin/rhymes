export type RhymeToken = {
  content: string,
  positionX: number,
  visible: boolean,
};
export class RhymeLine {
  positionY: number = 0;
  tokens: RhymeToken[] = [];
  setMode(mode: number) {
    this.tokens = this.tokens.map((token) => {
      const state = (Math.random() * 100) < mode;
      return {...token, visible: state};
    });
  }
};

export type RhymeItem = {
  lines: RhymeLine[];
}
