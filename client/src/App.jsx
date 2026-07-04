import { AnimatePresence } from 'framer-motion';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <AppRoutes />
    </AnimatePresence>
  );
}
