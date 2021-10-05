import { IComment } from '../types';

export const rec = (arr: IComment[] | undefined, id: string, newComment: IComment) => {
  if (!arr) return;

  for (let el of arr) {
    if (el.id === id) {
      if (el.children) {
        el.children = [...el.children, newComment];
      } else {
        el.children = [newComment];
      }

      return;
    }

    rec(el.children, id, newComment);
  }
};
