import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import Empregabilidade from './pages/Empregabilidade';
import GuiaPratico from './pages/GuiaPratico';
import Microlearning from './pages/Microlearning';
import MapaDaVida from './pages/MapaDaVida';
import CaminhosEstudo from './pages/CaminhosEstudo';
import Glossario from './pages/Glossario';
import Settings from './pages/Settings';
import VozesDaTrilha from './pages/VozesDaTrilha';
import AdminVozes from './pages/AdminVozes';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-40%', opacity: 0 },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        style={{ position: 'absolute', width: '100%', top: 0, left: 0, minHeight: '100dvh' }}
      >
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/empregabilidade" element={<Empregabilidade />} />
            <Route path="/guia-pratico" element={<GuiaPratico />} />
            <Route path="/microlearning" element={<Microlearning />} />
            <Route path="/mapa-da-vida" element={<MapaDaVida />} />
            <Route path="/caminhos" element={<CaminhosEstudo />} />
            <Route path="/glossario" element={<Glossario />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/vozes" element={<VozesDaTrilha />} />
            <Route path="/admin-vozes" element={<AdminVozes />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <AnimatedRoutes />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <AuthenticatedApp />
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App