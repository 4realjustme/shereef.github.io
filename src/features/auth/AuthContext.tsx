import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface UserProfile {
    email: string;
    name: string;
    joinDate: string;
    stats?: {
        bmi: number;
        weight: number;
        height: number;
        lastCheck: string;
    };
}

interface AuthContextType {
    user: UserProfile | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string) => Promise<boolean>; // Simulates sending OTP
    verifyOtp: (code: string) => Promise<boolean>; // Simulates verifying OTP
    logout: () => void;
    updateStats: (stats: UserProfile['stats']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [tempEmail, setTempEmail] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Hydrate from localStorage on boot
    useEffect(() => {
        const storedUser = localStorage.getItem('hm_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string): Promise<boolean> => {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setTempEmail(email);
        setIsLoading(false);
        return true; // OTP "sent"
    };

    const verifyOtp = async (code: string): Promise<boolean> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (code === '1234') {
            const newUser: UserProfile = {
                email: tempEmail!,
                name: tempEmail!.split('@')[0],
                joinDate: new Date().toLocaleDateString(),
                stats: user?.stats // preserve stats if re-logging in
            };

            setUser(newUser);
            localStorage.setItem('hm_user', JSON.stringify(newUser));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        setTempEmail(null);
        localStorage.removeItem('hm_user');
    };

    const updateStats = (stats: UserProfile['stats']) => {
        if (!user) return;
        const updatedUser = { ...user, stats };
        setUser(updatedUser);
        localStorage.setItem('hm_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            verifyOtp,
            logout,
            updateStats
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
