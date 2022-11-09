import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
// * hooks
import {setCurrentUser} from '../../../store/modules/user';
// * components
import UserList from '@pure/user/List';

/**
 * @param {Array<User>} list
 * @param {() => void} fetchNext
 * @param {() => void} onDetail
 * @returns
 */
const List = ({list, fetchNext, onDetail}) => {
  // * event handler
  const dispatch = useDispatch();
  const goUserDetail = useCallback(
    userName => {
      dispatch(setCurrentUser(userName));
      onDetail();
    },
    [onDetail, dispatch],
  );

  return <UserList list={list} fetchNext={fetchNext} onDetail={goUserDetail} />;
};

export default List;
