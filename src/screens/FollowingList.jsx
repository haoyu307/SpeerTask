import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
// * hooks
import {currentUserSelector} from '../store/selectors/user';
import {useFollowingList} from '../services/userQueries';
// * components
import UserList from '@container/user/List';
// * constants
import {token} from '@util/constants';

const FollowingList = ({navigation}) => {
  const currentUserName = useSelector(currentUserSelector);
  const [usersList, setUsersList] = useState([]);
  // * fetch data
  const {status, data, fetchNextPage, hasNextPage} = useFollowingList(
    currentUserName,
    token,
  );
  useEffect(() => {
    if (status === 'success') {
      const newUsers = [];
      data.pages.forEach(_ => {
        newUsers.push(..._);
      });
      setUsersList(newUsers);
    } else if (status === 'error') {
      setUsersList([]);
    }
  }, [status, data]);
  const fetchNext = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  const onDetail = useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <UserList list={usersList} fetchNext={fetchNext} onDetail={onDetail} />
    </View>
  );
};

export default FollowingList;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
