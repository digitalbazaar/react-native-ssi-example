import {
  createSignatureSuite,
  createVerificationSuite,
} from './dataIntegrity.js';
import * as vcreds from './vcreds.js';
import {CREDENTIALS} from './credentials/index.js';

export async function start() {
  // signing
  const signatureSuite = await createSignatureSuite('ed25519-2020');

  const credentials = [CREDENTIALS.alumni, CREDENTIALS.prc, CREDENTIALS.jff3];
  const signedCredentials = [];

  // intentionally non-performant for increased readability
  for (const credential of credentials) {
    const signedCredential = await vcreds.issue({credential, signatureSuite});
    signedCredentials.push(signedCredential);
  }

  console.log('signed credentials', signedCredentials);

  const id = `urn:example:generate-id-${Date.now()}`;
  const holder = `urn:example:holder-id`;

  const presentation = vcreds.createPresentation({
    id,
    holder,
    verifiableCredential: signedCredentials,
  });

  const challenge = `challenge-${Date.now()}`;
  const domain = 'domain';
  const vp = await vcreds.signPresentation({
    presentation,
    signatureSuite,
    challenge,
    domain,
  });

  console.log('vp', vp);

  // verifying
  const verificationSuite = await createVerificationSuite();

  const vcVerificationResults = [];
  // intentionally non-performant for increased readability
  for (const signedCredential of signedCredentials) {
    const result = await vcreds.verifyCredential({
      signedCredential,
      verificationSuite,
    });
    if (result.error) {
      throw result.error;
    }
    vcVerificationResults.push(result);
  }

  console.log('verify credential result(s)', vcVerificationResults);

  const presentationVerificationResults = await vcreds.verify({
    presentation: vp,
    verificationSuite,
    challenge,
    domain,
  });

  console.log('verify presentation result', presentationVerificationResults);
}
