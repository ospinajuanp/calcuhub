import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Página no encontrada | CalcuHub',
  description: 'La página que buscas no existe. Explora nuestras calculadoras disponibles.',
};

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Página no encontrada</p>
        <p className="not-found-description">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link href="/" className="button not-found-button">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}