import React from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

// * assets
import StarIcon from '@svg/star.svg';
import ArrowRightIcon from '@svg/arrow_right.svg';

/**
 *
 * @param {Array<User>} list
 * @param {() => void} fetchNext
 * @param {(name: string) => void} onDetail
 * @returns
 */
const List = ({list, fetchNext, onDetail}) => {
  const renderItem = ({item}) => <UserItem {...item} onDetail={onDetail} />;

  return (
    <FlatList
      data={list}
      renderItem={renderItem}
      ListEmptyComponent={EmptyComponent}
      onScrollEndDrag={fetchNext}
      contentContainerStyle={Styles.listContainer}
      keyExtractor={(_, index) => `user-item-${_.id}-${index}`}
    />
  );
};

export default List;

const UserItem = item => {
  return (
    <View style={Styles.itemRow}>
      <Image
        source={{
          uri: item.avatar_url,
        }}
        style={Styles.itemAvatar}
      />
      <View style={Styles.itemLabelSection}>
        <View style={Styles.itemFirstRow}>
          <Text style={Styles.username}>{item.login}</Text>
        </View>
        <View style={Styles.itemSecondRow}>
          <StarIcon width={15} height={15} />
          <Text style={Styles.starCount}>{item.score}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => item.onDetail(item.login)}
        activeOpacity={0.8}
        style={Styles.itemGoIcon}>
        <ArrowRightIcon width={13} height={13} style={Styles.itemGoIcon} />
      </TouchableOpacity>
    </View>
  );
};

const EmptyComponent = () => {
  return (
    <View style={Styles.emptyContainer}>
      <Text style={Styles.emptyDesc}>Not found</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemRow: {
    paddingVertical: 5,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#888',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  itemLabelSection: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemSecondRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemGoIcon: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#888',
  },
  username: {
    fontSize: 18,
  },
  starCount: {
    marginLeft: 5,
    fontSize: 15,
  },
  emptyContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
