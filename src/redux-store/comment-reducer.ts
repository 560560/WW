import { IActionType, IComment, ICommentsState } from '../common/types';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'react';
import { RootState } from './store';
import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
import { rec } from '../common/helpers/rec';

let initialState: ICommentsState;
initialState = {
  comments: [
    {
      id: 'initial-comment-id-1',
      author: {
        id: 'initial-author-id-1',
        logo: 'https://starwars.gacv.ru/img/sections/people.png',
        name: 'Jedi',
      },
      text: 'Love the attention to detail in switching the style of the trooper helmets.',
      created: 1633198721000,
      edited: 1633199321000,
      likes: {
        isLiked: undefined,
        likesCount: 5,
        wasEvaluated: false,
        possibleToEvaluate: false,
      },
      children: [
        {
          id: 'initial-comment-id-2',
          author: {
            id: 'initial-author-id-2',
            logo: 'https://starwars.gacv.ru/img/sections/species.png',
            name: 'Aqualish',
          },
          text: 'Algunos miembros de esta raza poseían cuatro ojos, otros solo un par.',
          created: 1633198841000,
          likes: {
            isLiked: true,
            likesCount: 15,
            wasEvaluated: true,
            possibleToEvaluate: false,
          },
        },
      ],
    },
    {
      id: 'initial-comment-id-3',
      author: {
        id: 'initial-author-id-3',
        logo: 'https://starwars.gacv.ru/img/sections/vehicles.png',
        name: 'AT ST',
      },
      text:
        'Although the AT-ST is not as imposing as its larger cousin the AT-AT runner, it still served as a significant addition to the Imperial Armed Forces ' +
        'on the battlefields of the Galactic Civil War. The two-man vehicle is easily armed with chin laser cannons and side-mounted weapon carriers.',
      created: 1633202441000,
      likes: {
        isLiked: false,
        likesCount: -1,
        wasEvaluated: true,
        possibleToEvaluate: false,
      },
    },
  ],
};

const ADD_COMMENT = 'ADD_COMMENT';

export const commentReducer = (state = initialState, action: IActionType) => {
  switch (action.type) {
    case ADD_COMMENT:
      const newComment: IComment = {
        id: action.payload.id,
        likes: { possibleToEvaluate: true, isLiked: false, likesCount: 0, wasEvaluated: false },
        created: action.payload.created,
        text: action.payload.text,
        author: {
          id: action.payload.author.currentUserId,
          name: action.payload.author.currentUserName,
          logo: action.payload.author.logo,
        },
      };

      if (action.payload.isNew) {
        return { ...state, comments: [...state.comments, newComment] };
      } else {
        const newSate = cloneDeep(state);
        rec(newSate.comments, action.payload.parentId, newComment);
        return newSate;
      }
    default:
      return state;
  }
};

interface ISetNewCommentProps {
  id: string;
  created: number;
  text: string;
  author: {
    currentUserId: string;
    currentUserName: string;
    logo: string;
  };
  isNew: boolean;
  parentId?: string;
}

const setComment = (comment: ISetNewCommentProps): IActionType => {
  return { type: ADD_COMMENT, payload: comment };
};

export const addComment =
  (
    text: string,
    isNew: boolean,
    parentId?: string,
    setShowModalForComment?: React.Dispatch<React.SetStateAction<string | undefined>>
  ) =>
  async (dispatch: Dispatch<IActionType>, getState: () => RootState) => {
    try {
      const id = uuidv4();
      const created = +moment();
      const author = getState().authState;
      dispatch(setComment({ id, text, created, author, isNew, parentId }));
    } catch (e) {
      console.error(e);
    } finally {
      setShowModalForComment && setShowModalForComment(undefined);
    }
  };
