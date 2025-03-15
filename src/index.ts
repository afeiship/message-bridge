import { Base64 } from 'js-base64';

interface CallHandlerOptions {
  context?: {
    postMessage: (message: any) => void;
  };
}

const callHandler = (inName: string, inPayload: any, inOptions: CallHandlerOptions = {}) => {
  const _payload = typeof inPayload === 'string' ? inPayload : JSON.stringify(inPayload);
  const payload = Base64.encode(_payload);
  const defaultContext = typeof window !== 'undefined' ? window : ({} as any);
  const options = { ...inOptions, context: defaultContext };
  options.context.postMessage({ name: inName, payload });
};

const registerHandler = () => {};

export default {
  callHandler,
  registerHandler
};
