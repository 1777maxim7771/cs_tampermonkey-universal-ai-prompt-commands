# Tampermonkey Universal AI Prompt Commands CS

**Tampermonkey Universal AI Prompt Commands CS** je userscript pro rozšíření **Tampermonkey**. Pomáhá rychleji pracovat s AI chaty jako ChatGPT, Gemini, Claude, Copilot a dalšími weby s textovým polem.

Skript nahrazuje krátké příkazy jako `CS1`, `CS3` nebo `CS10` dlouhými předem připravenými AI prompty.

---

## K čemu slouží

Slouží k rychlému vkládání promptů pro překlad, shrnutí, analýzu dopisů, extrakci faktů, oficiální odpovědi a přípravu textů.

---

## Jak funguje

Pokud pole obsahuje přesný známý příkaz, například:

```text
CS1
```

nahradí se úplným promptem. Běžný text se nemění.

---

## Příklady

- `CS1` — přesný překlad do češtiny.
- `CS3` — shrnutí dopisu v jednom řádku.
- `CS8` — extrakce dat, částek, osob, organizací a dokumentů.
- `CS10` — oficiální dopis v jednoduché němčině A2-B1.

---

## Kde použít

ChatGPT, Google Gemini, Claude, Microsoft Copilot a další weby s textovým polem.

```javascript
// @match        *://*/*
```

Skript funguje na různých webech, ale nahrazuje pouze přesné příkazy.

---

## Před instalací

Nejprve nainstalujte rozšíření **Tampermonkey**. Umožňuje instalovat a spouštět soubory `.user.js`.

---

## Rychlá instalace přes Raw

1. Nainstalujte Tampermonkey.
2. Otevřete tento Raw odkaz:

```text
https://raw.githubusercontent.com/1777maxim7771/cs_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Potvrďte instalaci v Tampermonkey.
4. Otestujte `CS1` v AI chatu.

---

## Instalace z GitHubu

Otevřete `tampermonkey-universal-ai-prompt-commands.user.js`, klikněte na **Raw** a potvrďte v Tampermonkey.

---

## Import přes URL

Tampermonkey → Dashboard → Utilities → Import from URL → vložte Raw odkaz.

---

## Ruční instalace

Tampermonkey → Create a new script → smažte šablonu → vložte obsah `.user.js` → uložte pomocí **Ctrl + S**.

---

## Proč Tampermonkey skript rozpozná

Díky hlavičce `// ==UserScript==` a příponě `.user.js`. Skript se instaluje do **Tampermonkey**, ne do GitHubu ani na konkrétní web.

---

## Příkazy

- `CS1` — překlad do češtiny.
- `CS2` — shrnutí česky.
- `CS3` — shrnutí dopisu v jednom řádku.
- `CS4` — překlad do němčiny A2-B1.
- `CS5` — oprava českého textu.
- `CS6` — krátká oficiální odpověď.
- `CS7` — jednoduché vysvětlení.
- `CS8` — extrakce důležitých faktů.
- `CS9` — seznam nutných kroků.
- `CS10` — oficiální dopis v němčině.

---

## Kontrola

Napište `CS1`. Pokud se nahradí úplným promptem, skript funguje.

---

## Možné problémy

Zkontrolujte, že Tampermonkey a skript jsou zapnuté, stránka je obnovena a příkaz je napsán samostatně.

---

## Soubor skriptu

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Cíl projektu

Zrychlit opakovanou práci s AI chaty pomocí krátkých příkazů, které vkládají úplné prompty.