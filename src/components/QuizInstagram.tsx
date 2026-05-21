import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, X, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const questions = [
  {
    pergunta: 'Qual é o sinal MAIS importante para o algoritmo do Instagram em 2026?',
    opcoes: ['Curtidas', 'Compartilhamentos via DM', 'Comentários', 'Views'],
    correta: 1,
    explicacao: 'Compartilhamentos via DM são o sinal #1 do algoritmo. Quando alguém manda seu vídeo para um amigo, o Instagram entende que seu conteúdo é valioso.',
  },
  {
    pergunta: 'Quantas hashtags o Instagram recomenda em 2026?',
    opcoes: ['10-15', '3-5', '20-30', 'Nenhuma'],
    correta: 1,
    explicacao: 'A Meta recomenda usar 3-5 hashtags altamente relevantes. Menos é mais! O SEO por palavras-chave nas legendas agora é mais importante.',
  },
  {
    pergunta: 'Em que posição do Reel a keyword deve ser falada em voz alta?',
    opcoes: ['No final', 'Não precisa falar', 'Nos primeiros 3 segundos', 'No meio do vídeo'],
    correta: 2,
    explicacao: 'O Instagram transcreve o áudio do seu Reel e usa para indexação. Falar a keyword nos primeiros 3 segundos ajuda na descoberta.',
  },
  {
    pergunta: 'O que é um Trial Reel?',
    opcoes: ['Reel de teste com filtro', 'Reel que testa para não-seguidores primeiro', 'Reel com música trending', 'Reel colaborativo'],
    correta: 1,
    explicacao: 'Trial Reel permite testar seu conteúdo com pessoas que NÃO te seguem antes de publicar oficialmente. Zero risco!',
  },
  {
    pergunta: 'Qual duração ideal de Reel para o nicho gospel?',
    opcoes: ['5-10 segundos', '25-50 segundos', '90 segundos', '3 minutos'],
    correta: 1,
    explicacao: 'Para gospel, 25-50 segundos é ideal. Tempo suficiente para criar conexão emocional sem perder retenção.',
  },
  {
    pergunta: 'O que acontece se você não responder comentários nas primeiras 2 horas?',
    opcoes: ['Nada', 'O post é deletado', 'Sinal negativo para o algoritmo', 'O post viraliza'],
    correta: 2,
    explicacao: 'Silêncio nos comentários é interpretado como desinteresse pelo algoritmo. Responda rápido para manter o momentum!',
  },
  {
    pergunta: 'Qual métrica é MENOS importante em 2026?',
    opcoes: ['Salvamentos', 'Curtidas', 'Compartilhamentos', 'Comentários longos'],
    correta: 1,
    explicacao: 'Curtidas têm apenas 30% de peso no algoritmo. Foque em saves, shares e comentários que são muito mais valiosos.',
  },
  {
    pergunta: 'O que é mais efetivo: 7 Reels medianos ou 3 Reels excelentes por semana?',
    opcoes: ['7 medianos', '3 excelentes', 'Tanto faz', 'Depende do nicho'],
    correta: 1,
    explicacao: 'Qualidade > Quantidade sempre! 3 Reels excelentes com boa estrutura performam melhor que 7 mediocres.',
  },
  {
    pergunta: 'Por que a capa personalizada do Reel é importante?',
    opcoes: ['Não é importante', 'Funciona como thumbnail e determina o clique', 'Apenas estética', 'O Instagram exige'],
    correta: 1,
    explicacao: 'A capa é o "thumbnail" do seu Reel. Uma capa bem feita aumenta drasticamente a taxa de cliques no seu conteúdo.',
  },
  {
    pergunta: 'O que é Broadcast Channel?',
    opcoes: ['Canal de TV', 'Live com múltiplos hosts', 'Canal de transmissão para enviar mensagens aos seguidores', 'Chat em grupo'],
    correta: 2,
    explicacao: 'Broadcast Channel é um canal onde apenas você envia mensagens para todos os seguidores inscritos. Ótimo para avisar sobre novos conteúdos!',
  },
];

export default function QuizInstagram() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correta;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === question.correta) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const getScoreMessage = () => {
    const percent = (score / questions.length) * 100;
    if (percent >= 90) return { emoji: '🏆', msg: 'Mestre do Instagram! Você domina o algoritmo!' };
    if (percent >= 70) return { emoji: '🌟', msg: 'Muito bom! Você está no caminho certo!' };
    if (percent >= 50) return { emoji: '📚', msg: 'Bom começo! Continue estudando os módulos.' };
    return { emoji: '💪', msg: 'Hora de estudar! Explore todos os módulos da plataforma.' };
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="glass-card rounded-xl p-4 flex items-center gap-3 hover:border-[var(--theme-primary)]/30 transition-all w-full text-left"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--theme-gradient)' }}>
          <Brain size={24} className="text-dark-primary" />
        </div>
        <div>
          <h4 className="font-montserrat font-bold text-text-primary">Quiz do Instagram</h4>
          <p className="text-text-muted text-sm">Teste seus conhecimentos</p>
        </div>
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
              className="bg-dark-secondary rounded-2xl border border-[var(--theme-primary)]/20 max-w-lg w-full p-6 relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>

              {!showResult ? (
                <>
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-muted text-sm">Pergunta {currentQuestion + 1} de {questions.length}</span>
                      <span className="text-[var(--theme-primary)] font-bold">{score} pontos</span>
                    </div>
                    <div className="h-2 bg-dark-primary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--theme-gradient)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h3 className="font-playfair text-lg font-bold text-text-primary mb-6">
                      {question.pergunta}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                      {question.opcoes.map((opcao, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(i)}
                          disabled={answered}
                          className={`w-full p-4 rounded-xl text-left transition-all ${
                            answered
                              ? i === question.correta
                                ? 'bg-green-500/20 border-2 border-green-500'
                                : i === selectedAnswer
                                ? 'bg-red-500/20 border-2 border-red-500'
                                : 'bg-dark-primary/50 border border-white/10 opacity-50'
                              : 'bg-dark-primary/50 border border-white/10 hover:border-[var(--theme-primary)]/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-dark-tertiary flex items-center justify-center text-text-muted text-sm font-bold">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="text-text-primary text-sm">{opcao}</span>
                            {answered && i === question.correta && <CheckCircle size={18} className="ml-auto text-green-400" />}
                            {answered && i === selectedAnswer && i !== question.correta && <XCircle size={18} className="ml-auto text-red-400" />}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                      {answered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className={`rounded-xl p-4 mb-4 ${isCorrect ? 'bg-green-950/30 border border-green-900/30' : 'bg-yellow-950/30 border border-yellow-900/30'}`}
                        >
                          <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-yellow-300'}`}>
                            {isCorrect ? '✅ Correto! ' : '💡 '}{question.explicacao}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Next Button */}
                    {answered && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={nextQuestion}
                        className="w-full py-3 rounded-xl font-montserrat font-bold text-dark-primary"
                        style={{ background: 'var(--theme-gradient)' }}
                      >
                        {currentQuestion < questions.length - 1 ? 'Próxima Pergunta →' : 'Ver Resultado'}
                      </motion.button>
                    )}
                  </motion.div>
                </>
              ) : (
                /* Results */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">{getScoreMessage().emoji}</div>
                  <h3 className="font-playfair text-2xl font-bold text-text-primary mb-2">
                    Você acertou {score} de {questions.length}!
                  </h3>
                  <p className="text-text-secondary mb-6">{getScoreMessage().msg}</p>
                  
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="#1A1A1A" strokeWidth="8" fill="none" />
                      <circle
                        cx="64" cy="64" r="56"
                        stroke="url(#quiz-gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(score / questions.length) * 352} 352`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="quiz-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--theme-primary)" />
                          <stop offset="100%" stopColor="var(--theme-secondary)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-playfair text-3xl font-bold text-[var(--theme-primary)]">
                        {Math.round((score / questions.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={restart}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-montserrat font-bold text-dark-primary"
                    style={{ background: 'var(--theme-gradient)' }}
                  >
                    <RotateCcw size={18} />
                    Tentar Novamente
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
