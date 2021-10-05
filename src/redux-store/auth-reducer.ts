import { IActionType } from '../common/types';

interface IAuthState {
  currentUserId: string;
  logo: string;
  currentUserName: string;
}

const initialState: IAuthState = {
  currentUserId: 'initial-comment-id-1',
  logo: 'https://starwars.gacv.ru/img/sections/people.png',
  currentUserName: 'Jedi',
};

export const authReducer = (state = initialState, action: IActionType) => {
  switch (action.type) {
    default:
      return state;
  }
};
