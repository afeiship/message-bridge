import { Base64 } from 'js-base64';

// https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
declare const wx: any;

// 在文件顶部添加类型声明
declare global {
  interface Window {
    __wxjs_environment?: 'miniprogram' | string;
  }
}


export interface IContext {
  postMessage: (message: any) => void;
}

export interface CallHandlerOptions {
  context?: IContext;
  targetOrigin?: string;
}

export interface HandlerCleanup {
  destroy: () => void;
}

class Encoder {
  public static encode = (obj: any) => {
    const isMiniProgram =
      typeof wx !== 'undefined' && window['__wxjs_environment'] === 'miniprogram';
    if (isMiniProgram) return this.encodeMpData(obj);
    if (typeof obj === 'string') return Base64.encode(obj);
    return Base64.encode(JSON.stringify(obj));
  };

  public static decode = (str: string) => {
    const decoded = Base64.decode(str);
    try {
      return JSON.parse(decoded);
    } catch (e) {
      return decoded;
    }
  };

  public static encodeMpData = (data: any) => {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    return data;
  };
}

const callHandler = (inName: string, inPayload: any, inOptions: CallHandlerOptions = {}) => {
  const payload = Encoder.encode(inPayload);
  const defaultContext = typeof window !== 'undefined' ? window : ({} as any);
  const options = { context: defaultContext, ...inOptions };
  const targetOrigin = options.targetOrigin || '*';
  const data = { name: inName, payload };

  const isMiniProgram = typeof wx !== 'undefined' && window['__wxjs_environment'] === 'miniprogram';
  if (isMiniProgram) return options.context.postMessage({ data });
  options.context.postMessage(data, targetOrigin);
};

const registerHandler = (
  inName: string,
  inHandler: (data: any, callback: (data: any) => void) => void,
  inOptions?: CallHandlerOptions
): HandlerCleanup => {
  const defaultContext = typeof window !== 'undefined' ? window : ({} as any);
  const options = { context: inOptions?.context || defaultContext, ...inOptions };
  const messageHandler = (event: MessageEvent) => {
    const { name, payload } = event.data;
    if (name === inName) {
      const data = Encoder.decode(payload);
      inHandler({ name: inName, payload: data }, (response) => {
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

export { callHandler, registerHandler, Encoder };
