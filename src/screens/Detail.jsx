import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
// * hooks
import {currentUserSelector} from '@store/selectors/user';
import {setCurrentFollowers, setCurrentFollowings} from '../store/modules/user';
import {useUserDetail} from '@service/userQueries';
// * constants
import {token} from '@util/constants';

const DetailScreen = ({navigation}) => {
  const currentUserName = useSelector(currentUserSelector);
  // * fetch
  const userDetailResult = useUserDetail(currentUserName, token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDetailResult.isSuccess) {
      dispatch(setCurrentFollowings(userDetailResult.data.following));
      dispatch(setCurrentFollowers(userDetailResult.data.followers));
    }
  }, [userDetailResult.isSuccess, userDetailResult.data]);
  // * event handlers
  const onFollowers = useCallback(() => {
    navigation.navigate('Followers');
  }, [navigation]);
  const onFollowings = useCallback(() => {
    navigation.navigate('Followings');
  }, [navigation]);

  return userDetailResult.isSuccess ? (
    <View style={Styles.container}>
      <FastImage
        source={{uri: userDetailResult.data.avatar_url}}
        style={Styles.avatar}
      />
      <View style={Styles.nameSection}>
        <Text style={Styles.nameText}>{userDetailResult.data.name}</Text>
        <Text style={Styles.usernameText}>{userDetailResult.data.login}</Text>
        <Text numberOfLines={3} style={Styles.descText}>
          {userDetailResult.data.bio}
        </Text>
      </View>
      <View style={Styles.statisticsSection}>
        <TouchableOpacity
          onPress={onFollowers}
          activeOpacity={0.9}
          style={Styles.statisticsRow}>
          <Text style={Styles.statisticsLabel}>Followers:</Text>
          <Text style={Styles.statisticsValue}>
            {userDetailResult.data.followers}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFollowings}
          activeOpacity={0.9}
          style={Styles.statisticsRow}>
          <Text style={Styles.statisticsLabel}>Followings:</Text>
          <Text style={Styles.statisticsValue}>
            {userDetailResult.data.following}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

export default DetailScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 25,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameSection: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  usernameText: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: '300',
  },
  descText: {
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '300',
  },
  statisticsSection: {
    marginTop: 25,
    flexDirection: 'column',
    alignItems: 'center',
  },
  statisticsRow: {
    marginTop: 10,
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statisticsLabel: {
    fontSize: 17,
  },
  statisticsValue: {
    fontSize: 17,
  },
});
