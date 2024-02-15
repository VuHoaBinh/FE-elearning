import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import chatApi from "src/apis/chatApi";
import FormControl from "src/components/FormControl";
import { IMessage, IUser } from "src/types";
import translateVi from "src/utils/translateVi";

import "./MessageContent.scss";
import MessageItem from "./MessageItem";

interface MessageContentProps {
  receiver?: IUser;
  conservationId?: string;
  newMessages?: IMessage;
}

const MessageContent: React.FC<MessageContentProps> = ({
  receiver,
  conservationId,
  newMessages,
}) => {
  // console.log("đã lấy được conservationId: " + conservationId);
  // console.log("đã lấy được newMessages: " + newMessages?.conversation);
  // console.log("đã lấy được receiver: ", receiver);

  const navigate = useNavigate();

  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      block: "end",
    });
  });

  useEffect(() => {
    conservationId && getConservation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conservationId]);

  useEffect(() => {
    // console.log("sadsa", [...messages, newMessage]);
    if (newMessages?.conversation === conservationId) {
      const newValue: any[] = [...messages, newMessages];
      setMessages(newValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessages]);

  const getConservation = async () => {
    // console.log("chạy", conservationId);
    const params = { limit: 20 };
    try {
      const response = await chatApi.getLatestMessage(conservationId, params);
      // console.log("response:", response);
      const { messages }: any = response;
      // console.log("messages:", messages);
      setMessages(messages.reverse());
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    if (text) {
      const params = { conversation: conservationId, text };
      // console.log("params là", params);
      try {
        await chatApi.sendMessage(params);
        // console.log("response", response);
        setText("");
      } catch (error) {
        console.log("lỗi rồi", error);
      }
    }
    // console.log("img nè", img, "text nè", text);
  };

  const renderChatMessage = (messages: IMessage[]) => {
    return (
      messages.length > 0 &&
      messages.map((message, index) => (
        <MessageItem data={message} key={index} />
      ))
    );
  };

  const handleImagePost = async (image: any) => {
    // console.log("lấy được img là", image);
    let formData = new FormData();
    formData.append("images", image);
    formData.append("conversation", conservationId || "");

    try {
      await chatApi.sendMessage(formData);
      // console.log("response", response);
      setText("");
    } catch (error) {
      console.log("lỗi rồi", error);
    }
    // setImg(upload);
  };

  return (
    <>
      {conservationId ? (
        <div className="message-content">
          <div className="receiver">
            <Avatar alt={receiver?.fullName} src={receiver?.avatar} />
            <div className="receiver-info">
              <span
                className="name"
                onClick={() =>
                  receiver?.account?.role === "teacher" &&
                  navigate(`/user/${receiver._id}`)
                }
              >
                {receiver?.fullName}
              </span>
              <span className="role">
                {translateVi(receiver?.account?.role)}
              </span>
            </div>
          </div>
          {/* messages content */}
          <div className="chat-content">
            {renderChatMessage(messages)}
            <div ref={messagesEndRef}></div>
          </div>
          <form className="chat-handle" onSubmit={handleSubmit}>
            <FormControl.Input
              value={text}
              hideErrorMessage={true}
              className="input-text"
              placeholder="Nhập nội dung đoạn chat"
              onChange={(e: any) => setText(e.target.value)}
            />
            <FormControl.InputUploadFile
              labelImg={false}
              onChange={handleImagePost}
            />
          </form>
        </div>
      ) : (
        <div className="message-block">
          <span className="message-block-text">
            Chưa có thông tin nội dung, vui lòng chọn user đế tiến thành chat
          </span>
        </div>
      )}
    </>
  );
};
export default MessageContent;
