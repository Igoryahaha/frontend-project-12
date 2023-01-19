import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatProvider.jsx';

const useChat = () => useContext(ChatContext);

export default useChat;
