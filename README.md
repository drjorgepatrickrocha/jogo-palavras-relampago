# ⚡ Palavras-Relâmpago

Um joguinho rápido de desembaralhar palavras contra o tempo, feito em HTML, CSS e JavaScript puros.

## Como jogar

1. Abra `index.html` no navegador.
2. Clique em **Começar**.
3. Digite a palavra correta antes que a barra de tempo acabe.
4. Acertos seguidos aumentam seu **combo** (e valem mais pontos), mas também deixam as rodadas mais curtas.
5. Seu **recorde** fica salvo no navegador (`localStorage`).

## Rodando localmente

Não há build nem dependências — basta abrir o arquivo diretamente:

```bash
open index.html
```

Ou sirva a pasta com qualquer servidor estático, por exemplo:

```bash
python3 -m http.server
```

## Estrutura

- `index.html` — marcação da página e dos elementos do jogo.
- `style.css` — visual e animações.
- `script.js` — lógica do jogo (sorteio de palavras, embaralhamento, pontuação, cronômetro).
