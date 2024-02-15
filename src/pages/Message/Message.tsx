import React, { useEffect, useRef, useState } from "react";
import chatApi from "src/apis/chatApi";
import { LINK_DOMAIN } from "src/data/link";
import { IConservation, IMessage } from "src/types/chat";
import { IAccesstoken } from "src/types/token";
import { io } from "socket.io-client";
import MessageContent from "./MessageContent/MessageContent";
import MessageUser from "./MessageUser/MessageUser";
import "./Message.scss";
import { IUser } from "src/types/user";

interface MessageProps {}

const Message: React.FC<MessageProps> = () => {
  document.title = "Trò chuyện trực tuyến";

  const [conservation, setConservation] = useState<IConservation[]>([]);
  const [conservationId, setConservationId] = useState<string>();
  const [receiver, setReceiver] = useState<IUser>();
  const [indexClick, setIndexClick] = useState<number>(0);

  const [newMessage, setNewMessages] = useState<IMessage>();
  const socket = useRef<any>();

  useEffect(() => {
    const { accessToken }: IAccesstoken = JSON.parse(
      localStorage.getItem("access_token") ||
        JSON.stringify({ accessToken: "" })
    );

    // console.log("accessToken", accessToken);

    //connect
    socket.current = io(LINK_DOMAIN, {
      extraHeaders: { token: `Bearer ${accessToken}` },
    });

    //on event
    socket.current.on("send-message", (data: any) => setNewMessages(data.text));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserChatList();
  }, []);

  // id chat
  useEffect(() => {
    conservationId && markReadConservation();
    getUserChatList();
    // console.log("đâsds");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conservationId, newMessage]);

  const markReadConservation = async () => {
    try {
      await chatApi.markIsReadMessage(conservationId);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getUserChatList = async () => {
    try {
      const response = await chatApi.getUserChatList();
      // console.log(response);
      const { conversations }: any = response;
      // console.log("conversations", conversations);
      setConservation(conversations);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const renderUserChatItems = (userChatList: IConservation[]) => {
    return (
      userChatList.length > 0 &&
      userChatList.map((userItem, index) => (
        <MessageUser
          onClick={() =>
            handleChooseMessageUser(userItem._id, userItem.receiver, index + 1)
          }
          indexActive={index + 1 === indexClick}
          receiver={userItem.receiver}
          message={userItem.message}
          key={index + 1}
        />
      ))
    );
  };

  const handleChooseMessageUser = (
    conservationId?: string,
    receiver?: IUser,
    indexUser?: number
  ) => {
    setConservationId(conservationId);
    setIndexClick(indexUser || 0);
    setReceiver(receiver);
  };

  return (
    <div className="message">
      <h3 className="title">Khung trò chuyện trực tuyến</h3>
      <div className="message-container">
        <div className="message-users">
          <div className="title">Danh sách người dùng</div>
          <div className="content">{renderUserChatItems(conservation)}</div>
        </div>
        <div className="message-contents">
          <div className="title">Nội dung cuộc hội thoại</div>
          <MessageContent
            receiver={receiver}
            newMessages={newMessage}
            conservationId={conservationId}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
