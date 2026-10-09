/* =========================================================
   Centernit Telhas — interações
   ========================================================= */
(() => {
  'use strict';

  /* ---------- Utils ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = matchMedia('(hover: none)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const WA_NUMBER = '5513974047604';
  const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  const fmt = (n, d = 2) => n.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/,/g, '.').replace(/º/g, '°');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IMG = 'https://centernit.com.br/product_images/';

  /* ---------- Catálogo (dados reais do site atual) ---------- */
  const v = (sku, name, label, spec, img) => ({ sku, name, label, spec, img });
  const FAMILIES = [
    { id: 'ond8', group: 'fibro', tag: 'Fibrocimento', title: 'Telha Ondulada 8 mm',
      desc: 'A mais espessa da linha ondulada: robustez para coberturas residenciais e comerciais.',
      variants: [
        v(15, 'TELHA ONDULADA 8MM - 1,22 X 1,10', '1,22', '1,22 × 1,10 m', 'z/101/15img01.png'),
        v(16, 'TELHA ONDULADA 8MM - 1.53 X 1.10', '1,53', '1,53 × 1,10 m', 'x/103/16img01.png'),
        v(17, 'TELHA ONDULADA 8MM - 1.83 X 1.10', '1,83', '1,83 × 1,10 m', 'g/118/17img01.png'),
        v(18, 'TELHA ONDULADA 8MM - 2,13 X 1,10', '2,13', '2,13 × 1,10 m', 'q/117/18img01.png'),
        v(19, 'TELHA ONDULADA 8MM - 2.44 X 1.10', '2,44', '2,44 × 1,10 m', 'x/112/19img01.png'),
        v(20, 'TELHA ONDULADA 8MM - 3.05 X 1.10', '3,05', '3,05 × 1,10 m', 'i/100/20img01.png'),
        v(21, 'TELHA ONDULADA 8MM - 3.66 X 1.10', '3,66', '3,66 × 1,10 m', 'i/116/21img01.png'),
      ] },
    { id: 'ond6', group: 'fibro', tag: 'Fibrocimento', title: 'Telha Ondulada 6 mm',
      desc: 'Versátil e resistente: a escolha clássica para casas, garagens e áreas de serviço.',
      variants: [
        v(7, 'TELHA ONDULADA 6MM - 1,22 X 1,10', '1,22', '1,22 × 1,10 m', 'h/111/7img01.png'),
        v(8, 'TELHA ONDULADA 6MM - 1.53 X 1.10', '1,53', '1,53 × 1,10 m', 'n/120/8img01.png'),
        v(9, 'TELHA ONDULADA 6MM - 1.83 X 1.10', '1,83', '1,83 × 1,10 m', 'e/110/9img02.png'),
        v(10, 'TELHA ONDULADA 6MM - 2.13 X 1.10', '2,13', '2,13 × 1,10 m', 'k/102/10img02.png'),
        v(11, 'TELHA ONDULADA 6MM - 2.44 X 1.10', '2,44', '2,44 × 1,10 m', 'j/115/11img01.png'),
        v(12, 'TELHA ONDULADA 6MM - 3.05 X 1.10', '3,05', '3,05 × 1,10 m', 's/115/12img01.png'),
        v(13, 'TELHA ONDULADA 6MM - 3.66 X 1.10', '3,66', '3,66 × 1,10 m', 'y/107/13img01.png'),
      ] },
    { id: 'trop5', group: 'fibro', tag: 'Fibrocimento', title: 'Telha Tropical 5 mm',
      desc: 'Mais leve e econômica. Ótima para varandas, edículas e pequenas coberturas.',
      variants: [
        v(2, 'TELHA TROPICAL C.R.F.S. 5MM - 1.22 X 1.10', '1,22', '1,22 × 1,10 m', 'w/116/2img01.png'),
        v(22, 'TELHA TROPICAL C.R.F.S. 5MM - 1.53 X 1.10', '1,53', '1,53 × 1,10 m', 'x/118/22img01.png'),
        v(3, 'TELHA TROPICAL C.R.F.S. 5MM - 1.83 X 1.10', '1,83', '1,83 × 1,10 m', 't/115/3img01.png'),
        v(4, 'TELHA TROPICAL C.R.F.S. 5MM - 2.13 X 1.10', '2,13', '2,13 × 1,10 m', 'k/102/4img01.png'),
        v(5, 'TELHA TROPICAL C.R.F.S. 5MM - 2.44 X 1.10', '2,44', '2,44 × 1,10 m', 'h/108/5img01.png'),
      ] },
    { id: 'onda50', group: 'fibro', tag: 'Fibrocimento', title: 'Telha Onda 50 8 mm',
      desc: 'Fibrocimento 8 mm com 0,60 m de largura, em peças longas de 3,20 a 4,10 m.',
      variants: [
        v(383, 'TELHA ONDA 50 8MM - 3,20 X 0,60', '3,20', '3,20 × 0,60 m', 's/119/383img01.jpg'),
        v(384, 'TELHA ONDA 50 8MM - 3,70 X 0,60', '3,70', '3,70 × 0,60 m', 'r/100/384img01.jpg'),
        v(385, 'TELHA ONDA 50 8MM - 4,10 X 0,60', '4,10', '4,10 × 0,60 m', 'n/101/385img01.jpg'),
      ] },
    { id: 'modulada', group: 'fibro', tag: 'Fibrocimento', title: 'Modulada 8 mm',
      desc: 'Fibrocimento com 0,60 m de largura para coberturas amplas, de 1,85 a 4,60 m.',
      variants: [
        v(115, 'MODULADA CRFS 8MM - 1.85 X 0,60', '1,85', '1,85 × 0,60 m', 'o/101/115img01.jpg'),
        v(116, 'MODULADA CRFS 8MM - 2.30 X 0.60', '2,30', '2,30 × 0,60 m', 'r/102/116img01.jpg'),
        v(117, 'MODULADA CRFS 8MM - 3.20 X 0.60', '3,20', '3,20 × 0,60 m', 'd/105/117img01.jpg'),
        v(118, 'MODULADA CRFS 8MM - 3.70 X 0.60', '3,70', '3,70 × 0,60 m', 'g/115/118img01.jpg'),
        v(119, 'MODULADA CRFS 8MM - 4.10 X 0.60', '4,10', '4,10 × 0,60 m', 'h/107/119img01.jpg'),
        v(120, 'MODULADA CRFS 8MM - 4.60 X 0.60', '4,60', '4,60 × 0,60 m', 's/105/120img01.jpg'),
      ] },
    { id: 'etermax', group: 'fibro', tag: 'Fibrocimento', title: 'Etermax 6 mm',
      desc: 'Fibrocimento com 1,06 m de largura e comprimentos de 3,00 a 4,60 m.',
      variants: [
        v(140, 'ETERMAX CRFS 6MM - 3.00 X 1.06', '3,00', '3,00 × 1,06 m', 'a/107/140img01.jpg'),
        v(141, 'ETERMAX CRFS 6MM - 3.30 X 1.06', '3,30', '3,30 × 1,06 m', 'p/113/141img01.jpg'),
        v(142, 'ETERMAX CRFS 6MM - 3.70 X 1.06', '3,70', '3,70 × 1,06 m', 'l/116/142img01.jpg'),
        v(143, 'ETERMAX CRFS 6MM - 4.10 X 1.06', '4,10', '4,10 × 1,06 m', 'd/105/143img01.jpg'),
        v(144, 'ETERMAX CRFS 6MM - 4.60 X 1.06', '4,60', '4,60 × 1,06 m', 'y/106/144img01.jpg'),
      ] },
    { id: 'pvc', group: 'pvc', tag: 'PVC', title: 'Telha PVC Vermelha',
      desc: 'Prática e durável, agrega beleza ao telhado com acabamento colonial.',
      variants: [
        v(255, 'TELHA PVC VERMELHA - 2.30 X 0.88', '2,30', '2,30 × 0,88 m', 'k/491/TELHA_PVC__52424__79538__64237__15015__02557.jpg'),
        v(257, 'TELHA PVC VERMELHA - 3.28 X 0.88', '3,28', '3,28 × 0,88 m', 'g/217/TELHA_PVC__52424__79538__64237__15015.jpg'),
        v(258, 'TELHA PVC VERMELHA - 3.94 X 0.88', '3,94', '3,94 × 0,88 m', 'i/045/TELHA_PVC__52424__79538__64237.jpg'),
        v(259, 'TELHA PVC VERMELHA - 4.59 X 0.88', '4,59', '4,59 × 0,88 m', 'f/189/TELHA_PVC__52424__79538.jpg'),
        v(260, 'TELHA PVC VERMELHA - 5.25 X 0.88', '5,25', '5,25 × 0,88 m', 'x/092/TELHA_PVC__52424.jpg'),
      ] },
    { id: 'poli', group: 'transl', tag: 'Translúcida', title: 'Telha Polipropileno Translúcida 1,2 mm',
      desc: 'Deixa a luz natural entrar. Perfil ondulado na largura das telhas de 1,10 m.',
      variants: [
        v(219, 'TELHA POLI. TRANSL. 1.2MM - 1.53 X 1.10', '1,53', '1,53 × 1,10 m', 'l/571/telha_poli__22782.jpg'),
        v(220, 'TELHA POLI. TRANSL. 1.2MM - 1.83 X 1.10', '1,83', '1,83 × 1,10 m', 'z/855/telha_poli__22782__34687.jpg'),
        v(221, 'TELHA POLI. TRANSL. 1.2MM - 2.13 X 1.10', '2,13', '2,13 × 1,10 m', 'o/001/telha_poli__22782__34687__20029.jpg'),
        v(222, 'TELHA POLI. TRANSL. 1.2MM - 2.44 X 1.10', '2,44', '2,44 × 1,10 m', 's/656/telha_poli__22782__34687__20029__10085.jpg'),
        v(225, 'TELHA POLI. TRANSL. 1.2MM - 2.44 X 0.50', '2,44 × 0,50', '2,44 × 0,50 m', 'm/490/telha_poli__22782__34687__20029__15722.jpg'),
        v(223, 'TELHA POLI. TRANSL. 1.2MM - 3.05 X 1.10', '3,05', '3,05 × 1,10 m', 'u/672/telha_poli__22782__34687__20029__10085__61498.jpg'),
      ] },
    { id: 'can49', group: 'canalete', tag: 'Canalete', title: 'Canalete 49 8 mm',
      desc: 'Telha estrutural autoportante: vence grandes vãos com menos estrutura.',
      variants: [
        v(64, 'CANALETE 49 CRFS 8MM - 2,00 MTS', '2,00', '2,00 m', 'i/105/64img01.png'),
        v(65, 'CANALETE 49 CRFS 8MM - 2.50 MTS', '2,50', '2,50 m', 'a/113/65img01.png'),
        v(66, 'CANALETE 49 CRFS 8MM - 3.00 MTS', '3,00', '3,00 m', 'u/113/66img01.png'),
        v(67, 'CANALETE 49 CRFS 8MM - 3.60 MTS', '3,60', '3,60 m', 'i/108/67img01.png'),
        v(68, 'CANALETE 49 CRFS 8MM - 4.00 MTS', '4,00', '4,00 m', 'w/101/68img01.png'),
        v(69, 'CANALETE 49 CRFS 8MM - 4.50 MTS', '4,50', '4,50 m', 'p/100/69img02.png'),
        v(70, 'CANALETE 49 CRFS 8MM - 5.00 MTS', '5,00', '5,00 m', 'e/105/70img01.png'),
        v(71, 'CANALETE 49 CRFS 8MM - 5.50 MTS', '5,50', '5,50 m', 'm/101/71img01.png'),
        v(72, 'CANALETE 49 CRFS 8MM - 6.00 MTS', '6,00', '6,00 m', 'p/118/72img01.png'),
        v(73, 'CANALETE 49 CRFS 8MM - 6.50 MTS', '6,50', '6,50 m', 'o/104/73img01.png'),
        v(74, 'CANALETE 49 CRFS 8MM - 7.20 MTS', '7,20', '7,20 m', 'c/100/74img01.png'),
      ] },
    { id: 'can90', group: 'canalete', tag: 'Canalete', title: 'Canalete 90 8 mm',
      desc: 'A versão mais larga do canalete, para galpões e coberturas extensas.',
      variants: [
        v(94, 'CANALETE 90 CRFS 8MM - 3,00 MTS', '3,00', '3,00 m', 'd/100/94img01.jpg'),
        v(95, 'CANALETE 90 CRFS 8MM - 3.70 MTS', '3,70', '3,70 m', 'p/109/95img01.jpg'),
        v(96, 'CANALETE 90 CRFS 8MM - 4.60 MTS', '4,60', '4,60 m', 'x/118/96img01.jpg'),
        v(97, 'CANALETE 90 CRFS 8MM - 6.00 MTS', '6,00', '6,00 m', 'p/109/97img01.jpg'),
        v(98, 'CANALETE 90 CRFS 8MM - 6.70 MTS', '6,70', '6,70 m', 'v/106/98img01.jpg'),
        v(99, 'CANALETE 90 CRFS 8MM - 7.40 MTS', '7,40', '7,40 m', 'm/109/99img01.jpg'),
        v(100, 'CANALETE 90 CRFS 8MM - 8.20 MTS', '8,20', '8,20 m', 'a/110/100img01.jpg'),
        v(101, 'CANALETE 90 CRFS 8MM - 9.20 MTS', '9,20', '9,20 m', 'v/104/101img01.jpg'),
      ] },
    { id: 'cum-can49', group: 'canalete', tag: 'Canalete', title: 'Cumeeira Canalete 49 Normal',
      desc: 'Fechamento de cumeeira para coberturas feitas com Canalete 49.',
      variants: [v(88, 'CUMEEIRA CAN.49 CRFS NORMAL', 'Normal', 'Normal', 'n/383/CUMEEIRA_CAN_49_NORMAL__55557.png')] },
    { id: 'cum-ond', group: 'pecas', tag: 'Cumeeira', title: 'Cumeeira Ondulada 1,10 m',
      desc: 'Fecha o encontro das águas do telhado. Escolha pela inclinação.',
      variants: [
        v(35, 'CUMEEIRA OND. CRFS 1.10 MTS - 5º', '5°', 'Inclinação de 5°', 'r/100/35img01.jpg'),
        v(36, 'CUMEEIRA OND. CRFS 1.10 MTS - 10º', '10°', 'Inclinação de 10°', 'o/117/36img01.jpg'),
        v(37, 'CUMEEIRA OND. CRFS 1.10 MTS - 15º', '15°', 'Inclinação de 15°', 'v/102/37img01.jpg'),
        v(38, 'CUMEEIRA OND. CRFS 1.10 MTS - 20º', '20°', 'Inclinação de 20°', 'u/116/38img01.jpg'),
        v(39, 'CUMEEIRA OND. CRFS 1.10 MTS - 25º', '25°', 'Inclinação de 25°', 'k/103/39img01.jpg'),
        v(40, 'CUMEEIRA OND. CRFS 1.10 MTS - 30º', '30°', 'Inclinação de 30°', 'r/102/40img01.jpg'),
        v(49, 'CUMEEIRA OND. CRFS 1.10 MTS UNIVERSAL', 'Universal', 'Universal', 'p/119/49img01.jpg'),
      ] },
    { id: 'cum-art', group: 'pecas', tag: 'Cumeeira', title: 'Cumeeira Ondulada Articulada',
      desc: 'Acompanha diferentes inclinações. Use o par superior + inferior.',
      variants: [
        v(33, 'CUMEEIRA OND. ARTICULADA 1,10 MT - SUPERIOR', 'Superior', 'Superior · 1,10 m', 'z/108/33img01.jpg'),
        v(34, 'CUMEEIRA OND. ARTICULADA 1.10 MT - INFERIOR', 'Inferior', 'Inferior · 1,10 m', 'c/118/34img01.jpg'),
      ] },
    { id: 'cum-shed', group: 'pecas', tag: 'Cumeeira', title: 'Cumeeira Shed 80°',
      desc: 'Para coberturas tipo shed, com acabamento direito ou esquerdo.',
      variants: [
        v(47, 'CUMEEIRA OND. CRFS 1.10 MTS SHED 80º - DIREITA', 'Direita', 'Direita · 1,10 m', 'y/111/47img01.jpg'),
        v(48, 'CUMEEIRA OND. CRFS 1.10 MTS SHED 80º - ESQUERDA', 'Esquerda', 'Esquerda · 1,10 m', 't/102/48img01.jpg'),
      ] },
    { id: 'espigao-aba', group: 'pecas', tag: 'Espigão', title: 'Espigão Aba Plana',
      desc: 'Arremate dos espigões em telhados de quatro águas.',
      variants: [
        v(55, 'ESPIGAO ABA PLANA CRFS - 15º', '15°', 'Inclinação de 15°', 'o/117/55img01.jpg'),
        v(56, 'ESPIGAO ABA PLANA CRFS - 20º', '20°', 'Inclinação de 20°', 'v/105/56img01.jpg'),
      ] },
    { id: 'espigao', group: 'pecas', tag: 'Espigão', title: 'Espigão Inicial e Sequencial',
      desc: 'As peças para montar o espigão do começo ao fim.',
      variants: [
        v(52, 'ESPIGAO CRFS INICIAL 0.90 MTS', 'Inicial', 'Inicial · 0,90 m', 'b/108/52img01.jpg'),
        v(51, 'ESPIGAO CRFS SEQUENCIAL 1.80 MTS', 'Sequencial', 'Sequencial · 1,80 m', 'f/107/51img01.jpg'),
      ] },
    { id: 'rufo', group: 'pecas', tag: 'Rufo', title: 'Rufo Ondulado 1,10 m',
      desc: 'Protege o encontro do telhado com paredes e platibandas.',
      variants: [
        v(57, 'RUFO OND. CRFS 1.10 MTS - DIREITO', 'Direito', 'Direito · 1,10 m', 'n/118/57img01.png'),
        v(58, 'RUFO OND. CRFS 1.10 MTS - ESQUERDO', 'Esquerdo', 'Esquerdo · 1,10 m', 'n/102/58img01.png'),
      ] },
    { id: 'cum-barro', group: 'pecas', tag: 'Cerâmica', title: 'Cumeeira de Barro Colonial',
      desc: 'Acabamento de cumeeira para telhados cerâmicos coloniais.',
      variants: [v(358, 'CUMEEIRA BARRO COLONIAL', 'Colonial', 'Barro colonial', 't/058/cumeeira_barro__13010.png')] },
    { id: 'forro', group: 'forro', tag: 'Forro', title: 'Forro PVC Branco 200 × 7 mm',
      desc: 'Acabamento limpo, fácil de instalar e de manter.',
      variants: [
        v(281, 'FORRO PVC 200 X 7MM BRANCO - BR C/ 4,00 MTS', '4,00', 'Barra de 4,00 m', 'd/821/FORRO_PVC__01252.jpg'),
        v(283, 'FORRO PVC 200 X 7MM BRANCO - BR C/ 5.00 MTS', '5,00', 'Barra de 5,00 m', 'h/532/FORRO_PVC__19728.jpg'),
        v(282, 'FORRO PVC 200 X 7MM BRANCO - BR C/ 6.00 MTS', '6,00', 'Barra de 6,00 m', 'd/485/FORRO_PVC__83879.jpg'),
      ] },
    { id: 'parafuso', group: 'fixacao', tag: 'Fixação', title: 'Parafuso Rosca Soberba Completo',
      desc: 'Conjunto completo para fixar telhas de fibrocimento em estrutura de madeira.',
      variants: [
        v(188, 'PARAFUSO ROSC. SOB. 110MM COMPLETO', '110', '110 mm', 'g/355/PARAFUSO__39665.jpg'),
        v(189, 'PARAFUSO ROSC. SOB. 130MM COMPLETO', '130', '130 mm', 'c/162/PARAFUSO__87044__09114.jpg'),
        v(190, 'PARAFUSO ROSC. SOB. 150MM COMPLETO', '150', '150 mm', 'x/133/PARAFUSO__87044__00734.jpg'),
        v(191, 'PARAFUSO ROSC. SOB. 165MM COMPLETO', '165', '165 mm', 'n/421/PARAFUSO__87044__78320.jpg'),
        v(192, 'PARAFUSO ROSC. SOB. 180MM COMPLETO', '180', '180 mm', 'c/585/PARAFUSO__87044__47555.jpg'),
        v(193, 'PARAFUSO ROSC. SOB. 230MM COMPLETO', '230', '230 mm', 'i/851/PARAFUSO__87044__47937.jpg'),
        v(195, 'PARAFUSO ROSC. SOB. 310MM COMPLETO', '310', '310 mm', 'c/784/PARAFUSO__87044__81999.jpg'),
      ] },
  ];

  const GROUPS = [
    { id: 'all', label: 'Todos' },
    { id: 'fibro', label: 'Fibrocimento' },
    { id: 'pvc', label: 'PVC' },
    { id: 'transl', label: 'Translúcidas' },
    { id: 'canalete', label: 'Canaletes' },
    { id: 'pecas', label: 'Peças complementares' },
    { id: 'forro', label: 'Forro' },
    { id: 'fixacao', label: 'Fixação' },
  ];

  const BANNERS = [
    '5e77555277b2f198c58166a4704e09fa', '100d23dd20c64b96ac955f7d86bc54aa', 'dc16e6a8a8e450d880995b65c38e236a',
    '7435d8dedcc8f722296b350fce3e5be8', '0838fa0fd3a60ecdff09a780a54d13d3', 'b778deeec5eb35f01e3bba896ce61cdb',
    '5efe7b25c725cc6a5eefb09c167e96b0', 'c9177b8b7f725c862cbe9f21a9df1199', '0322bba6e8d5c3905fc8978e24948ec7',
    '9733cd1728b672e446c3a57665f11004', 'a0b12e3c766b7f137661b67de8865243', 'c3f8072b7f71b60e88c13c2d5d754208',
    '371036b68b4e3428fc94915151ae5b69', '63fd86a8b16f3df733fd2b257ba8a5c9', '7e84b12c2a7e6d5b6a57b9c0dd1aa837',
    '8a9041ca41f117876912d4ab508c7e7d', 'e11ce3b85989853b1a12c76f70b4c539', 'a0e5452a6f901622317b286a854771ec',
    'ebd07b03fe15c5ec4030cba319d70941', 'bfd29575cc962461bd82f15c0d462383', 'f7e42951bb4e54f40a278b51c8e62264',
    'b7360732a9a5a9603d5ef7508b54f89d', 'ca87e19b596e6694b22831b2473cceec', 'e26c6557098d86a3c908faa4c365f389',
    'b493202bc75c7519efb59e5ca9230d63', '92f7efe31c30ca1418d2c28d910d6d0a', '09715e6fed4307576980e6bae5b8cb12',
  ].map((id) => `${IMG}id_${id}.jpg`);

  const VARIANTS = new Map();
  FAMILIES.forEach((f) => f.variants.forEach((x) => { x.family = f; VARIANTS.set(x.sku, x); }));
  const groupCount = (g) => FAMILIES.filter((f) => g === 'all' || f.group === g).reduce((n, f) => n + f.variants.length, 0);

  /* ---------- Links de WhatsApp ---------- */
  function initWaLinks() {
    $$('[data-wa]').forEach((a) => { a.href = waLink(a.dataset.wa); });
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    const pl = $('#preloader');
    const start = performance.now();
    const done = () => {
      const wait = reduceMotion ? 0 : Math.max(0, 750 - (performance.now() - start));
      setTimeout(() => {
        document.documentElement.classList.add('is-loaded');
        if (pl) { pl.classList.add('is-done'); setTimeout(() => pl.remove(), 1000); }
        document.dispatchEvent(new Event('site:ready'));
      }, wait);
    };
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1600))]).then(done);
  }

  /* ---------- Header / scroll ---------- */
  function initHeader() {
    const header = $('#header');
    const hero = $('#inicio');
    const bar = $('#scrollProgress');
    const toTop = $('#toTop');
    const ring = $('#toTopRing');
    const RING = 138.2;
    let lastY = scrollY;
    let ticking = false;

    const update = () => {
      const y = scrollY;
      const heroBottom = hero.offsetTop + hero.offsetHeight - header.offsetHeight;
      header.classList.toggle('is-scrolled', y > 8);
      header.classList.toggle('is-light', y > heroBottom);
      const menuOpen = document.body.classList.contains('menu-open');
      if (!menuOpen) {
        if (y > 600 && y > lastY + 6) header.classList.add('is-hidden');
        else if (y < lastY - 6 || y < 300) header.classList.remove('is-hidden');
      }
      lastY = y;
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? y / max : 0;
      bar.style.transform = `scaleX(${p})`;
      toTop.classList.toggle('is-visible', y > 900);
      ring.style.strokeDashoffset = String(RING * (1 - p));
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    addEventListener('resize', update);
    update();

    toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    // nav ativa
    const links = $$('.nav a');
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-active'));
        const a = map.get(e.target.id);
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach((s) => io.observe(s));

    // menu mobile
    const btn = $('#menuBtn');
    const menu = $('#mobileMenu');
    const setMenu = (open) => {
      document.body.classList.toggle('menu-open', open);
      document.body.classList.toggle('no-scroll', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.setAttribute('aria-hidden', String(!open));
      if (open) header.classList.remove('is-hidden');
    };
    btn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });
    matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = $$('[data-reveal], .footer-word');
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Hero: rotator, contadores, magnético ---------- */
  function initRotator() {
    const r = $('#rotator');
    if (!r) return;
    const items = $$('span', r);
    let i = 0;
    const fit = () => { r.style.width = `${items[i].offsetWidth}px`; };
    items[0].classList.add('is-active');
    fit();
    if (document.fonts) document.fonts.ready.then(fit);
    addEventListener('resize', fit);
    if (reduceMotion) return;
    setInterval(() => {
      const cur = items[i];
      cur.classList.remove('is-active');
      cur.classList.add('is-leaving');
      setTimeout(() => cur.classList.remove('is-leaving'), 600);
      i = (i + 1) % items.length;
      items[i].classList.add('is-active');
      fit();
    }, 2400);
  }

  function animateCount(el, to, dur = 1400) {
    if (reduceMotion) { el.textContent = to.toLocaleString('pt-BR'); return; }
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e).toLocaleString('pt-BR');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function initCounters() {
    const els = $$('[data-count]');
    els.forEach((el) => { el.textContent = '0'; });
    document.addEventListener('site:ready', () => {
      setTimeout(() => els.forEach((el) => animateCount(el, +el.dataset.count)), 700);
    }, { once: true });
  }

  function initMagnetic() {
    if (isTouch || reduceMotion) return;
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  function initTilt() {
    $$('.tilt').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        if (!reduceMotion && !isTouch) {
          el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 7}deg) translateY(-4px)`;
        }
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- Hero: cena de chuva ---------- */
  function initRain() {
    const scene = $('#scene');
    const canvas = $('#rainCanvas');
    const visual = $('.hero-visual');
    if (!scene || !canvas) return;
    const ctx = canvas.getContext('2d');

    const VW = 600, VH = 540, GROUND = 470;
    const EL = 70, RX = 300, ER = 530, EY = 305, RY = 150, THICK = 20;
    const K = (EY - RY) / (RX - EL);
    const roofY = (x) => (x <= RX ? EY - (x - EL) * K : RY + (x - RX) * K);
    const CH = { x1: 377, x2: 417, y: 160 };
    const COS = (RX - EL) / Math.hypot(RX - EL, EY - RY);

    // telhado ondulado (perfil de onda na borda)
    (function buildRoof() {
      const len = Math.hypot(RX - EL, EY - RY);
      const amp = 3.2, wl = 13;
      const top = [];
      const seg = (x0, y0, x1, y1, nx, ny) => {
        const n = Math.round(len / 1.5);
        for (let i = 0; i <= n; i++) {
          const t = i / n, s = t * len;
          const o = amp * Math.sin((s / wl) * Math.PI * 2);
          top.push([(x0 + (x1 - x0) * t + nx * o).toFixed(2), (y0 + (y1 - y0) * t + ny * o).toFixed(2)]);
        }
      };
      const ux = (RX - EL) / len, uy = (EY - RY) / len;
      seg(EL, EY, RX, RY, -uy, -ux);
      seg(RX, RY, ER, EY, uy, -ux);
      const topD = 'M' + top.map((p) => p.join(' ')).join(' L');
      const d = `${topD} L${ER} ${EY + THICK} L${RX} ${RY + THICK} L${EL} ${EY + THICK} Z`;
      $('#roofPath').setAttribute('d', d);
      const shade = $('#roofShade');
      shade.setAttribute('d', topD);
      shade.setAttribute('stroke', '#fff');
      shade.setAttribute('stroke-opacity', '.28');
      shade.setAttribute('stroke-width', '1.4');
    })();

    let dpr = 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
      const s = (r.width / VW) * dpr;
      ctx.setTransform(s, 0, 0, s, 0, 0);
    };
    resize();
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);

    const N = innerWidth < 700 ? 90 : 170;
    const drops = [];
    const splashes = [];
    const beads = [];
    const drips = [];
    let bolt = null;
    const raining = !reduceMotion;
    let wind = 0.15, targetWind = 0.15;
    let visible = true, running = false, last = 0, gutterT = 0;

    const spawn = (d, init) => {
      d.x = Math.random() * (VW + 260) - 130;
      d.y = init ? Math.random() * VH - VH * 0.9 : -20 - Math.random() * 80;
      d.vy = 720 + Math.random() * 340;
      d.len = 12 + Math.random() * 14;
      d.gy = GROUND + 6 + Math.random() * 58;
      d.alive = true;
    };
    for (let i = 0; i < N; i++) { const d = {}; spawn(d, true); drops.push(d); }

    const splash = (x, y, n) => {
      if (splashes.length > 420) return;
      for (let i = 0; i < n; i++) {
        splashes.push({ x, y, vx: (Math.random() - 0.5) * 150 + wind * 70, vy: -(60 + Math.random() * 130), life: 0, max: 0.22 + Math.random() * 0.25 });
      }
    };

    const thunder = (clientX) => {
      scene.classList.remove('is-flash');
      void scene.offsetWidth;
      scene.classList.add('is-flash');
      const r = canvas.getBoundingClientRect();
      let x = clientX != null ? ((clientX - r.left) / r.width) * VW : 80 + Math.random() * 440;
      if (x > 150 && x < 450) x = x < 300 ? 40 + Math.random() * 90 : 470 + Math.random() * 100;
      const pts = [[x, -10]];
      let y = -10;
      const endY = 110 + Math.random() * 90;
      while (y < endY) { y += 16 + Math.random() * 22; x += (Math.random() - 0.5) * 46; pts.push([x, y]); }
      const branch = [];
      const bi = Math.floor(pts.length / 2);
      let bx = pts[bi][0], by = pts[bi][1];
      branch.push([bx, by]);
      for (let i = 0; i < 3; i++) { by += 14 + Math.random() * 14; bx += (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 20); branch.push([bx, by]); }
      bolt = { pts, branch, t: 0 };
      start();
    };

    const drawPath = (pts) => { ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); };

    const frame = (t) => {
      if (!running) return;
      const dt = Math.min(0.033, last ? (t - last) / 1000 : 0.016);
      last = t;
      if (isTouch) targetWind = Math.sin(t / 3500) * 0.35;
      wind += (targetWind - wind) * Math.min(1, dt * 2.5);
      const vx = wind * 260;
      ctx.clearRect(0, 0, VW, VH);

      // gotas
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(188, 205, 236, .5)';
      ctx.lineWidth = 1.15;
      let alive = 0;
      for (const d of drops) {
        if (!d.alive) continue;
        const py = d.y;
        d.x += vx * dt;
        d.y += d.vy * dt;
        let hit = null;
        if (d.x >= CH.x1 && d.x <= CH.x2 && d.y >= CH.y && py < CH.y + 30) hit = CH.y;
        else if (d.x >= EL && d.x <= ER) {
          const ry = roofY(d.x);
          if (d.y >= ry && py < ry + 30) {
            hit = ry;
            if (Math.random() < 0.13 && beads.length < 60) beads.push({ x: d.x, dir: d.x < RX ? -1 : 1, v: 30 });
          }
        }
        if (hit === null && d.y >= d.gy) hit = d.gy;
        if (hit !== null) {
          splash(d.x, hit, hit === d.gy ? 2 : 3);
          if (raining) spawn(d, false); else { d.alive = false; continue; }
        }
        alive++;
        const m = Math.hypot(vx, d.vy);
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - (vx / m) * d.len, d.y - (d.vy / m) * d.len);
      }
      ctx.stroke();

      // água escorrendo no telhado
      ctx.fillStyle = 'rgba(225, 235, 255, .85)';
      for (let i = beads.length - 1; i >= 0; i--) {
        const b = beads[i];
        b.v += 520 * dt;
        b.x += b.dir * b.v * dt * COS;
        if ((b.dir < 0 && b.x <= EL) || (b.dir > 0 && b.x >= ER)) {
          drips.push({ x: b.dir < 0 ? EL - 4 : ER + 4, y: EY + THICK + 4, vy: 30 });
          beads.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(b.x, roofY(b.x) - 1, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // pingos da calha
      gutterT += dt;
      if (raining && gutterT > 0.18) {
        gutterT = 0;
        drips.push({ x: Math.random() < 0.5 ? 64 : 536, y: 329, vy: 20 });
      }
      ctx.strokeStyle = 'rgba(205, 220, 250, .8)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let i = drips.length - 1; i >= 0; i--) {
        const p = drips[i];
        p.vy += 1500 * dt;
        p.y += p.vy * dt;
        if (p.y >= GROUND + 8) { splash(p.x, GROUND + 8, 3); drips.splice(i, 1); continue; }
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y - Math.min(9, 3 + p.vy * 0.008));
      }
      ctx.stroke();

      // respingos
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.life += dt;
        if (s.life >= s.max) { splashes.splice(i, 1); continue; }
        s.vy += 900 * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        ctx.globalAlpha = (1 - s.life / s.max) * 0.85;
        ctx.fillStyle = '#DCE6FA';
        ctx.fillRect(s.x - 0.9, s.y - 0.9, 1.8, 1.8);
      }
      ctx.globalAlpha = 1;

      // raio
      if (bolt) {
        bolt.t += dt;
        const a = 1 - bolt.t / 0.38;
        if (a <= 0) bolt = null;
        else {
          ctx.save();
          ctx.shadowColor = '#A9C3FF';
          ctx.shadowBlur = 22;
          ctx.strokeStyle = `rgba(240, 245, 255, ${a})`;
          ctx.lineWidth = 2.6;
          ctx.lineJoin = 'round';
          ctx.beginPath(); drawPath(bolt.pts); ctx.stroke();
          ctx.lineWidth = 1.4;
          ctx.beginPath(); drawPath(bolt.branch); ctx.stroke();
          ctx.restore();
        }
      }

      const busy = alive || splashes.length || beads.length || drips.length || bolt;
      if (!busy && !raining) { running = false; ctx.clearRect(0, 0, VW, VH); return; }
      requestAnimationFrame(frame);
    };

    function start() {
      if (running || !visible || document.hidden) return;
      running = true;
      last = 0;
      requestAnimationFrame(frame);
    }
    const stop = () => { running = false; };

    if (!raining) drops.forEach((d) => { d.alive = false; });

    scene.addEventListener('click', (e) => thunder(e.clientX));

    if (!isTouch) {
      const hero = $('#inicio');
      hero.addEventListener('pointermove', (e) => {
        const nx = e.clientX / innerWidth - 0.5;
        const ny = e.clientY / innerHeight - 0.5;
        targetWind = clamp(nx * 1.8, -0.9, 0.9);
        if (!reduceMotion && visual) visual.style.transform = `perspective(1400px) rotateY(${nx * 5}deg) rotateX(${-ny * 3}deg)`;
      });
      hero.addEventListener('pointerleave', () => { if (visual) visual.style.transform = ''; });
      if (visual) visual.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
    }

    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start(); else stop();
    }).observe(scene);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
    start();
  }

  /* ---------- Marquees ---------- */
  function initMarquees() {
    const ms = $$('.marquee');
    if (!ms.length) return;
    ms.forEach((m) => {
      const track = $('.marquee-track', m);
      const base = track.innerHTML;
      const baseCount = track.children.length;
      let guard = 0;
      while (track.scrollWidth < innerWidth * 1.6 && guard++ < 10) track.insertAdjacentHTML('beforeend', base);
      track.insertAdjacentHTML('beforeend', track.innerHTML);
      [...track.children].forEach((el, i) => { if (i >= baseCount) el.setAttribute('aria-hidden', 'true'); });
      m._track = track;
      m._x = 0;
      m._speed = parseFloat(m.dataset.speed) || 60;
      m._half = track.scrollWidth / 2;
    });
    addEventListener('resize', () => ms.forEach((m) => { m._half = m._track.scrollWidth / 2; }));
    if (reduceMotion) return;

    let vel = 0, lastY = scrollY, visible = true, last = 0;
    addEventListener('scroll', () => { vel += scrollY - lastY; lastY = scrollY; }, { passive: true });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) requestAnimationFrame(loop); }).observe($('.marquees'));

    function loop(t) {
      if (!visible) return;
      const dt = Math.min(0.05, last ? (t - last) / 1000 : 0.016);
      last = t;
      vel *= 0.9;
      const boost = Math.min(900, Math.abs(vel) * 6);
      ms.forEach((m) => {
        const dir = Math.sign(m._speed);
        m._x -= dir * (Math.abs(m._speed) + boost) * dt;
        while (m._x <= -m._half) m._x += m._half;
        while (m._x > 0) m._x -= m._half;
        m._track.style.transform = `translate3d(${m._x.toFixed(2)}px,0,0)`;
      });
      requestAnimationFrame(loop);
    }
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg, actionLabel, action) {
    const el = $('#toast');
    el.innerHTML = `<span class="ok"><svg class="ico"><use href="#i-check"/></svg></span><span class="msg">${esc(msg)}</span>${actionLabel ? `<button type="button">${esc(actionLabel)}</button>` : ''}`;
    if (actionLabel) $('button', el).addEventListener('click', () => { el.classList.remove('is-visible'); action(); });
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3800);
  }

  /* ---------- Lista de orçamento ---------- */
  const LIST_KEY = 'centernit:lista';
  let list = [];
  try {
    const saved = JSON.parse(localStorage.getItem(LIST_KEY) || '[]');
    if (Array.isArray(saved)) list = saved.filter((i) => VARIANTS.has(i.sku) && i.qty > 0);
  } catch (e) { list = []; }
  const saveList = () => { try { localStorage.setItem(LIST_KEY, JSON.stringify(list)); } catch (e) { /* sem storage */ } };

  function addToList(sku, qty, fromImg) {
    const vv = VARIANTS.get(sku);
    if (!vv || qty < 1) return;
    const it = list.find((i) => i.sku === sku);
    if (it) it.qty += qty; else list.push({ sku, qty });
    saveList();
    renderList();
    if (fromImg) flyToList(fromImg);
    const badge = $('#listCount');
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
    toast(`Na lista: ${qty}× ${vv.family.title} · ${vv.spec}`, 'Ver lista', openDrawer);
  }

  function flyToList(img) {
    if (reduceMotion || !img) return;
    $('#header').classList.remove('is-hidden');
    const target = $('#openList').getBoundingClientRect();
    const r = img.getBoundingClientRect();
    const size = Math.min(r.width, 140);
    const clone = img.cloneNode();
    clone.className = 'fly-img';
    clone.removeAttribute('loading');
    Object.assign(clone.style, { left: `${r.left + (r.width - size) / 2}px`, top: `${r.top + (r.height - size) / 2}px`, width: `${size}px`, height: `${size}px` });
    document.body.appendChild(clone);
    const dx = target.left + target.width / 2 - (r.left + r.width / 2);
    const dy = target.top + target.height / 2 - (r.top + r.height / 2);
    clone.animate([
      { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 90}px) scale(.6) rotate(-12deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(.12) rotate(-20deg)`, opacity: 0.3 },
    ], { duration: 850, easing: 'cubic-bezier(.5,0,.25,1)' }).onfinish = () => clone.remove();
  }

  function renderList() {
    const body = $('#drawerBody');
    const badge = $('#listCount');
    const n = list.length;
    badge.textContent = String(n);
    badge.classList.toggle('is-empty', n === 0);
    $('#drawerCount').textContent = n === 1 ? '1 item' : `${n} itens`;
    $('#drawerFoot').classList.toggle('is-hidden', n === 0);
    if (!n) {
      body.innerHTML = `<div class="l-empty"><span class="l-empty-ico"><svg class="ico"><use href="#i-list"/></svg></span><strong>Sua lista está vazia</strong><p>Escolha as medidas no catálogo ou use a calculadora de telhas.</p><a class="btn btn-outline btn-sm" href="#catalogo" data-close>Ver catálogo</a></div>`;
      return;
    }
    body.innerHTML = list.map((it) => {
      const x = VARIANTS.get(it.sku);
      return `<div class="l-item" data-sku="${it.sku}">
        <div class="l-thumb"><img src="${IMG + x.img}" alt="" loading="lazy"></div>
        <div class="l-info"><strong>${esc(x.family.title)}</strong><span>${esc(x.spec)}</span></div>
        <div class="l-side">
          <div class="qty"><button type="button" class="qty-btn" data-step="-1" aria-label="Diminuir">−</button><input class="qty-input" type="number" min="1" max="9999" value="${it.qty}" aria-label="Quantidade de ${esc(x.family.title)} ${esc(x.spec)}"><button type="button" class="qty-btn" data-step="1" aria-label="Aumentar">+</button></div>
          <button type="button" class="l-remove"><svg class="ico"><use href="#i-trash"/></svg>Remover</button>
        </div>
      </div>`;
    }).join('');
  }

  let lastFocus = null;
  function openDrawer() {
    const d = $('#drawer');
    lastFocus = document.activeElement;
    d.classList.add('is-open');
    d.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(() => $('.drawer-panel [data-close]', d).focus(), 50);
  }
  function closeDrawer() {
    const d = $('#drawer');
    d.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  function initList() {
    renderList();
    $('#openList').addEventListener('click', openDrawer);
    const drawer = $('#drawer');
    drawer.addEventListener('click', (e) => {
      const closer = e.target.closest('[data-close]');
      if (closer) { closeDrawer(); return; }
      const item = e.target.closest('.l-item');
      if (!item) return;
      const sku = +item.dataset.sku;
      const it = list.find((i) => i.sku === sku);
      if (e.target.closest('.l-remove')) {
        item.classList.add('is-removing');
        setTimeout(() => { list = list.filter((i) => i.sku !== sku); saveList(); renderList(); }, reduceMotion ? 0 : 300);
        return;
      }
      const step = e.target.closest('.qty-btn');
      if (step && it) {
        it.qty = clamp(it.qty + +step.dataset.step, 1, 9999);
        $('.qty-input', item).value = it.qty;
        saveList();
      }
    });
    drawer.addEventListener('change', (e) => {
      const input = e.target.closest('.qty-input');
      if (!input) return;
      const sku = +input.closest('.l-item').dataset.sku;
      const it = list.find((i) => i.sku === sku);
      if (it) { it.qty = clamp(parseInt(input.value, 10) || 1, 1, 9999); input.value = it.qty; saveList(); }
    });
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer(); });

    $('#sendList').addEventListener('click', () => {
      if (!list.length) return;
      const city = $('#listCity').value.trim();
      const notes = $('#listNotes').value.trim();
      const lines = list.map((it) => `• ${it.qty}x ${VARIANTS.get(it.sku).name}`);
      let msg = `Olá, Centernit! Gostaria de um orçamento destes itens:\n\n${lines.join('\n')}`;
      if (city) msg += `\n\nEntrega em: ${city}`;
      if (notes) msg += `\nObs.: ${notes}`;
      window.open(waLink(msg), '_blank', 'noopener');
    });
    $('#clearList').addEventListener('click', () => {
      if (!confirm('Limpar todos os itens da lista?')) return;
      list = [];
      saveList();
      renderList();
    });
  }

  /* ---------- Catálogo ---------- */
  let currentFilter = 'all';
  function cardHTML(f) {
    const x = f.variants[0];
    const multi = f.variants.length > 1;
    const chips = multi
      ? `<div class="p-variants" role="radiogroup" aria-label="Escolha a medida de ${esc(f.title)}">${f.variants.map((y, i) => `<button type="button" class="p-chip" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-sku="${y.sku}">${esc(y.label)}</button>`).join('')}</div>`
      : '';
    return `<article class="p-card" data-family="${f.id}" data-group="${f.group}" data-sku="${x.sku}">
      <div class="p-media">
        <img src="${IMG + x.img}" alt="${esc(f.title)}" loading="lazy" decoding="async" width="300" height="225">
        <span class="p-tag">${esc(f.tag)}</span>
        ${multi ? `<span class="p-count">${f.variants.length} opções</span>` : ''}
      </div>
      <div class="p-body">
        <h3 class="p-title">${esc(f.title)}</h3>
        <p class="p-desc">${esc(f.desc)}</p>
        ${chips}
        <p class="p-spec">${multi ? 'Selecionado' : 'Especificação'}: <strong data-spec>${esc(x.spec)}</strong></p>
        <div class="p-actions">
          <div class="qty"><button type="button" class="qty-btn" data-step="-1" aria-label="Diminuir quantidade">−</button><input class="qty-input" type="number" min="1" max="9999" value="1" inputmode="numeric" aria-label="Quantidade"><button type="button" class="qty-btn" data-step="1" aria-label="Aumentar quantidade">+</button></div>
          <button type="button" class="btn btn-primary btn-sm" data-add><svg class="ico"><use href="#i-plus"/></svg>Adicionar</button>
        </div>
        <a class="p-quick" data-quick target="_blank" rel="noopener" href="${waLink(`Olá, Centernit! Gostaria de cotar: ${x.name}`)}"><svg class="ico"><use href="#i-wa"/></svg>Cotar só este item<svg class="ico"><use href="#i-arrow"/></svg></a>
      </div>
    </article>`;
  }

  function selectVariant(card, sku) {
    const x = VARIANTS.get(sku);
    if (!x) return;
    card.dataset.sku = sku;
    $$('.p-chip', card).forEach((c) => {
      const on = +c.dataset.sku === sku;
      c.setAttribute('aria-checked', String(on));
      c.tabIndex = on ? 0 : -1;
    });
    $('[data-spec]', card).textContent = x.spec;
    $('[data-quick]', card).href = waLink(`Olá, Centernit! Gostaria de cotar: ${x.name}`);
    const img = $('.p-media img', card);
    const src = IMG + x.img;
    if (img.src !== src) {
      img.classList.add('is-swapping');
      const pre = new Image();
      pre.onload = pre.onerror = () => { img.src = src; img.classList.remove('is-swapping'); };
      pre.src = src;
    }
  }

  function initCatalog() {
    const grid = $('#catalogGrid');
    grid.innerHTML = FAMILIES.map(cardHTML).join('');

    // filtros
    const filters = $('#filters');
    const pill = $('.filter-pill', filters);
    filters.insertAdjacentHTML('beforeend', GROUPS.map((g) => `<button type="button" class="filter" role="tab" aria-selected="${g.id === 'all'}" data-group="${g.id}">${esc(g.label)}<span class="filter-count">${groupCount(g.id)}</span></button>`).join(''));
    const movePill = () => {
      const active = $('.filter[aria-selected="true"]', filters);
      if (!active) return;
      pill.style.width = `${active.offsetWidth}px`;
      pill.style.transform = `translateX(${active.offsetLeft}px)`;
    };
    requestAnimationFrame(movePill);
    document.fonts && document.fonts.ready.then(movePill);
    addEventListener('resize', movePill);
    filters.addEventListener('click', (e) => {
      const b = e.target.closest('.filter');
      if (b) setFilter(b.dataset.group);
    });

    window.__setFilter = setFilter;
    function setFilter(group, opts = {}) {
      currentFilter = group;
      $$('.filter', filters).forEach((b) => b.setAttribute('aria-selected', String(b.dataset.group === group)));
      movePill();
      const active = $('.filter[aria-selected="true"]', filters);
      if (active && filters.scrollWidth > filters.clientWidth) {
        filters.scrollTo({ left: active.offsetLeft - 24, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      const cards = $$('.p-card', grid);
      const first = new Map(cards.map((c) => [c, c.hidden ? null : c.getBoundingClientRect()]));
      cards.forEach((c) => { c.hidden = !(group === 'all' || c.dataset.group === group); });
      if (reduceMotion || opts.instant) return;
      cards.forEach((c) => {
        if (c.hidden) return;
        const f = first.get(c);
        const l = c.getBoundingClientRect();
        if (!f) {
          c.animate([{ opacity: 0, transform: 'scale(.94) translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' });
        } else {
          const dx = f.left - l.left, dy = f.top - l.top;
          if (dx || dy) c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)' });
        }
      });
    }

    // links de categoria em qualquer lugar da página
    $$('[data-filter]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      setFilter(a.dataset.filter, { instant: true });
      $('#catalogo').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }));

    // interações nos cards
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.p-card');
      if (!card) return;
      const chip = e.target.closest('.p-chip');
      if (chip) { selectVariant(card, +chip.dataset.sku); return; }
      const step = e.target.closest('.qty-btn');
      if (step) {
        const input = $('.qty-input', card);
        input.value = clamp((parseInt(input.value, 10) || 1) + +step.dataset.step, 1, 9999);
        return;
      }
      if (e.target.closest('[data-add]')) {
        const input = $('.qty-input', card);
        const qty = clamp(parseInt(input.value, 10) || 1, 1, 9999);
        addToList(+card.dataset.sku, qty, $('.p-media img', card));
        input.value = 1;
      }
    });
    grid.addEventListener('keydown', (e) => {
      const chip = e.target.closest('.p-chip');
      if (!chip || !['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) return;
      e.preventDefault();
      const chips = $$('.p-chip', chip.parentElement);
      const i = chips.indexOf(chip);
      const next = chips[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + chips.length) % chips.length];
      next.focus();
      selectVariant(chip.closest('.p-card'), +next.dataset.sku);
    });
    grid.addEventListener('change', (e) => {
      const input = e.target.closest('.qty-input');
      if (input) input.value = clamp(parseInt(input.value, 10) || 1, 1, 9999);
    });
  }

  function revealProduct(sku) {
    const x = VARIANTS.get(sku);
    if (!x) return;
    if (currentFilter !== 'all' && currentFilter !== x.family.group) window.__setFilter('all', { instant: true });
    const card = $(`.p-card[data-family="${x.family.id}"]`);
    selectVariant(card, sku);
    card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    card.classList.remove('is-highlight');
    void card.offsetWidth;
    card.classList.add('is-highlight');
  }

  /* ---------- Busca ---------- */
  function initSearch() {
    const wrap = $('#search');
    const input = $('#searchInput');
    const results = $('#searchResults');
    const caption = $('#searchCaption');
    const INDEX = [...VARIANTS.values()].map((x) => ({ x, key: norm(`${x.family.title} ${x.family.tag} ${x.spec} ${x.label} ${x.name}`) }));
    const POPULAR = [11, 19, 258, 72, 37, 222, 188, 283].map((s) => VARIANTS.get(s));
    let items = [];
    let active = 0;
    let lastFocusS = null;

    if (/Mac|iPhone|iPad/.test(navigator.platform)) { const k = $('#openSearch kbd'); if (k) k.textContent = '⌘K'; }

    const highlight = (text, toks) => {
      let out = esc(text);
      toks.forEach((t) => {
        if (t.length < 2) return;
        const re = new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
        out = out.replace(re, '<mark>$1</mark>');
      });
      return out;
    };

    const render = () => {
      const q = input.value.trim();
      const toks = norm(q).split(/\s+/).filter(Boolean);
      if (!toks.length) { items = POPULAR; caption.textContent = 'Mais procurados'; }
      else {
        const res = toks.map((t) => new RegExp(`(^|[\\s(])${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
        items = INDEX.filter((e) => toks.every((t) => e.key.includes(t)))
          .map((e) => ({ x: e.x, score: res.reduce((s, re) => s + (re.test(e.key) ? 2 : 1), 0) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10).map((e) => e.x);
        caption.textContent = items.length ? `${items.length === 10 ? '10+' : items.length} resultado${items.length > 1 ? 's' : ''}` : 'Nenhum resultado';
      }
      active = 0;
      const rawToks = q.split(/\s+/).filter(Boolean);
      results.innerHTML = items.length
        ? items.map((x, i) => `<li class="s-item${i === 0 ? ' is-active' : ''}" role="option" id="s-opt-${i}" aria-selected="${i === 0}" data-sku="${x.sku}">
            <span class="s-thumb"><img src="${IMG + x.img}" alt="" loading="lazy"></span>
            <span class="s-text"><strong>${highlight(x.family.title, rawToks)}</strong><span>${highlight(x.spec, rawToks)} · ${esc(x.family.tag)}</span></span>
            <button type="button" class="s-add" data-add aria-label="Adicionar ${esc(x.family.title)} ${esc(x.spec)} à lista"><svg class="ico"><use href="#i-plus"/></svg>Lista</button>
          </li>`).join('')
        : `<li class="s-empty">Não encontramos “${esc(q)}”. <a href="${waLink(`Olá, Centernit! Vocês têm ${q}?`)}" target="_blank" rel="noopener" style="color:var(--red);font-weight:700">Pergunte no WhatsApp</a></li>`;
      input.setAttribute('aria-activedescendant', items.length ? 's-opt-0' : '');
    };

    const setActive = (i) => {
      const lis = $$('.s-item', results);
      if (!lis.length) return;
      active = (i + lis.length) % lis.length;
      lis.forEach((li, j) => { li.classList.toggle('is-active', j === active); li.setAttribute('aria-selected', String(j === active)); });
      lis[active].scrollIntoView({ block: 'nearest' });
      input.setAttribute('aria-activedescendant', `s-opt-${active}`);
    };

    const open = () => {
      lastFocusS = document.activeElement;
      wrap.classList.add('is-open');
      wrap.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      render();
      setTimeout(() => input.focus(), 30);
    };
    const close = () => {
      wrap.classList.remove('is-open');
      wrap.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      if (lastFocusS) lastFocusS.focus({ preventScroll: true });
    };

    $('#openSearch').addEventListener('click', open);
    input.addEventListener('input', render);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const x = items[active];
        if (x) addToList(x.sku, 1);
      }
    });
    results.addEventListener('click', (e) => {
      const li = e.target.closest('.s-item');
      if (!li) return;
      const sku = +li.dataset.sku;
      if (e.target.closest('[data-add]')) { addToList(sku, 1); return; }
      close();
      setTimeout(() => revealProduct(sku), 60);
    });
    wrap.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    addEventListener('keydown', (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); wrap.classList.contains('is-open') ? close() : open(); }
      else if (e.key === '/' && !typing && !wrap.classList.contains('is-open')) { e.preventDefault(); open(); }
      else if (e.key === 'Escape' && wrap.classList.contains('is-open')) close();
    });
  }

  /* ---------- Calculadora ---------- */
  const CALC_TYPES = [
    { id: 'ond6', label: 'Ondulada 6 mm', fam: 'ond6', w: 1.10, useful: 1.05, ov: 0.14, ridge: true, c1: '#C3C8D0', c2: '#A9AFB9' },
    { id: 'ond8', label: 'Ondulada 8 mm', fam: 'ond8', w: 1.10, useful: 1.05, ov: 0.14, ridge: true, c1: '#B9BEC7', c2: '#9EA5B0' },
    { id: 'trop5', label: 'Tropical 5 mm', fam: 'trop5', w: 1.10, useful: 1.05, ov: 0.14, ridge: true, c1: '#CDD1D8', c2: '#B4BAC3' },
    { id: 'pvc', label: 'PVC', fam: 'pvc', w: 0.88, useful: 0.82, ov: 0.15, ridge: false, c1: '#E0383F', c2: '#B21E25' },
    { id: 'poli', label: 'Translúcida', fam: 'poli', w: 1.10, useful: 1.05, ov: 0.14, ridge: true, c1: 'rgba(205,228,245,.75)', c2: 'rgba(170,205,230,.75)' },
  ];
  const parseSpec = (spec) => {
    const m = spec.match(/([\d,]+)\s*×\s*([\d,]+)/);
    return m ? { len: parseFloat(m[1].replace(',', '.')), w: parseFloat(m[2].replace(',', '.')) } : null;
  };

  function initCalc() {
    const typeWrap = $('#calcType');
    const W = $('#calcW'), A = $('#calcA');
    const WOut = $('#calcWOut'), AOut = $('#calcAOut');
    const lenSel = $('#calcLen');
    const svg = $('#calcSvg');
    let lastTotal = 0;
    let state = null;

    typeWrap.innerHTML = CALC_TYPES.map((t, i) => `<label><input type="radio" name="ctype" value="${t.id}"${i === 0 ? ' checked' : ''}><span>${t.label}</span></label>`).join('');

    const getType = () => CALC_TYPES.find((t) => t.id === $('input[name="ctype"]:checked', typeWrap).value);
    const lengthsFor = (t) => {
      const fam = FAMILIES.find((f) => f.id === t.fam);
      return fam.variants.map((x) => ({ x, ...parseSpec(x.spec) })).filter((o) => o.len && Math.abs(o.w - t.w) < 0.01);
    };

    const fillLengths = () => {
      const t = getType();
      const prev = lenSel.value;
      const opts = lengthsFor(t);
      lenSel.innerHTML = `<option value="auto">Automático (menor sobra)</option>` + opts.map((o) => `<option value="${o.len}">${fmt(o.len)} m</option>`).join('');
      lenSel.value = opts.some((o) => String(o.len) === prev) ? prev : 'auto';
    };

    const setRangeFill = (el) => {
      const p = ((el.value - el.min) / (el.max - el.min)) * 100;
      el.style.setProperty('--p', `${p}%`);
    };

    const compute = () => {
      const t = getType();
      const w = parseFloat(W.value), a = parseFloat(A.value);
      const aguas = +$('input[name="aguas"]:checked').value;
      const opts = lengthsFor(t);
      const cols = Math.ceil(w / t.useful - 1e-9);
      const rowsFor = (L) => (a <= L ? 1 : 1 + Math.ceil((a - L) / (L - t.ov) - 1e-9));
      const cand = lenSel.value === 'auto' ? opts : opts.filter((o) => String(o.len) === lenSel.value);
      let best = null;
      cand.forEach((o) => {
        const rows = rowsFor(o.len);
        const covered = o.len + (rows - 1) * (o.len - t.ov);
        const waste = covered - a;
        const score = waste + rows * 0.06;
        if (!best || score < best.score) best = { ...o, rows, covered, waste, score };
      });
      const perAgua = cols * best.rows;
      const total = perAgua * aguas;
      const ridge = t.ridge && aguas === 2 ? Math.ceil(w / 1.05 - 1e-9) : 0;
      const area = w * a * aguas;
      const eff = ((w * a) / (cols * t.useful * best.covered)) * 100;
      return { t, w, a, aguas, cols, rows: best.rows, L: best.len, step: best.len - t.ov, variant: best.x, perAgua, total, ridge, area, eff };
    };

    const tweenTotal = (to) => {
      const el = $('#calcTotal');
      const from = lastTotal;
      lastTotal = to;
      if (reduceMotion || from === to) { el.textContent = to; return; }
      const st = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - st) / 500);
        el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const draw = (r, animate) => {
      const VWd = 640, VHd = 400, padL = 72, padR = 72, padT = 46, padB = 26;
      const totalD = r.a * r.aguas;
      const sc = Math.min((VWd - padL - padR) / r.w, (VHd - padT - padB) / totalD);
      const rw = r.w * sc, rh = r.a * sc;
      const ox = padL + (VWd - padL - padR - rw) / 2;
      const oy = padT + (VHd - padT - padB - rh * r.aguas) / 2;
      const waveW = Math.max(2.5, (r.t.useful * sc) / 6);
      let i = 0;
      let out = `<defs>
        <pattern id="corrPat" width="${waveW.toFixed(2)}" height="10" patternUnits="userSpaceOnUse"><rect width="${waveW.toFixed(2)}" height="10" fill="${r.t.c1}"/><rect width="${(waveW / 2).toFixed(2)}" height="10" fill="${r.t.c2}"/></pattern>`;
      for (let k = 0; k < r.aguas; k++) out += `<clipPath id="clipAg${k}"><rect x="${ox}" y="${oy + k * rh}" width="${rw}" height="${rh}"/></clipPath>`;
      out += '</defs>';
      out += `<rect class="roof-bg" x="${ox}" y="${oy}" width="${rw}" height="${rh * r.aguas}" rx="2"/>`;
      for (let k = 0; k < r.aguas; k++) {
        out += `<g clip-path="url(#clipAg${k})">`;
        for (let row = 0; row < r.rows; row++) {
          for (let c = 0; c < r.cols; c++) {
            const x = ox + c * r.t.useful * sc;
            const h = r.L * sc;
            const off = row * r.step * sc;
            const y = k === 0 ? oy + off : oy + 2 * rh - off - h;
            out += `<rect class="tile" style="--i:${i++}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${(r.t.w * sc).toFixed(2)}" height="${h.toFixed(2)}" fill="url(#corrPat)" stroke="rgba(0,0,0,.45)" stroke-width="1" rx="1"/>`;
          }
        }
        out += '</g>';
      }
      // cotas
      const yTop = oy - 18;
      out += `<path class="dim" d="M${ox} ${yTop - 6} V${yTop + 6} M${ox + rw} ${yTop - 6} V${yTop + 6} M${ox} ${yTop} H${ox + rw}"/>`;
      out += `<text class="dim-text" x="${ox + rw / 2}" y="${yTop - 8}" text-anchor="middle">${fmt(r.w, 1)} m</text>`;
      const xL = ox - 20;
      out += `<path class="dim" d="M${xL - 6} ${oy} H${xL + 6} M${xL - 6} ${oy + rh} H${xL + 6} M${xL} ${oy} V${oy + rh}"/>`;
      out += `<text class="dim-text" x="${xL - 8}" y="${oy + rh / 2}" text-anchor="middle" transform="rotate(-90 ${xL - 8} ${oy + rh / 2})">${fmt(r.a, 1)} m</text>`;
      if (r.aguas === 2) {
        out += `<line class="ridge" x1="${ox - 6}" y1="${oy + rh}" x2="${ox + rw + 6}" y2="${oy + rh}"/>`;
        out += `<text class="ridge-text" x="${ox + rw + 12}" y="${oy + rh + 4}">cumeeira</text>`;
        out += `<text class="label-muted" x="${ox + rw + 12}" y="${oy + 10}">beiral</text>`;
        out += `<text class="label-muted" x="${ox + rw + 12}" y="${oy + 2 * rh}">beiral</text>`;
      } else {
        out += `<text class="label-muted" x="${ox + rw + 12}" y="${oy + 10}">beiral</text>`;
        out += `<text class="label-muted" x="${ox + rw + 12}" y="${oy + rh}">parte alta</text>`;
      }
      svg.innerHTML = out;
      svg.style.setProperty('--stagger', `${Math.min(14, 900 / Math.max(1, i)).toFixed(2)}ms`);
      svg.classList.remove('animate');
      if (animate && !reduceMotion) { void svg.getBoundingClientRect(); svg.classList.add('animate'); }
    };

    const update = (animate) => {
      WOut.textContent = `${fmt(parseFloat(W.value), 1)} m`;
      AOut.textContent = `${fmt(parseFloat(A.value), 1)} m`;
      setRangeFill(W);
      setRangeFill(A);
      const r = compute();
      state = r;
      tweenTotal(r.total);
      $('#calcModel').textContent = `${r.t.label} · ${r.variant.spec}`;
      $('#calcGrid').textContent = `${r.cols} × ${r.rows} = ${r.perAgua}`;
      $('#calcRidge').textContent = r.aguas === 1 ? 'não se aplica' : r.t.ridge ? `≈ ${r.ridge} peças` : 'consulte';
      $('#calcArea').textContent = `${fmt(r.area, 1)} m²`;
      $('#calcEff').textContent = `${Math.round(r.eff)}%`;
      $('.calc-disclaimer').textContent = `Estimativa de referência, com largura útil de ${fmt(r.t.useful)} m por telha e recobrimento longitudinal de ${Math.round(r.t.ov * 100)} cm. Inclinação, vãos, acessórios e fixações são confirmados pela nossa equipe.`;
      let msg = `Olá, Centernit! Fiz uma simulação no site:\n\n• Telha: ${r.variant.name}\n• Telhado: ${fmt(r.w, 1)} m de largura × ${fmt(r.a, 1)} m de água, ${r.aguas} água${r.aguas > 1 ? 's' : ''} (${fmt(r.area, 1)} m²)\n• Estimativa: ${r.total} telhas`;
      if (r.aguas === 2 && r.t.ridge) msg += ` + ${r.ridge} cumeeiras`;
      msg += '\n\nPodem conferir e me passar um orçamento?';
      $('#calcWa').href = waLink(msg);
      draw(r, animate);
    };

    fillLengths();
    W.addEventListener('input', () => update(false));
    A.addEventListener('input', () => update(false));
    typeWrap.addEventListener('change', () => { fillLengths(); update(true); });
    $('#calcAguas').addEventListener('change', () => update(true));
    lenSel.addEventListener('change', () => update(true));
    $('#calcAdd').addEventListener('click', () => {
      if (!state) return;
      addToList(state.variant.sku, state.total);
    });

    update(false);
    let shown = false;
    new IntersectionObserver(([e], io) => {
      if (e.isIntersecting && !shown) { shown = true; update(true); io.disconnect(); }
    }, { threshold: 0.3 }).observe(svg);
  }

  /* ---------- Carrossel de banners ---------- */
  function initCarousel() {
    const root = $('#carousel');
    const viewport = $('.carousel-viewport', root);
    const track = $('#carTrack');
    const bar = $('#carBar');
    const N = BANNERS.length;
    track.innerHTML = BANNERS.map((src, i) => `<div class="slide${i === 0 ? ' is-active' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${N}"><img src="${src}" alt="Banner promocional Centernit ${i + 1} de ${N}" loading="${i < 2 ? 'eager' : 'lazy'}" draggable="false" width="1400" height="362"></div>`).join('');
    $('#carTot').textContent = String(N).padStart(2, '0');
    const slides = [...track.children];
    let index = 0, elapsed = 0, last = 0, paused = false, visible = false, hover = false;
    const DURATION = 5200;

    const offsetFor = (i) => slides[i].offsetLeft - slides[0].offsetLeft;
    const go = (i) => {
      index = (i + N) % N;
      track.style.transform = `translate3d(${-offsetFor(index)}px,0,0)`;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === index));
      $('#carCur').textContent = String(index + 1).padStart(2, '0');
      elapsed = 0;
      // pré-carrega a próxima
      const nx = slides[(index + 1) % N].querySelector('img');
      if (nx.loading === 'lazy') nx.loading = 'eager';
    };
    $('#carPrev').addEventListener('click', () => go(index - 1));
    $('#carNext').addEventListener('click', () => go(index + 1));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    });
    root.addEventListener('pointerenter', () => { hover = true; });
    root.addEventListener('pointerleave', () => { hover = false; });
    addEventListener('resize', () => go(index));

    // arrastar
    let startX = 0, dx = 0, dragging = false, base = 0;
    viewport.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true; startX = e.clientX; dx = 0; base = -offsetFor(index);
      viewport.setPointerCapture(e.pointerId);
      viewport.classList.add('is-dragging');
    });
    viewport.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dx = e.clientX - startX;
      track.style.transform = `translate3d(${base + dx}px,0,0)`;
    });
    const end = () => {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('is-dragging');
      if (dx < -60) go(index + 1); else if (dx > 60) go(index - 1); else go(index);
    };
    viewport.addEventListener('pointerup', end);
    viewport.addEventListener('pointercancel', end);

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(root);
    document.addEventListener('visibilitychange', () => { paused = document.hidden; });

    const tick = (t) => {
      const dt = last ? t - last : 0;
      last = t;
      if (visible && !paused && !hover && !dragging && !reduceMotion) {
        elapsed += dt;
        if (elapsed >= DURATION) go(index + 1);
      }
      bar.style.transform = `scaleX(${Math.min(1, elapsed / DURATION)})`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Mapa de entrega ---------- */
  function initRoute() {
    const svg = $('#routeSvg');
    if (!svg) return;
    const NS = 'http://www.w3.org/2000/svg';
    const CITIES = [
      { n: 'Peruíbe', x: 70, y: 262, lab: 'down' },
      { n: 'Itanhaém', x: 200, y: 250, lab: 'up' },
      { n: 'Mongaguá', x: 318, y: 238, lab: 'down' },
      { n: 'Praia Grande', x: 432, y: 226, lab: 'up' },
      { n: 'São Vicente', x: 520, y: 214, lab: 'down', store: true },
      { n: 'Santos', x: 616, y: 206, lab: 'down' },
      { n: 'Guarujá', x: 722, y: 196, lab: 'up' },
      { n: 'Bertioga', x: 912, y: 166, lab: 'down' },
    ];
    const CUBATAO = { n: 'Cubatão', x: 590, y: 140, lab: 'up' };

    const smooth = (pts) => {
      let d = `M${pts[0][0]},${pts[0][1]}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
        d += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]},${p2[1]}`;
      }
      return d;
    };
    const routePts = CITIES.map((c) => [c.x, c.y]);
    const coastPts = [[-10, 300], ...CITIES.map((c) => [c.x, c.y + 40]), [1010, 196]];
    $('#routeSea').setAttribute('d', `${smooth(coastPts)} L1010,390 L-10,390 Z`);
    const road = $('#routeRoad');
    const done = $('#routeDone');
    road.setAttribute('d', smooth(routePts));
    done.setAttribute('d', smooth(routePts));
    const sv = CITIES.find((c) => c.store);
    const spur = $('#routeSpur');
    spur.setAttribute('d', `M${sv.x},${sv.y} Q${sv.x + 40},${sv.y - 20} ${CUBATAO.x},${CUBATAO.y}`);

    const len = road.getTotalLength();
    done.style.strokeDasharray = `${len}`;
    done.style.strokeDashoffset = `${len}`;

    // posição de cada cidade ao longo da rota
    const samples = [];
    for (let i = 0; i <= 300; i++) { const l = (len * i) / 300; const p = road.getPointAtLength(l); samples.push([l, p.x, p.y]); }
    const lenAt = (c) => samples.reduce((b, s) => { const d = (s[1] - c.x) ** 2 + (s[2] - c.y) ** 2; return d < b.d ? { d, l: s[0] } : b; }, { d: Infinity, l: 0 }).l;

    const g = $('#routeCities');
    const chips = $('#cityChips');
    const all = [...CITIES, CUBATAO];
    all.forEach((c) => {
      c.len = c === CUBATAO ? lenAt(sv) + 1 : lenAt(c);
      const el = document.createElementNS(NS, 'g');
      el.setAttribute('class', 'route-city');
      const ty = c.lab === 'up' ? c.y - 18 : c.y + 32;
      el.innerHTML = `<circle class="halo" cx="${c.x}" cy="${c.y}" r="6"/><circle class="dot" cx="${c.x}" cy="${c.y}" r="${c.store ? 9 : 7}"/><text x="${c.x}" y="${ty}">${c.n}</text>`;
      g.appendChild(el);
      c.el = el;
      const li = document.createElement('li');
      li.textContent = c.n;
      if (c.store) li.classList.add('is-store');
      c.chip = li;
    });
    // chips em ordem geográfica (Bertioga → Peruíbe)
    [...CITIES].reverse().forEach((c) => { chips.appendChild(c.chip); if (c === sv) chips.appendChild(CUBATAO.chip); });

    // loja
    const store = document.createElementNS(NS, 'g');
    store.setAttribute('class', 'route-store');
    store.innerHTML = `<circle class="pulse" cx="${sv.x}" cy="${sv.y}" r="10"/>
      <path class="pin" d="M${sv.x - 30} ${sv.y - 50} h60 a12 12 0 0 1 12 12 v2 a12 12 0 0 1 -12 12 h-22 l-8 9 l-8 -9 h-22 a12 12 0 0 1 -12 -12 v-2 a12 12 0 0 1 12 -12z"/>
      <text x="${sv.x}" y="${sv.y - 32}">Loja</text>`;
    g.appendChild(store);

    const truck = $('#routeTruck');
    const wrap = $('.route-wrap');
    const scroller = $('.route-scroll');
    const update = () => {
      const r = wrap.getBoundingClientRect();
      const startY = innerHeight * 0.95, endY = innerHeight * 0.2;
      const p = reduceMotion ? 1 : clamp((startY - r.top) / (startY - endY), 0, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const l = eased * len;
      const pt = road.getPointAtLength(l);
      const pt2 = road.getPointAtLength(Math.min(len, l + 1));
      const ang = (Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180) / Math.PI;
      truck.setAttribute('transform', `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
      // no celular o mapa rola na horizontal: acompanha o caminhão
      if (scroller.scrollWidth > scroller.clientWidth + 4) {
        scroller.scrollLeft = (pt.x / 1000) * scroller.scrollWidth - scroller.clientWidth / 2;
      }
      done.style.strokeDashoffset = `${len - l}`;
      all.forEach((c) => {
        const on = l >= c.len - 2;
        if (on !== c.on) {
          c.on = on;
          c.el.classList.toggle('is-on', on);
          c.chip.classList.toggle('is-on', on);
        }
      });
      spur.classList.toggle('is-on', l >= sv.len);
    };
    let ticking = false;
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); } }, { passive: true });
    addEventListener('resize', update);
    update();
  }

  /* ---------- Formulário de contato ---------- */
  function initContact() {
    const form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const cidade = form.cidade.value.trim();
      const mensagem = form.mensagem.value.trim();
      let ok = true;
      [[form.nome, nome], [form.mensagem, mensagem]].forEach(([el, val]) => {
        el.closest('.input').classList.toggle('is-invalid', !val);
        if (!val) ok = false;
      });
      if (!ok) { (nome ? form.mensagem : form.nome).focus(); return; }
      const msg = `Olá, Centernit! Meu nome é ${nome}${cidade ? `, de ${cidade}` : ''}.\n\n${mensagem}`;
      window.open(waLink(msg), '_blank', 'noopener');
    });
    form.addEventListener('input', (e) => { const w = e.target.closest('.input'); if (w && e.target.value.trim()) w.classList.remove('is-invalid'); });
  }

  /* ---------- Balão do WhatsApp ---------- */
  function initWaBubble() {
    const b = $('#waBubble');
    let dismissed = false;
    try { dismissed = sessionStorage.getItem('centernit:bubble') === '1'; } catch (e) { /* ok */ }
    if (dismissed) return;
    const hide = () => { b.classList.remove('is-visible'); try { sessionStorage.setItem('centernit:bubble', '1'); } catch (e) { /* ok */ } };
    $('.wa-bubble-close', b).addEventListener('click', hide);
    $('a', b).addEventListener('click', hide);
    setTimeout(() => { if (!document.body.classList.contains('no-scroll')) b.classList.add('is-visible'); }, 9000);
    setTimeout(() => b.classList.remove('is-visible'), 24000);
  }

  /* ---------- Init ---------- */
  initWaLinks();
  initPreloader();
  initHeader();
  initReveal();
  initRotator();
  initCounters();
  initMagnetic();
  initTilt();
  initRain();
  initMarquees();
  initCatalog();
  initList();
  initSearch();
  initCalc();
  initCarousel();
  initRoute();
  initContact();
  initWaBubble();
  const y = $('#year');
  if (y) y.textContent = new Date().getFullYear();
})();
