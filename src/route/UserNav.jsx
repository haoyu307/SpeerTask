import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HeaderBackButton} from '@react-navigation/elements';
// * hooks
import {
  currentFollowersSelector,
  currentFollowingsSelector,
  currentUserSelector,
} from '../store/selectors/user';
// * components
import SearchScreen from '@screen/Search';
import DetailScreen from '@screen/Detail';
import FollowersScreen from '@screen/FollowersList';
import FollowingScreen from '@screen/FollowingList';
// * assets
import SearchIcon from '@svg/search.svg';

const Tab = createBottomTabNavigator();

const UserNav = () => {
  const currentUserName = useSelector(currentUserSelector);
  const currentFollowingsNumber = useSelector(currentFollowingsSelector);
  const currentFollowersNumber = useSelector(currentFollowersSelector);

  return (
    <Tab.Navigator
      initialRouteName="Search"
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'none',
          backgroundColor: '#333',
        },
      }}>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarInactiveTintColor: '#000000DF',
          tabBarActiveTintColor: '#007affFF',
        }}
      />
      <Tab.Screen
        name="Detail"
        component={DetailScreen}
        options={({navigation}) => ({
          headerTitle: `${currentUserName ?? ''}'s Detail`,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#000"
              onPress={_ => navigation.goBack()}
            />
          ),
          tabBarInactiveTintColor: '#000000DF',
          tabBarActiveTintColor: '#007affFF',
        })}
      />
      <Tab.Screen
        name="Followers"
        component={FollowersScreen}
        options={({navigation}) => ({
          headerTitle: `${
            currentUserName ?? ''
          }'s Followers (${currentFollowersNumber})`,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#000"
              onPress={_ => navigation.goBack()}
            />
          ),
          headerRight: props => (
            <SearchButton
              {...props}
              onPress={_ => navigation.navigate('Search')}
            />
          ),
          tabBarInactiveTintColor: '#000000DF',
          tabBarActiveTintColor: '#007affFF',
        })}
      />
      <Tab.Screen
        name="Followings"
        component={FollowingScreen}
        options={({navigation}) => ({
          headerTitle: `${
            currentUserName ?? ''
          }'s Followings (${currentFollowingsNumber})`,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              tintColor="#000"
              onPress={_ => navigation.goBack()}
            />
          ),
          headerRight: props => (
            <SearchButton
              {...props}
              onPress={_ => navigation.navigate('Search')}
            />
          ),
          tabBarInactiveTintColor: '#000000DF',
          tabBarActiveTintColor: '#007affFF',
        })}
      />
    </Tab.Navigator>
  );
};

export default UserNav;

const SearchButton = props => (
  <TouchableOpacity
    onPress={props.onPress}
    activeOpacity={0.8}
    style={{
      marginRight: 10,
    }}>
    <SearchIcon
      width={20}
      height={20}
      style={{
        color: '#000',
      }}
    />
  </TouchableOpacity>
);
