import {didKeyDriver} from './didKeyDriver.js';
import {Ed25519Signature2020} from '@digitalcredentials/ed25519-signature-2020';
import {Ed25519VerificationKey2020} from '@digitalcredentials/ed25519-verification-key-2020';


export const createSignatureSuite = async (cryptosuite) => {
  if(cryptosuite === 'ed25519-2020') {
    const keyPair = await Ed25519VerificationKey2020.generate();
    const {methodFor} = await didKeyDriver.fromKeyPair({
      verificationKeyPair: keyPair
    });
    const assertionKeyPair = methodFor({purpose: 'assertionMethod'});
    // enable signing by adding the private key material
    assertionKeyPair.privateKeyMultibase = keyPair.privateKeyMultibase;
    const suite = new Ed25519Signature2020({key: assertionKeyPair});
    return suite;
  }

  throw new Error(`Unsupported cryptosuite: "${cryptosuite}"`);
}

export const createVerificationSuite = async () => {
  const suite = new Ed25519Signature2020();
  return [suite];
}
