import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NetworkType } from '@portkey/rn-sdk/src/packages/types';
import { NetworkList } from '@portkey/rn-sdk/src/packages/constants/constants-ca/network';
import { graphQLClientProvider } from '@portkey/rn-sdk/src/packages/graphql/client';

export const networkClientMap: Record<string, ApolloClient<NormalizedCacheObject>> = {};

export const getApolloClient = (networkType: NetworkType) => {
  if (!networkClientMap[networkType]) {
    const graphqlUrl = NetworkList.find(item => item.networkType === networkType)?.graphqlUrl || '';
    networkClientMap[networkType] = graphQLClientProvider(graphqlUrl);
  }
  return networkClientMap[networkType];
};
