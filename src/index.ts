import { Base64 } from 'js-base64';

export interface IContext {
  postMessage: (message: any) => void;
}

export interface CallHandlerOptions {
  context?: IContext;
}

export interface HandlerCleanup {
  destroy: () => void;
}

const callHandler = (inName: string, inPayload: any, inOptions: CallHandlerOptions = {}) => {
  const _payload = typeof inPayload === 'string' ? inPayload : JSON.stringify(inPayload);
  const payload = Base64.encode(_payload);
  const defaultContext = typeof window !== 'undefined' ? window : ({} as any);
  const options = { ...inOptions, context: defaultContext };
  options.context.postMessage({ name: inName, payload });
};

const registerHandler = (
  inName: string,
  inHandler: (data: any, callback: (data: any) => void) => void,
  inOptions?: CallHandlerOptions
): HandlerCleanup => {
  const defaultContext = typeof window !== 'undefined' ? window : ({} as any);
  const options = { ...inOptions, context: inOptions?.context || defaultContext };
  const messageHandler = (event: MessageEvent) => {
    const { name, payload } = event.data;
    if (name === inName) {
      const decodedPayload = Base64.decode(payload);
      let data: string | null = null;

      try {
        data = JSON.parse(decodedPayload);
      } catch (e) {
        data = decodedPayload;
      }

      inHandler(data, (response) => {
        const responseName = `${inName}:response`;
        callHandler(responseName, response, options);
      });
    }
  };

  options.context.addEventListener?.('message', messageHandler);

  // Return cleanup function
  return {
    destroy: () => {
      options.context.removeEventListener?.('message', messageHandler);
    }
  };
};

export default {
  callHandler,
  registerHandler
};
