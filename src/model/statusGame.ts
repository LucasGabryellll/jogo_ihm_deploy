export interface StatusGamming {
  focus: string,
  players: {
    playerOne: {
      id: string;
      pos: number;
    };
    playerTwo: {
      id: string;
      pos: number;
    };
  }
  status: boolean;
}

export interface MapType {
  pos: number;
  typePos: TypePos
}

export enum TypePos {
  'initial',
  'normal',
  'quiz',
  'bonus',
  'final'
}