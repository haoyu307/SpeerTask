import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

import axiosConfig, {configBearerToken} from '../utils/axiosConfig';
import {serviceUrl} from '../utils/constants';

const getUsersSearchList =
  (searchQuery, token) =>
  async ({pageParam}) => {
    const config = configBearerToken(token ?? '');
    const params = {
      q: searchQuery,
      page: pageParam?.page ?? 0,
      per_page: 20,
    };

    const {data} = await axiosConfig.get(serviceUrl.searchUsers, {
      params,
      ...config,
    });
    return data;
  };

const getUserDetail = async (userName, token) => {
  const config = configBearerToken(token ?? '');

  const {data} = await axiosConfig.get(
    serviceUrl.getUserDetail.replace(/%s/g, userName),
    {
      ...config,
    },
  );
  return data;
};

const getUsersFollowingList =
  (userName, token) =>
  async ({pageParam}) => {
    const config = configBearerToken(token ?? '');
    const params = {
      page: pageParam?.page ?? 0,
      per_page: 20,
    };

    const {data} = await axiosConfig.get(
      serviceUrl.getFollowingList.replace(/%s/g, userName),
      {
        params,
        ...config,
      },
    );
    return data;
  };

const getUsersFollowersList =
  (userName, token) =>
  async ({pageParam}) => {
    const config = configBearerToken(token ?? '');
    const params = {
      page: pageParam?.page ?? 0,
      per_page: 20,
    };

    const {data} = await axiosConfig.get(
      serviceUrl.getFollowersList.replace(/%s/g, userName),
      {
        params,
        ...config,
      },
    );
    return data;
  };

const useUsersSearch = (searchQuery, token) =>
  useInfiniteQuery(
    [
      'users',
      {
        type: 'search',
        query: searchQuery,
      },
    ],
    ({pageParam}) => getUsersSearchList(searchQuery, token)({pageParam}),
    {
      getNextPageParam,
      getPreviousPageParam,
    },
  );

const useUserDetail = (userName, token) =>
  useQuery(
    [
      'users',
      {
        type: 'detail',
        name: userName,
      },
    ],
    () => getUserDetail(userName, token),
    {
      enabled: userName !== '' && token !== null && token !== '',
    },
  );

const useFollowersList = (userName, token) =>
  useInfiniteQuery(
    [
      'users',
      {
        type: 'followers',
        name: userName,
      },
    ],
    ({pageParam}) => getUsersFollowersList(userName, token)({pageParam}),
    {
      getNextPageParam,
      getPreviousPageParam,
    },
  );

const useFollowingList = (userName, token) =>
  useInfiniteQuery(
    [
      'users',
      {
        type: 'followers',
        name: userName,
      },
    ],
    ({pageParam}) => getUsersFollowingList(userName, token)({pageParam}),
    {
      getNextPageParam,
      getPreviousPageParam,
    },
  );

export {useUsersSearch, useUserDetail, useFollowersList, useFollowingList};

const getNextPageParam = (lastPage, pages) => {
  // ! fetch older page
  const pageLength = lastPage.length;
  return pageLength < 10
    ? undefined
    : {
        page: pages.length + 1,
      };
};

const getPreviousPageParam = firstPage => {
  return undefined;
};
