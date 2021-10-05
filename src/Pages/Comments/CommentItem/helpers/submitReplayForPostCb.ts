import React, { Dispatch } from 'react';
import { addComment } from '../../../../redux-store/comment-reducer';

export const submitReplayForPostCb = (
  text: string | undefined,
  dispatch: Dispatch<any>,
  setTextareaValue: React.Dispatch<React.SetStateAction<string>>,
  parentId: string,
  setShowModalForComment: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  return () => {
    text && dispatch(addComment(text, false, parentId, setShowModalForComment));
    setTextareaValue('');
  };
};
