const currentUserSelector = state => state.user.currentUserName;
const currentFollowingsSelector = state => state.user.currentFollowings;
const currentFollowersSelector = state => state.user.currentFollowers;

export {
  currentUserSelector,
  currentFollowingsSelector,
  currentFollowersSelector,
};
