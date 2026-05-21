import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Copy, Check } from 'lucide-react';

const shareOptions = [
  {
    name: 'WhatsApp',
    icon: '📱',
    color: 'bg-green-500',
    getUrl: (url: string, text: string) => 
      `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
  },
  {
    name: 'Twitter / X',
    icon: '🐦',
    color: 'bg-black',
    getUrl: (url: string, text: string) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Facebook',
    icon: '👤',
    color: 'bg-blue-600',
    getUrl: (url: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'bg-blue-700',
    getUrl: (url: string, text: string) => 
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
  {
    name: 'Telegram',
    icon: '✈️',
    color: 'bg-sky-500',
    getUrl: (url: string, text: string) => 
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
];

interface ShareButtonsProps {
  title?: string;
  text?: string;
}

export default function ShareButtons({ 
  title = 'Instagram Milionário',
  text = 'A melhor plataforma para crescer no Instagram! Do zero ao viral com propósito. 🚀'
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = (option: typeof shareOptions[0]) => {
    const shareUrl = option.getUrl(url, text);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <>
      {/* Floating Share Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-20 z-40 w-12 h-12 rounded-full bg-dark-secondary border border-white/10 flex items-center justify-center shadow-lg hover:border-[var(--theme-primary)] transition-colors group"
      >
        <Share2 size={20} className="text-text-secondary group-hover:text-[var(--theme-primary)] transition-colors" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-sm w-full p-6 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <span className="text-4xl block mb-2">🔗</span>
                <h3 className="font-playfair text-xl font-bold text-text-primary">{title}</h3>
                <p className="text-text-muted text-sm mt-1">Compartilhe com quem precisa crescer!</p>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {shareOptions.map((option) => (
                  <motion.button
                    key={option.name}
                    onClick={() => share(option)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl ${option.color} flex items-center justify-center text-xl shadow-lg mx-auto`}
                    title={option.name}
                  >
                    {option.icon}
                  </motion.button>
                ))}
              </div>

              {/* Copy Link */}
              <div className="bg-dark-primary/50 rounded-xl p-3 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={url}
                  className="flex-1 bg-transparent text-text-secondary text-sm truncate focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
                  style={{ background: copied ? 'var(--theme-gradient)' : 'transparent', color: copied ? 'var(--color-dark-primary)' : 'var(--theme-primary)', border: copied ? 'none' : '1px solid var(--theme-primary)' }}
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copiar
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
