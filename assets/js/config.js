// ╔══════════════════════════════════════════════════════════════════╗
// ║  CONFIG.JS — Dados do Negócio                                    ║
// ║  Edite APENAS este arquivo para atualizar qualquer informação    ║
// ║  do site. O resto é atualizado automaticamente.                  ║
// ║                                                                  ║
// ║  Após editar, lembre de atualizar também:                        ║
// ║    - <meta name="description"> no index.html (linha ~7)          ║
// ║    - Schema.org JSON-LD no index.html (linhas ~29–75)            ║
// ╚══════════════════════════════════════════════════════════════════╝

const CONFIG = {

  // ── EMPRESA ────────────────────────────────────────────────────────
  nome:  'Evolution Refri Clima',
  site:  'https://www.evolutionrcar.com.br',
  cnpj:  '43.860.042/0001-05',
  ano:   '2025',

  // ── TELEFONES ──────────────────────────────────────────────────────
  // "numero": sem espaços ou traços, com código do país + DDD (55 + DDD + número)
  telefones: {
    servicos: { numero: '5592991404018', exibicao: '(92) 99140-4018' },
    loja:     { numero: '5592991046810', exibicao: '(92) 99104-6810' },
    extra:    { numero: '5592987400584', exibicao: '(92) 98740-0584' },
  },

  // ── MENSAGENS WHATSAPP ─────────────────────────────────────────────
  // Texto pré-preenchido ao abrir conversa no WhatsApp
  waMensagens: {
    servicos: 'Olá! Gostaria de solicitar um serviço.',
    produtos: 'Olá! Gostaria de consultar produtos disponíveis.',
    loja:     'Olá! Gostaria de consultar produtos da loja.',
  },

  // ── ENDEREÇO ───────────────────────────────────────────────────────
  endereco: {
    rua:         'R. Antônio Figueiredo, 127',
    complemento: 'Esquina com R. Virgílio Ferreira',
    bairro:      'Alvorada 2',
    cidade:      'Manaus',
    estado:      'AM',
    cep:         '69042-320',
  },

  // ── HORÁRIOS DE FUNCIONAMENTO ──────────────────────────────────────
  horarios: [
    { dias: 'Segunda',     abre: '08:00', fecha: '19:00' },
    { dias: 'Terça a Sáb', abre: '08:00', fecha: '21:00' },
    { dias: 'Domingo',     abre: '08:00', fecha: '13:00' },
  ],

  // ── REDES SOCIAIS ──────────────────────────────────────────────────
  // Deixe vazio ('') para ocultar o ícone
  redes: {
    instagram: 'https://www.instagram.com/_evolution_refrigeracao_/',
    facebook:  '',
    tiktok:    '',
  },

};
