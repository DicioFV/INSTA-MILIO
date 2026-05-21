import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const knowledgeBase: Record<string, string> = {
  'horário|horario|hora|melhor hora|quando postar': 'Os melhores horários para postar no Instagram em 2026 são:\n\n📌 **12h-13h** (horário de almoço)\n📌 **18h-19h** (saída do trabalho)\n📌 **21h-22h** (relaxamento noturno)\n\nPara o nicho gospel, **domingos às 20h** costumam performar excepcionalmente bem, pois é quando a comunidade está mais ativa e reflexiva.\n\n💡 Dica: Confira seus Insights para descobrir quando SEU público específico está online.',
  'bio|biografia|perfil|nome': '📝 **Otimizando sua Bio em 2026**\n\n✅ **Nome de exibição** = campo de SEO\nEx: "Felipe Vitória | Cantor Gospel"\n\n✅ **Estrutura ideal da bio:**\n• Linha 1: O que você faz + emoji\n• Linha 2: Seu diferencial\n• Linha 3: Propósito/missão\n• Linha 4: CTA + emoji apontando\n\n✅ **Modelo pronto:**\n🎤 Cantor Gospel & Adorador\n🎹 Hinos Clássicos + Contemporâneos\n🙏 Alcançando almas através da música\n👇 Baixe meu hinário gratuito\n\n💡 Use até 150 caracteres. Cada palavra deve ser estratégica!',
  'stories|story': '📱 **Estratégia de Stories 2026**\n\n✅ **Frequência ideal:** 3-5 Stories por dia\n\n✅ **Estrutura diária:**\n• 🌅 Manhã: Devocional/reflexão\n• 🎵 Tarde: Bastidores/ensaio\n• 💬 Final de tarde: Enquete/pergunta\n• 🙏 Noite: Mensagem de encerramento\n\n✅ **Ferramentas que geram engajamento:**\n• Enquetes (2 opções)\n• Slider de emoji\n• Quiz\n• Caixinha de perguntas\n\n💡 Stories mantêm sua audiência "aquecida" entre Reels. Seguidores que interagem nos Stories veem seus Reels primeiro!',
  'legenda|caption|texto': '✍️ **Legendas que Convertem em 2026**\n\n✅ **Estrutura:**\n1. **Gancho** (primeira linha chamativa)\n2. **História/contexto** (2-3 linhas)\n3. **Valor/insight** \n4. **CTA** (chamada para ação)\n5. **Hashtags** (3-5 estratégicas)\n\n✅ **Modelo pronto:**\n"🎵 Esse hino salvou minha noite...\n\nEra 2019, eu estava passando pelo momento mais difícil da minha vida. Abri o hinário e esse louvor saltou aos meus olhos.\n\nDeus fala através da música.\n\nVocê tem um hino que te marcou? 👇 Conta aqui\n.\n.\n#HinosGospel #Adoração #MúsicaCristã"\n\n💡 O Instagram indexa PALAVRAS da legenda para busca. Use keywords!',
  'equipamento|câmera|microfone|luz|setup': '🎥 **Setup Básico para Começar**\n\n✅ **O essencial:**\n• 📱 Smartphone com boa câmera (não precisa ser caro)\n• 🎤 Microfone lapela (R$30-80)\n• 💡 Ring light ou luz natural da janela\n• 📐 Tripé simples (R$40-100)\n\n✅ **Configurações:**\n• Grave em 1080p ou 4K\n• Modo retrato (9:16)\n• Estabilização ativada\n\n✅ **Iluminação:**\n• Luz quente/âmbar = tom gospel intimista\n• Posicione a luz na sua frente, nunca atrás\n\n💡 Não espere ter o equipamento perfeito para começar. **Conteúdo > Equipamento sempre!**',
  'monetiz|ganhar dinheiro|renda|faturar': '💰 **Monetização para Artistas Gospel**\n\n✅ **Fontes de renda:**\n• 🎵 Shows e apresentações\n• 📚 Mentorias e aulas\n• 🎹 Cifras e partituras (infoproduto)\n• 📖 Ebooks de hinário\n• 👕 Merchandise\n• 💻 Lives patrocinadas\n• 🤝 Parcerias com marcas cristãs\n\n✅ **Estratégia de conversão:**\n1. Conteúdo gratuito → atrai audiência\n2. Isca digital → captura email\n3. Nutrição → constrói relacionamento\n4. Oferta → converte em cliente\n\n💡 Primeiro construa **audiência** e **autoridade**. A monetização vem naturalmente depois.',
  'engajamento|engajar|comentário|interação': '💬 **Aumentando Engajamento em 2026**\n\n✅ **Táticas comprovadas:**\n• Responda TODOS os comentários em até 30 min\n• Faça perguntas no final das legendas\n• Use enquetes e caixinhas nos Stories\n• Crie séries que gerem expectativa\n• Peça shares via DM (sinal #1 do algoritmo)\n\n✅ **CTAs que funcionam:**\n• "Marca alguém que ama esse hino 👇"\n• "Salva esse vídeo para ouvir depois 💾"\n• "Manda no direct pra quem precisa 📲"\n• "Qual hino você quer que eu toque? 🎹"\n\n💡 Comentários com mais de 4 palavras valem mais para o algoritmo. Incentive respostas elaboradas!',
  'viral|viralizar|explodir|crescer rápido': '🚀 **Como Viralizar em 2026**\n\n✅ **Ingredientes do Viral:**\n1. **Gancho nos 0-3s** (prende atenção)\n2. **Emoção forte** (nostalgia, fé, alegria)\n3. **Relatabilidade** (público se identifica)\n4. **CTA de compartilhamento** (incentiva DMs)\n5. **Loop perfeito** (incentiva rewatches)\n\n✅ **Formatos que viralizam no gospel:**\n• Hinos nostálgicos + história pessoal\n• Antes/depois de arranjos musicais\n• "Você lembra desse louvor?"\n• Momento real de adoração\n• Desafios musicais\n\n💡 Viralizar NÃO é sorte. É estrutura + emoção + timing. Estude Reels que bombaram no seu nicho!',
  'reels|reel|vídeo|video': '🎬 **Estrutura do Reel Perfeito**\n\n✅ **Frame a frame:**\n• **0-1s:** Gancho visual impactante\n• **1-3s:** Fale a keyword em voz alta\n• **3-35s:** Conteúdo de valor\n• **35-45s:** Virada/surpresa emocional\n• **Final:** CTA claro\n\n✅ **Checklist técnico:**\n☑️ Formato 9:16 vertical\n☑️ Legendas automáticas ON\n☑️ Sem marca d\'água de outros apps\n☑️ Capa personalizada\n☑️ Loop no áudio\n☑️ Keyword nos primeiros 3s\n\n✅ **Duração ideal:** 25-45 segundos\n\n💡 O algoritmo "lê" o áudio do seu Reel. Diga suas palavras-chave em voz alta!',
  'insight|métrica|dado|analytics|analítico': '📊 **Métricas que Importam em 2026**\n\n✅ **Top 5 para monitorar:**\n1. **Compartilhamentos via DM** (mais importante!)\n2. **Salvamentos** (indica valor)\n3. **Comentários longos** (engajamento real)\n4. **Taxa de retenção** (% assistido)\n5. **Alcance de não-seguidores**\n\n✅ **Como interpretar:**\n• Se Reel atingiu 10x seus seguidores = excelente\n• Se retenção > 80% = conteúdo prendeu\n• Se saves > 5% = muito valor percebido\n\n❌ **NÃO foque em:**\n• Curtidas (peso baixo)\n• Número de seguidores (métrica de vaidade)\n\n💡 Analise seus Insights toda segunda-feira. Identifique padrões do que funciona!',
  'hashtag|hashtags|quantas hashtag': 'Em 2026, o Instagram recomenda usar **3 a 5 hashtags** altamente relevantes ao seu nicho.\n\n✅ Exemplo para gospel:\n• #HinosGospel\n• #AdoraçãoAcústica\n• #MúsicaGospel\n• #LouvoreAdoração\n\n⚠️ Não use mais de 5! O algoritmo pode interpretar como spam.\n\n💡 Importante: **Keywords na legenda** agora superam hashtags na busca interna do Instagram.',
  'trial|trial reel': 'O **Trial Reel** é uma funcionalidade incrível do Instagram que permite:\n\n1️⃣ Testar seu Reel com pessoas que **NÃO** te seguem\n2️⃣ Ver a performance antes de publicar oficialmente\n3️⃣ Se o desempenho for bom, você publica para todos\n\n📊 É perfeito para testar:\n• Novos ganchos\n• Formatos diferentes\n• Horários alternativos\n\n💡 Use Trial Reels para todo conteúdo experimental — zero risco!',
  'broadcast|canal|channel': 'O **Broadcast Channel** é um canal de transmissão onde:\n\n📡 Apenas VOCÊ envia mensagens\n👥 Todos os seguidores inscritos recebem\n🔔 Funciona como um "WhatsApp de mão única"\n\n✅ Use para:\n• Avisar sobre novos Reels\n• Compartilhar bastidores exclusivos\n• Anunciar lives e lançamentos\n• Criar senso de comunidade\n\n💡 É gratuito e muito poderoso para manter sua audiência engajada!',
  'não cresceu|nao cresceu|reel não|reel nao|flop': 'Quando um Reel não performa bem, analise estes pontos:\n\n1️⃣ **Gancho fraco** — Os primeiros 3 segundos prenderam a atenção?\n2️⃣ **Sem keyword** — Você disse a palavra-chave em voz alta?\n3️⃣ **Legenda vazia** — Sem SEO na legenda = invisível na busca\n4️⃣ **Horário ruim** — Postou quando seu público estava offline?\n5️⃣ **Sem CTA** — Não pediu save, comentário ou compartilhamento?\n6️⃣ **Sem loop** — O vídeo não incentiva reassistir?\n\n💡 Não delete o Reel! O algoritmo pode empurrar após 24-48h.',
  'algoritmo|sinais|como funciona': 'O algoritmo do Instagram em 2026 usa **7 sinais principais**:\n\n1️⃣ 📤 Compartilhamentos via DM — **95%** de peso\n2️⃣ 💾 Salvamentos — **85%**\n3️⃣ 💬 Comentários longos — **75%**\n4️⃣ ⏱️ Watch Time — **70%**\n5️⃣ 🔁 Rewatches/Loops — **65%**\n6️⃣ 🔍 SEO/Busca interna — **55%**\n7️⃣ ❤️ Curtidas — apenas **30%**\n\n💡 Foque em criar conteúdo que as pessoas COMPARTILHEM via DM — é o sinal #1!',
  'collab|colaboração|colaboracao': 'O **Collab Post** é uma das ferramentas mais poderosas do Instagram:\n\n🤝 O mesmo post aparece nos DOIS perfis\n📊 Ambos recebem curtidas, comentários e alcance\n🚀 Dobra seu alcance instantaneamente\n\n**Como fazer:**\n1. Crie o post/Reel normalmente\n2. Na tela de publicação, toque em "Marcar pessoas"\n3. Selecione "Convidar colaborador"\n4. A outra pessoa aceita\n\n💡 Para gospel: Faça collabs com artistas do mesmo porte. É a forma mais orgânica de crescer!',
  'todo dia|posta todo dia|diariamente|frequência|frequencia': 'O Instagram **NÃO penaliza** quem posta todo dia, mas...\n\n⚠️ **3 Reels EXCELENTES por semana** superam 7 mediocres!\n\n📋 Frequência ideal:\n• **Reels:** 3-4x por semana\n• **Stories:** Diariamente (3-5 por dia)\n• **Carrosséis:** 2x por semana\n• **Lives:** 1-2x por mês\n\n💡 O segredo é CONSISTÊNCIA + QUALIDADE. Defina seus dias fixos e cumpra o calendário.',
  'seo|busca|pesquisa|keyword': 'O SEO do Instagram em 2026 é mais importante que nunca!\n\n🔍 O Instagram agora funciona como um **buscador**:\n\n✅ **Nome de exibição:** Use como campo de SEO\nEx: "Felipe Vitória | Cantor Gospel"\n\n✅ **Bio:** Inclua keywords relevantes\nEx: "Hinos clássicos", "Adoração acústica"\n\n✅ **Legendas:** Escreva keywords naturalmente\n\n✅ **Áudio:** O Instagram TRANSCREVE seu áudio e indexa!\n\n💡 Diga sua keyword em voz alta nos primeiros 3 segundos do Reel.',
};

function getResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  for (const [patterns, response] of Object.entries(knowledgeBase)) {
    const patternList = patterns.split('|');
    if (patternList.some(p => msg.includes(p))) {
      return response;
    }
  }
  
  return 'Boa pergunta! 🤔\n\nAqui estão alguns temas que posso te ajudar:\n\n• **"Melhor horário para postar"**\n• **"Quantas hashtags usar"**\n• **"O que é Trial Reel"**\n• **"Como funciona o algoritmo"**\n• **"Meu Reel não cresceu"**\n• **"Como fazer collab"**\n• **"Broadcast Channel"**\n• **"SEO no Instagram"**\n• **"Frequência de postagem"**\n\nDigite uma dessas perguntas e te ajudo com uma resposta detalhada! 🚀';
}

export default function AgenteIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! 👋 Sou o **Agente Instagram** — seu especialista em algoritmos e estratégias de crescimento.\n\nEstou atualizado com as mudanças de 2026. Pergunte qualquer coisa sobre crescer no Instagram!\n\n💡 Experimente: "Qual o melhor horário para postar?"',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 gold-gradient rounded-full flex items-center justify-center shadow-xl shadow-gold-primary/30 ${isOpen ? 'hidden' : ''}`}
      >
        <Bot size={24} className="text-dark-primary" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[80vh] bg-dark-secondary rounded-2xl border border-gold-primary/20 shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gold-gradient p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Bot size={24} className="text-dark-primary" />
                <div>
                  <h3 className="font-montserrat font-bold text-dark-primary text-sm">Agente do Instagram</h3>
                  <p className="text-dark-primary/70 text-xs">IA Especialista • Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-dark-primary/70 hover:text-dark-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' ? 'gold-gradient' : 'bg-dark-tertiary border border-white/10'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={16} className="text-dark-primary" /> : <User size={16} className="text-text-secondary" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-dark-tertiary text-text-primary rounded-tl-sm'
                      : 'gold-gradient text-dark-primary rounded-tr-sm'
                  }`}>
                    {msg.content.split('\n').map((line, j) => (
                      <p key={j} className={j > 0 ? 'mt-1' : ''}>
                        {line.split('**').map((part, k) => 
                          k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-dark-primary" />
                  </div>
                  <div className="bg-dark-tertiary rounded-2xl rounded-tl-sm p-3 px-5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gold-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gold-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gold-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-3 border-t border-white/5 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre Instagram..."
                  className="flex-1 px-4 py-3 bg-dark-primary border border-white/10 rounded-xl text-text-primary text-sm placeholder-text-muted focus:border-gold-primary focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-4 py-3 gold-gradient rounded-xl text-dark-primary disabled:opacity-30 hover:opacity-90 transition-opacity"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
