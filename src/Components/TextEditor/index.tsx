import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';

interface ITextEditorProps {
  textareaValue: string;
  setTextareaValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmitCb: () => void;
}

const TextEditor: FunctionComponent<ITextEditorProps> = ({
  textareaValue,
  setTextareaValue,
  onSubmitCb,
}) => {
  return (
    <div className={styles.editorWrapper}>
      <textarea
        value={textareaValue}
        onChange={(event) => {
          setTextareaValue(event.target.value);
        }}
        placeholder={'What are your thoughts'}
      />

      <div className={styles.editorControls}>
        <button form="newCommentTextarea" onClick={onSubmitCb}>
          Comment
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
