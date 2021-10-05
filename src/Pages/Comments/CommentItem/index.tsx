import React, { FunctionComponent, useState } from 'react';
import styles from './styles.module.sass';
import { IComment } from '../../../common/types';
import moment from 'moment';
import cn from 'classnames';
import { ImArrowUp } from 'react-icons/im';
import { ImArrowDown } from 'react-icons/im';

import { useDispatch } from 'react-redux';
import { submitReplayForPostCb } from './helpers/submitReplayForPostCb';
import TextEditor from '../../../Components/TextEditor';

interface ICommentItemProps {
  comment: IComment;
  showModalForComment: string | undefined;
  setShowModalForComment: React.Dispatch<React.SetStateAction<string | undefined>>;
  parentId: string;
}

const CommentItem: FunctionComponent<ICommentItemProps> = ({
  comment,
  showModalForComment,
  setShowModalForComment,
  parentId,
}) => {
  const dispatch = useDispatch();
  const [textareaValue, setTextareaValue] = useState('');
  const submitReplayForPost = submitReplayForPostCb(
    textareaValue,
    dispatch,
    setTextareaValue,
    parentId,
    setShowModalForComment
  );

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.userInfo}>
        <img src={comment.author.logo} alt="logo" />
        <div className={styles.userName}>{comment.author.name || ''}</div>
        <div className={cn(styles.commentDates)}>{moment(comment.created).fromNow() || ''}</div>
        {comment.edited && (
          <div className={cn(styles.commentDates, styles.edited)}>
            {`edited ${moment(comment.edited).fromNow()}` || ''}
          </div>
        )}
      </div>

      <div className={styles.commentAndControls}>
        <div className={styles.comment}>
          <span>{comment.text}</span>
        </div>

        <div className={styles.controls}>
          <ImArrowUp
            className={cn(
              styles.like,
              comment.likes.wasEvaluated && comment.likes.isLiked && styles.active
            )}
          />

          <span>{comment.likes.likesCount}</span>

          <ImArrowDown
            className={cn(
              styles.dislike,
              comment.likes.wasEvaluated && !comment.likes.isLiked && styles.active
            )}
          />

          <button
            className={styles.replyButton}
            onClick={() =>
              showModalForComment && showModalForComment === comment.id
                ? setShowModalForComment(undefined)
                : setShowModalForComment(comment.id)
            }
          >
            Reply
          </button>
        </div>
        {showModalForComment === comment.id && (
          <div style={{ padding: '15px 0' }}>
            <TextEditor
              textareaValue={textareaValue}
              setTextareaValue={setTextareaValue}
              onSubmitCb={submitReplayForPost}
            />
          </div>
        )}
        {comment.children?.length &&
          comment.children.map((nestedComment) => (
            <CommentItem
              key={nestedComment.id}
              comment={nestedComment}
              showModalForComment={showModalForComment}
              setShowModalForComment={setShowModalForComment}
              parentId={nestedComment.id}
            />
          ))}
      </div>
    </div>
  );
};

export default CommentItem;
