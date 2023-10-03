import * as didMethodKey from '@digitalbazaar/did-method-key';
import {Ed25519VerificationKey2020} from '@digitalbazaar/ed25519-verification-key-2020';

const SUPPORTED_KEY_TYPES = [
  {
    handler: Ed25519VerificationKey2020,
    multibaseMultikeyHeader: 'z6Mk',
  },
];

export const didKeyDriver = didMethodKey.driver();
for (const {handler, multibaseMultikeyHeader} of SUPPORTED_KEY_TYPES) {
  didKeyDriver.use({multibaseMultikeyHeader, fromMultibase: handler.from});
}
