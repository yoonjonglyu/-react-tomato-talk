import React from 'react';

declare module 'react-tomato-talk' {
    const ReactTomatoTalk: React.FC<ReactTomatoTalkProps>
    
    interface ReactTomatoTalkProps {
        url: string
        imageSize?: number
    }

    export default ReactTomatoTalk;
}