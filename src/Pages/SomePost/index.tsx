import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import Comments from '../Comments';
import { useSomePostState } from './hooks/useSomePostState';
import TextEditor from '../../Components/TextEditor';

const SomePost: FunctionComponent = () => {
  const { comments, userName, textareaValue, setTextareaValue, submitNewPost } = useSomePostState();

  return (
    <div className={styles.postContainer}>
      <div className={styles.post}>
        <header>Some Post</header>

        <div className={styles.postContent}>
          <img src="https://live.staticflickr.com/7069/6935256764_6598249f27_b.jpg" alt="post" />
        </div>

        <p className={styles.userInfo}>
          Comment as <span>{userName}</span>
        </p>

        <TextEditor
          textareaValue={textareaValue}
          setTextareaValue={setTextareaValue}
          onSubmitCb={submitNewPost}
        />

        <Comments comments={comments} />
      </div>
    </div>
  );
};

export default SomePost;
