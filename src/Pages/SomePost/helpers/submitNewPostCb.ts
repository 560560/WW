import React, { Dispatch } from 'react';
import { addComment } from '../../../redux-store/comment-reducer';

export const submitNewPostCb = (
  text: string | undefined,
  dispatch: Dispatch<any>,
  setTextareaValue: React.Dispatch<React.SetStateAction<string>>
) => {
  return () => {
    text && dispatch(addComment(text, true));
    setTextareaValue('');
  };
};
