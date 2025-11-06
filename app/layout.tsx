import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Poppins } from 'next/font/google';

const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display' });
const sans = Poppins({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Lesrooster | The Latin Dance Studio',
  description: 'Salsa, Bachata en Kizomba lessen ? maandag t/m donderdag',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${display.variable} ${sans.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <div className="container">
          <header className="header">
            <h1 className="header-title">The Latin Dance Studio</h1>
            <span className="header-badge">Lesrooster ? Ma t/m Do</span>
          </header>
          <main>{children}</main>
          <footer className="footer">
            <span>? {new Date().getFullYear()} The Latin Dance Studio</span>
            <span>Stijl: donker met gouden accenten</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
