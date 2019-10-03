declare module 'deck.gl';
declare module 'luma.gl';
declare module '@deck.gl/react';
declare module '@deck.gl/core';
declare module '@deck.gl/layers';
declare module '@deck.gl/mesh-layers';
declare module '@luma.gl/core';
declare module '@luma.gl/addons';
declare module '@loaders.gl/core';
declare module '@deck.gl/aggregation-layers';
declare module '@deck.gl/geo-layers';

declare module 'siriwave';
declare namespace webkitSpeechRecognition {
  export default SpeechRecognition;
}

declare namespace webkitSpeechGrammarList {
  export default SpeechGrammarList;
}

interface IAction<T, P = {}> {
  type: T;
  payload: P;
}
