
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Home as HomePage } from './pages/HomePage';
import { Dashboard as DashboardPage } from './pages/DashboardPage';
import { Auth as AuthPage } from './pages/AuthPage';
import { Profile as ProfilePage } from './pages/ProfilePage';
import { Diagnostics as DiagnosticsPage } from './pages/DiagnosticsPage';
import { BMI as BMIPage } from './pages/Tools/BMIPage';
import { QuestionsPage } from './pages/QuestionsPage';
import { ShopPage } from './pages/ShopPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="auth" element={<AuthPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="diagnostics" element={<DiagnosticsPage />} />
                <Route path="onboarding" element={<QuestionsPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="tools">
                    <Route path="bmi" element={<BMIPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
