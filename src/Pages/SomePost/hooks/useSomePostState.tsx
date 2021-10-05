import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux-store/store';
import isEqual from 'lodash/isEqual';
import { submitNewPostCb } from '../helpers/submitNewPostCb';
import { useState } from 'react';

export const useSomePostState = () => {
  const dispatch = useDispatch();

  const comments = useSelector((state: RootState) => state.commentsState.comments, isEqual);
  const userName =
    useSelector((state: RootState) => state.authState.currentUserName, isEqual) || '';

  const [textareaValue, setTextareaValue] = useState('');

  const submitNewPost = submitNewPostCb(textareaValue, dispatch, setTextareaValue);

  return {
    comments,
    userName,
    textareaValue,
    setTextareaValue,
    submitNewPost,
  };
};
