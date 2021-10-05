import React, { FunctionComponent, useState } from 'react';
import { IComment } from '../../common/types';
import CommentItem from './CommentItem';

interface ICommentsProps {
  comments: IComment[];
}

const Comments: FunctionComponent<ICommentsProps> = ({ comments }) => {
  const [showModalForComment, setShowModalForComment] = useState<string | undefined>(undefined);
  return (
    <>
      {comments?.length &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            showModalForComment={showModalForComment}
            setShowModalForComment={setShowModalForComment}
            parentId={comment.id}
          />
        ))}
    </>
  );
};

export default Comments;
