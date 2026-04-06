'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Dashboard', icon: '⚡' },
  { href: '/topics', label: 'Topics', icon: '📚' },
  { href: '/pyqs', label: 'PYQs', icon: '📝' },
  { href: '/progress', label: 'Progress', icon: '📊' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { hours, minutes, seconds, days, passed } = useCountdown();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass no-print">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🧮</span>
            <span className="font-bold text-lg gradient-text hidden sm:block">DM Study Hub</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href} className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white">
                  {active && (
                    <motion.div layoutId="navbar-active" className="absolute inset-0 bg-[#7c3aed]/20 rounded-lg border border-[#7c3aed]/30" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{link.icon}</span>
                    <span className={active ? 'text-white' : 'text-[#64748b]'}>{link.label}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border ${passed ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-[#7c3aed]/20 border-[#7c3aed]/50 text-[#7c3aed]'}`}
            >
              {passed ? '🔥 EXAM TIME!' : `⏰ ${days > 0 ? `${days}d ` : ''}${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`}
            </motion.div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-[#64748b] hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-16 left-0 right-0 z-40 glass border-t border-[#7c3aed]/10 md:hidden"
        >
          <div className="p-4 flex flex-col gap-2">
            {links.map(link => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active ? 'bg-[#7c3aed]/20 text-white' : 'text-[#64748b] hover:text-white hover:bg-white/5'}`}>
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[#7c3aed]/10 md:hidden no-print">
        <div className="flex justify-around py-2">
          {links.map(link => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link key={link.href} href={link.href} className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs ${active ? 'text-[#7c3aed]' : 'text-[#64748b]'}`}>
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
