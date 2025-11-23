import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Calculadoras Online Gratis - CalcuHub',
  description: 'Accede a nuestra colección de calculadoras online gratuitas. Herramientas precisas para salud, finanzas, matemáticas y uso diario.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
