export interface IActionType {
  type: string;
  payload?: any;
}

export interface IComment {
  id: string;
  author: {
    id: string;
    logo?: string;
    name: string;
  };
  text: string;
  created: number;
  edited?: number;
  likes: {
    isLiked?: boolean;
    likesCount: number;
    wasEvaluated: boolean;
    possibleToEvaluate: boolean;
  };
  children?: IComment[];
}

export interface ICommentsState {
  comments: IComment[];
}
