import { useMessageStore } from "../components/Store/useMessageStore";
import { createContext, useContext } from "react";

const MessageContext = createContext<ReturnType<typeof useMessageStore>| null>(null);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useMessageStore();

  return (
    <MessageContext.Provider value={store}>
      {children}
    </MessageContext.Provider>
  );

};

export const useMessage = () => useContext(MessageContext)!;