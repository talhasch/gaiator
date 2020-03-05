import blockStack from 'blockstack';

const HUB_URL = 'https://hub.blockstack.org';
const BLOCKSTACK_API_URL = 'https://core.blockstack.org';

const ownerPrivateKey = blockStack.makeECPrivateKey();
const transitPrivateKey = blockStack.makeECPrivateKey();

const makeFakeAuthResponseToken = (appPrivateKey) => {
  window.localStorage.setItem('blockstack-transit-private-key', transitPrivateKey);

  return blockStack.makeAuthResponse(
    ownerPrivateKey,
    {type: '@Person', accounts: []},
    null,
    {},
    null,
    appPrivateKey,
    undefined,
    null,
    HUB_URL,
    blockStack.config.network.blockstackAPIUrl,
    null
  );
};

export const gaiaAuth = (appPrivateKey) => {
  const authSessionToken = makeFakeAuthResponseToken(appPrivateKey, HUB_URL);
  const nameLookupUrl = BLOCKSTACK_API_URL + '/v1/names/';
  return blockStack.handlePendingSignIn(nameLookupUrl, authSessionToken, transitPrivateKey);
};
