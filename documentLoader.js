import {config} from './config.js';
import {CONTEXT_MAP} from './contexts/index.js';
import {didKeyDriver} from './didKeyDriver.js';
import ky from 'ky';

const documentLoaderConfig = config.documentLoader;

export const documentLoader = async url => {
  const context = CONTEXT_MAP.get(url);
  if (context) {
    return {
      contextUrl: null,
      documentUrl: url,
      document: context,
    };
  }

  if (url.startsWith('https:') && documentLoaderConfig.insecureHttpLoader) {
    const document = await httpResolve(url);
    return {
      contextUrl: null,
      documentUrl: url,
      document,
    };
  }

  if (url.startsWith('did:key:')) {
    const document = await didKeyDriver.get({url});
    if (document) {
      return {
        contextUrl: null,
        documentUrl: url,
        document,
      };
    }
  }
  throw new Error('Context not found', url);
};

async function httpResolve(url) {
  try {
    return ky.get(url).json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
