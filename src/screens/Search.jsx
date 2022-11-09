import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
// * hooks
import {useUsersSearch} from '@service/userQueries';
// * components
import UserList from '@container/user/List';
// * constants
import {token} from '@util/constants';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [usersList, setUsersList] = useState([]);

  // * fetch data
  const {status, data, fetchNextPage, hasNextPage} = useUsersSearch(
    search,
    token,
  );
  useEffect(() => {
    if (status === 'success') {
      const newUsers = [];
      data.pages.forEach(_ => {
        newUsers.push(..._.items);
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

  // * event handler
  const onDetail = useCallback(() => {
    navigation.navigate('Detail');
  }, [navigation]);

  return (
    <View style={Styles.container}>
      <TextInput
        value={search}
        style={Styles.searchBox}
        onChangeText={setSearch}
        placeholder="Search"
        placeholderTextColor={'#f0f0f0'}
      />
      <UserList list={usersList} fetchNext={fetchNext} onDetail={onDetail} />
    </View>
  );
};

export default SearchScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchText: {
    color: '#000',
  },
  searchBox: {
    marginTop: 10,
    marginLeft: 26,
    marginRight: 26,
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderColor: '#888',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    color: '#000',
  },
});
