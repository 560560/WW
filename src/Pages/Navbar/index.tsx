import React, { FunctionComponent } from 'react';
import styles from './styles.module.sass';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import isEqual from 'lodash/isEqual';

const Navbar: FunctionComponent = () => {
  const userAvatar = useSelector((state: RootState) => state.authState.logo, isEqual);
  const userName =
    useSelector((state: RootState) => state.authState.currentUserName, isEqual) || '';
  return (
    <nav className={styles.navbar}>
      <div>LOGO</div>
      <div>
        <span>{userName}</span>
        <img src={userAvatar} alt="avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
