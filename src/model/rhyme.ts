// Domain object Rhyme.
import { RhymeItem } from './rhymeItem';
import { RhymeToken } from './rhymeToken';
import { RhymeLine } from './rhymeLine';

export class Rhyme {
  id: string; // Unique id of this Rhyme, immutable.
  author: string = "";
  title: string = "";
  prevMode?: number = undefined;
  content: RhymeItem;

  constructor(rhyme?: Rhyme) {
    if (rhyme) {

      this.id = rhyme.id;
      this.author = rhyme.author;
      this.title = rhyme.title;
      const content = JSON.stringify(rhyme.content);
      this.content = JSON.parse(content);
    } else {
      this.id = (Math.random() * 99999).toString();
      this.content = {lines: []};
    }
  }

  parse(content: string): void {
    const lines = content.split("\n");
    let ii = 0;
    for (const v of lines) {
      let iX = 0;
      let rL: RhymeLine = new RhymeLine();
      rL.positionY = ii++;
      rL.tokens = v.split(" ").map((s) => {
        const token: RhymeToken = {
          content: s,
          positionX: iX,
          visible: true,
        };
        iX += s.length; // TODO: для моноширинного шрифта только
        return token;
      });
      this.content.lines.push(rL);
    }
  }

  get asJson(): Rhyme {
    let rr = new Rhyme();
    rr.author = this.author;
    rr.title = this.title;
    rr.content = this.content;
    return rr;
  }

  /*
  applyMode(mode: number, exceptX: number, exceptY: number): Rhyme {
    if (this.prevMode !== undefined && this.prevMode === mode) {
      return this;
    }
    const res = new Rhyme();
    res.id = this.id;
    res.content = this.content;
    res.author = this.author;
    res.title = this.title;
    res.content = {
      ...this.content,
      lines: this.content.lines.map(line => {
        const line2 = new RhymeLine();
        line2.tokens = line.tokens;
        line2.positionY = line.positionY;
        line2.setMode(mode);
        if (line.positionY === exceptY) {
          line2.setExcept(exceptX);
        }
        return line2;
      }),
    };
    return res;
  }
*/
  applyModeSelf(mode: number, exceptX: number, exceptY: number): void {
    if (this.prevMode !== undefined && this.prevMode === mode) {
      return;
    }
    if (this.content.lines) {
      this.content.lines = this.content.lines.map(line => {
        const line2 = new RhymeLine();
        line2.tokens = line.tokens;
        line2.positionY = line.positionY;
        line2.setMode(mode);
        if (line.positionY === exceptY) {
          line2.setExcept(exceptX);
        }
        return line2;
      });
    }
  }
}