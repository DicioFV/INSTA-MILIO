import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { modules } from '../data/modules';

// Conteúdo interno de cada módulo
const moduleContent: Record<string, React.ReactNode> = {
  'comecar-do-zero': <ComecarDoZeroContent />,
  'reels-perfeitos': <ReelsPerfeitosContent />,
  'instaqui': <InstaquiContent />,
  'agente-ia': <AgenteIAContent />,
  'analise-perfil': <AnalisePerfilContent />,
  'erros-instagram': <ErrosContent />,
  'virais': <ViraisContent />,
};

function CheckItem({ text, defaultChecked = false }: { text: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button onClick={() => setChecked(!checked)} className="flex items-start gap-3 text-left w-full py-2 group">
      {checked ? (
        <CheckSquare size={20} className="text-success mt-0.5 shrink-0" />
      ) : (
        <Square size={20} className="text-text-muted mt-0.5 shrink-0 group-hover:text-gold-primary transition-colors" />
      )}
      <span className={`text-sm ${checked ? 'text-text-muted line-through' : 'text-text-primary'} transition-colors`}>
        {text}
      </span>
    </button>
  );
}

function ComecarDoZeroContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🚀 Começar no Instagram do Zero</h3>
      <p className="text-text-secondary">Seu guia completo passo a passo para criar o perfil perfeito e dar os primeiros passos.</p>
      
      <div className="bg-dark-tertiary rounded-xl p-6 space-y-1">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">✅ Checklist de Configuração</h4>
        <CheckItem text="Criar conta profissional (Creator ou Business)" />
        <CheckItem text="Nome de exibição otimizado com SEO — ex: Felipe Vitória | Cantor Gospel" />
        <CheckItem text="Bio otimizada com keywords, emojis e CTA" />
        <CheckItem text="Foto de perfil profissional (rosto com luz boa)" />
        <CheckItem text="Link na bio (Linktree gospel ou página própria)" />
        <CheckItem text="Identidade visual definida (paleta de cores, fontes)" />
        <CheckItem text="Configurar conta como Criador de Conteúdo" />
        <CheckItem text="Ativar Insights (métricas)" />
        <CheckItem text="Primeiro post: Apresentação pessoal" />
        <CheckItem text="Segundo post: Conteúdo de valor (Reel)" />
        <CheckItem text="Terceiro post: Prova social ou bastidores" />
      </div>

      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">📝 Modelo de Bio (Copie e Adapte)</h4>
        <div className="bg-dark-primary rounded-lg p-4 font-mono text-sm text-text-primary border border-gold-primary/20">
          <p>🎤 Felipe Vitória | Cantor Gospel</p>
          <p>🎹 Hinos Clássicos & Adoração Contemporânea</p>
          <p>🙏 Alcançando almas através da música</p>
          <p>👇 Baixe meu hinário gratuito</p>
        </div>
      </div>

      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">🔍 SEO do Instagram</h4>
        <ul className="space-y-3 text-text-secondary text-sm">
          <li className="flex gap-2"><span className="text-gold-primary">→</span> O Instagram funciona como um buscador em 2026</li>
          <li className="flex gap-2"><span className="text-gold-primary">→</span> Palavras-chave no NOME, BIO e LEGENDAS são indexadas</li>
          <li className="flex gap-2"><span className="text-gold-primary">→</span> O áudio dos Reels é transcrito e usado na busca</li>
          <li className="flex gap-2"><span className="text-gold-primary">→</span> Use termos que seu público pesquisaria: "hino gospel", "louvor acústico", "teclado worship"</li>
        </ul>
      </div>
    </div>
  );
}

function ReelsPerfeitosContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🎬 Estrutura do Reel Perfeito</h3>
      
      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">📐 FRAME A FRAME</h4>
        <div className="space-y-4">
          {[
            { time: '0–1s', title: 'GANCHO VISUAL', desc: 'Imagem impactante sem texto. Prenda o olhar.' },
            { time: '1–3s', title: 'GANCHO VERBAL', desc: 'Diga a keyword em voz alta. O Instagram lê seu áudio.' },
            { time: '3–35s', title: 'CONTEÚDO', desc: 'Entrega de valor real. Ensine, inspire ou emocione.' },
            { time: '35–45s', title: 'VIRADA', desc: 'Surpresa, revelação ou emoção forte.' },
            { time: 'Final', title: 'CTA', desc: '"Salva esse vídeo", "Comenta X", "Manda pro amigo"' },
          ].map((frame) => (
            <div key={frame.time} className="flex items-start gap-4 bg-dark-primary/50 rounded-lg p-4 border-l-4 border-gold-primary">
              <span className="text-gold-primary font-mono font-bold text-sm whitespace-nowrap min-w-[60px]">⏱️ {frame.time}</span>
              <div>
                <p className="font-bold text-text-primary">{frame.title}</p>
                <p className="text-text-secondary text-sm">{frame.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-tertiary rounded-xl p-6 space-y-1">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">📋 Checklist de Produção</h4>
        <CheckItem text="Formato vertical 9:16" />
        <CheckItem text="Iluminação quente (ring light âmbar)" />
        <CheckItem text="Microfone externo (lapela ou condensador)" />
        <CheckItem text="Legendas automáticas ativadas" />
        <CheckItem text="Sem marca d'água de outros apps" />
        <CheckItem text="Loop no áudio final (aumenta rewatches)" />
        <CheckItem text="Keyword falada nos primeiros 3 segundos" />
        <CheckItem text="Capa do Reel personalizada (não usar frame aleatório)" />
      </div>

      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">📝 Modelo de Legenda com SEO</h4>
        <div className="bg-dark-primary rounded-lg p-4 font-mono text-sm text-text-primary border border-gold-primary/20 whitespace-pre-line">
{`🎵 [EMOÇÃO ou GANCHO]
[Contexto do hino — 2 linhas]
Esse hino me leva de volta para [memória].
Você lembra quando cantava isso? 👇
.
.
#HinosGospel #ViolãoGospel #FelipeVitoria
#MúsicaGospel #AdoraçãoAcústica`}
        </div>
      </div>

      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">🎵 Dicas para Perfis Gospel</h4>
        <ul className="space-y-3 text-text-secondary text-sm">
          <li className="flex gap-2"><span className="text-gold-primary">→</span> Duração ideal: 25–50 segundos</li>
          <li className="flex gap-2"><span className="text-gold-primary">→</span> Hino + mensagem emocional = compartilhamento via DM</li>
          <li className="flex gap-2"><span className="text-gold-primary">→</span> "O Instagram lê seu áudio — diga sua keyword nos primeiros 3s"</li>
          <li className="flex gap-2"><span className="text-gold-primary">→</span> Áudio original vale mais que música trending para o algoritmo</li>
        </ul>
      </div>
    </div>
  );
}

function InstaquiContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🗺️ InstAqui — Guia Turístico do Instagram</h3>
      <p className="text-text-secondary">Entenda cada funcionalidade como um especialista.</p>
      
      {[
        {
          title: '📱 Tela Inicial',
          items: [
            '🏠 Feed Principal — Conteúdo de quem você segue + sugeridos pelo algoritmo',
            '🔍 Explorar — Algoritmo de descoberta baseado em interesses',
            '➕ Criar — Reel, Post, Story, Live, Guia',
            '🎬 Reels — Feed exclusivo de vídeos curtos',
            '👤 Perfil — Sua vitrine no Instagram',
          ]
        },
        {
          title: '≡ Menu (3 traços)',
          items: [
            '⭐ Favoritos — Posts salvos em coleções',
            '📡 Broadcast Channel — Canal de transmissão',
            '🕐 Arquivo — Stories e posts arquivados',
            '📊 Insights — Métricas detalhadas',
            '⚙️ Configurações — Controle total',
          ]
        },
        {
          title: '📱 Stories',
          items: [
            '📊 Enquete — 2 opções de resposta',
            '❓ Caixinha de Perguntas — Interação direta',
            '🎵 Música — Trilha sonora',
            '🌡️ Slider — Engajamento visual',
            '🔗 Link Externo — Levar para fora do Instagram',
            '📍 Localização — Alcance regional',
            '📊 Contagem Regressiva — Para lançamentos',
          ]
        },
        {
          title: '🎬 Reels',
          items: [
            '⚡ Remixes — Resposta a outros Reels',
            '🎵 Áudio Original vs Trending',
            '🎞️ Capa personalizada — Seu thumbnail',
            '📝 Legenda — Campo de SEO poderoso',
            '#️⃣ Hashtags — 3 a 5 estratégicas',
            '👥 Collab — Postar com outro perfil',
            '🧪 Trial Reels — Testar sem risco',
            '📅 Agendar — Programar publicação',
          ]
        },
      ].map((section) => (
        <div key={section.title} className="bg-dark-tertiary rounded-xl p-6">
          <h4 className="font-montserrat font-bold text-gold-primary mb-4">{section.title}</h4>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item} className="flex items-start gap-2 text-text-secondary text-sm bg-dark-primary/30 rounded-lg p-3">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AgenteIAContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🤖 Agente do Instagram — IA Especialista</h3>
      <p className="text-text-secondary">Use o botão flutuante no canto inferior direito para conversar com o Agente a qualquer momento!</p>
      
      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">💡 Exemplos de Perguntas</h4>
        <div className="grid gap-2">
          {[
            'Qual o melhor horário para postar hoje?',
            'Meu Reel não cresceu. O que pode ter acontecido?',
            'Quantas hashtags devo usar em 2026?',
            'O que é Trial Reel e como usar?',
            'Como funciona o Broadcast Channel?',
            'O Instagram penaliza quem posta todo dia?',
            'Como funcionam os sinais do algoritmo em 2026?',
            'Como criar collab post com outro artista gospel?',
          ].map((q) => (
            <div key={q} className="bg-dark-primary/50 rounded-lg p-3 text-sm text-text-secondary border border-white/5 hover:border-gold-primary/20 transition-colors">
              ✅ "{q}"
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-tertiary rounded-xl p-6">
        <h4 className="font-montserrat font-bold text-gold-primary mb-4">⚙️ Recursos do Agente</h4>
        <ul className="space-y-3 text-text-secondary text-sm">
          <li className="flex gap-2"><span className="text-gold-primary">├──</span> Base de conhecimento atualizada semanalmente</li>
          <li className="flex gap-2"><span className="text-gold-primary">├──</span> Respostas personalizadas por nicho (gospel, música)</li>
          <li className="flex gap-2"><span className="text-gold-primary">├──</span> Dicas contextuais baseadas no horário e dia</li>
          <li className="flex gap-2"><span className="text-gold-primary">├──</span> Alertas de mudanças recentes no algoritmo</li>
          <li className="flex gap-2"><span className="text-gold-primary">├──</span> Sugestões proativas de conteúdo</li>
          <li className="flex gap-2"><span className="text-gold-primary">└──</span> Integração futura com Instagram Graph API</li>
        </ul>
      </div>
    </div>
  );
}

function AnalisePerfilContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🔍 Analise Meu Perfil</h3>
      <p className="text-text-secondary">Use a seção de Análise de Perfil abaixo para receber um diagnóstico completo!</p>
      <div className="bg-dark-tertiary rounded-xl p-6">
        <p className="text-text-secondary text-sm">
          Role a página até a seção <strong className="text-gold-primary">"Análise de Perfil"</strong> para preencher o formulário e receber seu diagnóstico personalizado com:
        </p>
        <ul className="space-y-2 mt-4 text-text-secondary text-sm">
          <li>🟢 Pontos Positivos (lista personalizada)</li>
          <li>🔴 Pontos Negativos (lista personalizada)</li>
          <li>💡 Plano de Ação em 3 Passos</li>
          <li>🎯 Canais Virais do mesmo nicho para inspiração</li>
          <li>📅 Sugestão de Calendário para 30 Dias</li>
        </ul>
      </div>
    </div>
  );
}

function ErrosContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🚫 O Que NÃO Fazer no Instagram</h3>
      <p className="text-text-secondary">Esses erros silenciosos estão destruindo seu alcance.</p>
      <div className="text-text-secondary text-sm bg-dark-tertiary rounded-xl p-6">
        Role até a seção completa de erros abaixo para ver todos os 15 erros fatais com explicações detalhadas.
      </div>
    </div>
  );
}

function ViraisContent() {
  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-2xl font-bold text-gold-primary">🔥 Vídeos Virais do Seu Nicho</h3>
      <p className="text-text-secondary">Inspirações de conteúdo que viralizaram no nicho gospel.</p>
      <div className="text-text-secondary text-sm bg-dark-tertiary rounded-xl p-6">
        Role até a seção de Virais abaixo para ver análises completas de conteúdos que explodiram no Instagram.
      </div>
    </div>
  );
}

export default function ModulosSection() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <section id="modulos" className="py-20 bg-dark-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-primary font-montserrat font-bold text-sm tracking-widest uppercase">
            Conteúdo Exclusivo
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mt-3 mb-4">
            Os 7 Grandes <span className="text-gold-primary">Módulos</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Cada módulo foi projetado para te levar do zero ao viral com estratégias comprovadas e atualizadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveModule(mod.id)}
              className="glass-card rounded-2xl p-6 cursor-pointer group hover:border-gold-primary/40 transition-all hover:shadow-xl hover:shadow-gold-primary/5 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{mod.icon}</div>
              <h3 className="font-montserrat font-bold text-text-primary text-lg mb-3 group-hover:text-gold-primary transition-colors">
                {mod.title}
              </h3>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">{mod.description}</p>
              <span className="inline-flex items-center gap-1 text-gold-primary font-semibold text-sm group-hover:gap-2 transition-all">
                {mod.cta} <ChevronRight size={16} />
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Módulo */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-20"
            onClick={() => setActiveModule(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-dark-secondary rounded-2xl border border-gold-primary/20 max-w-3xl w-full p-6 sm:p-8 mb-8 relative"
            >
              <button
                onClick={() => setActiveModule(null)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold-primary transition-colors rounded-full hover:bg-gold-primary/10"
              >
                <X size={24} />
              </button>
              {moduleContent[activeModule]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
