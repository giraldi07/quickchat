import { RiSendPlaneFill } from "react-icons/ri";
import { useUser } from "../authentication/useUser";
import { useRef, useState } from "react";
import { useSendNewMessage } from "./useSendNewMessage";
import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
import useConvInfo from "./useConvInfo";
import EmojiPicker from '../../components/EmojiPicker';

function MessageInputBar() {
  const {
    convInfo,
    isPending: isPendingConvInfo,
    isError: isConvInfoError,
  } = useConvInfo();

  const [newMessage, setNewMessage] = useState("");
  const { isSending, sendNewMessage } = useSendNewMessage();
  const { user } = useUser();
  const conversationId = convInfo?.id;
  const friendUserId = convInfo?.friendInfo?.id;
  const myUserId = user?.id;
  const inputRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker visibility

  // Handle emoji selection from EmojiPicker
  const handleEmojiSelect = (emoji) => {
    if (emoji) {
      setNewMessage((prevMessage) => prevMessage + emoji); // Append the emoji to the message
    }
  };

  // Handle closing the emoji picker
  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false); // Hide emoji picker
  };

  function handleSendNewMessage(e) {
    e.preventDefault();
    inputRef.current.focus();

    if (!newMessage) return;

    const messageObj = {
      id: uuid(),
      conversation_id: conversationId,
      content: newMessage,
      friendUserId,

      // for optimistic update in the cache
      sender_id: myUserId,
      created_at: new Date(),
      optimistic: true,
    };

    setNewMessage("");

    // Make the actual request to the server
    sendNewMessage(messageObj, {
      onError: (_, message) => {
        setNewMessage(message.content);
      },
    });
  }

  if (isConvInfoError) return null;

  return (
    <div className="px-4 py-2">
      <form className="mx-auto grid max-w-3xl grid-cols-[1fr_auto_auto] gap-2 overflow-hidden rounded-full border border-transparent bg-bgPrimary shadow-lg dark:border-LightShade/20 dark:bg-LightShade/20">
        <label htmlFor="inputMessage" className="sr-only" />
        <input
          disabled={isPendingConvInfo}
          className="h-12 w-full bg-transparent pl-4 pr-2 outline-none"
          ref={inputRef}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Message"
          id="inputMessage"
          autoComplete="off"
        />

        {/* Emoji Button next to the input field */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="m flex items-center justify-center rounded-full p-2 text-2xl"
        >
          😊
        </button>

        {/* Send Button next to the emoji button */}
        <button
          className={`m-1 flex h-10 w-10 items-center justify-center rounded-full bg-bgAccent text-2xl text-textPrimary-dark hover:bg-bgAccentDim active:scale-95 disabled:opacity-70 dark:bg-bgAccent-dark dark:hover:bg-bgAccentDim-dark`}
          disabled={isSending || isPendingConvInfo}
          onClick={handleSendNewMessage}
          type="submit"
        >
          {isSending ? (
            <Loader size="small" />
          ) : (
            <RiSendPlaneFill aria-label="send button" />
          )}
        </button>
      </form>

      {/* Show Emoji Picker below the input if visible */}
      {showEmojiPicker && (
        <div className="absolute z-10 bottom-16 left-6 w-auto max-w-xs mt-2 px-2 py-1 rounded-lg shadow-lg dark:text-white transition-transform transform duration-300 ease-out opacity-0 animate-slide-up-fade-in">
          <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={handleCloseEmojiPicker} />
        </div>
      )}
    </div>
  );
}

export default MessageInputBar;
