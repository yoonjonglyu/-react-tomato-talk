import React, { useEffect, useState, useContext } from 'react';
import ChatWindow from './talk/chatWindow';
import Loading from './loading';
import Modal from './modal';
import ChatEvents from './lib/chatEvents';
import { ConfigContext } from './store/configContext';
import { ModalContext } from './store/modalContext';

const WebChat = props => {
  const {
    socket,
    config
  } = props;
  const {
    isModal
  } = useContext(ModalContext);
  const {
    handleRoom,
    handleImageSize
  } = useContext(ConfigContext);
  useEffect(() => {
    if (config?.imageSize) {
      handleImageSize(config.imageSize);
    }
  }, []);
  const Events = new ChatEvents(socket);
  const [step, setStep] = useState(0);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    Events.handleConnect(() => {
      Events.getRooms(setRooms);
    });
    Events.handleDisConnect(() => {
      setStep(1);
    });
    Events.handleError(() => {
      setStep(1);
    });
    return () => {
      socket.close();
    };
  }, [socket]);
  useEffect(() => {
    if (rooms.length > 0) {
      Events.joinRoom(rooms[0]);
      handleRoom(rooms[0]);
      setStep(2);
    }
  }, [rooms]);
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: "flex",
      flexFlow: "column wrap",
      flex: "1",
      justifyContent: "center",
      position: "relative",
      border: "1px solid #678983"
    }
  }, isModal && /*#__PURE__*/React.createElement(Modal, null), step < 2 && /*#__PURE__*/React.createElement(Loading, {
    state: step
  }), /*#__PURE__*/React.createElement(ChatWindow, {
    socket: socket
  }));
};

export default WebChat;