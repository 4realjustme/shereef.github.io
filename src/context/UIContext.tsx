import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
    isChatOpen: boolean;
    setChatOpen: (open: boolean) => void;
    toggleChat: () => void;
    isSidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [isChatOpen, setChatOpen] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleChat = () => setChatOpen((prev) => !prev);
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <UIContext.Provider value={{
            isChatOpen, setChatOpen, toggleChat,
            isSidebarOpen, setSidebarOpen, toggleSidebar
        }}>
            {children}
        </UIContext.Provider>
    );
};


export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
