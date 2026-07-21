# Tampermonkey Universal AI Prompt Commands CS

Česká verze Tampermonkey skriptu pro rychlejší práci s chaty umělé inteligence.

Skript nahrazuje univerzální spouštěče `Q1–Q10` připravenými AI prompty. Tyto spouštěče nejsou vázané na jazyk: uživatel může `Q1`, `Q2` a další nahradit vlastními slovy, příkazy nebo frázemi.

## K čemu slouží

Slouží k rychlému vkládání promptů do ChatGPT, Gemini, Claude, Copilot a dalších AI chatů. Místo opakovaného psaní dlouhého zadání stačí napsat `Q1` a skript vloží celý prompt.

## Jak funguje

Skript sleduje aktivní textové pole. Pokud celý obsah pole přesně odpovídá jednomu ze spouštěčů `Q1–Q10`, nahradí se připraveným promptem.

```text
Q1
```

se nahradí promptem pro překlad do češtiny.

```text
Q8
```

se nahradí promptem pro vytažení důležitých faktů.

Běžný text se nemění. Například `Q1 další text` nahrazen nebude.

## Vlastní spouštěče

Spouštěče lze změnit v kódu v objektu `COMMANDS`.

```javascript
'Q1': `...`
```

může být například:

```javascript
'PRELOZ': `...`
```

`Q1–Q10` jsou pouze výchozí univerzální spouštěče.

## Kde používat

- ChatGPT
- Google Gemini
- Claude
- Microsoft Copilot
- jiné weby s textovým polem

Skript obsahuje:

```javascript
// @match        *://*/*
```

## Požadavek před instalací

V prohlížeči musí být nejdříve nainstalováno rozšíření **Tampermonkey**. Skript se instaluje do Tampermonkey, ne do GitHubu ani do konkrétního webu. GitHub slouží pouze k uložení souboru `.user.js`.

## Rychlá instalace

1. Nainstalujte Tampermonkey.
2. Otevřete Raw odkaz:

```text
https://raw.githubusercontent.com/1777maxim7771/cs_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Potvrďte instalaci v Tampermonkey.
4. Otevřete AI chat a napište `Q1`.

## Instalace přes GitHub

Otevřete soubor `tampermonkey-universal-ai-prompt-commands.user.js`, klikněte na **Raw** a potvrďte instalaci v Tampermonkey.

## Import přes URL

V Tampermonkey otevřete **Dashboard → Utilities → Import from URL**, vložte Raw odkaz a potvrďte.

## Ruční instalace

Vytvořte nový skript v Tampermonkey, vložte kód ze souboru `.user.js` a uložte.

## Proč Tampermonkey skript rozpozná

Tampermonkey rozpozná hlavičku `// ==UserScript==` a příponu `.user.js`.

## Výchozí příkazy

- `Q1` — překlad do češtiny.
- `Q2` — shrnutí textu.
- `Q3` — shrnutí dopisu v jednom řádku.
- `Q4` — překlad do jednoduché němčiny A2-B1.
- `Q5` — oprava českého textu.
- `Q6` — krátká oficiální odpověď.
- `Q7` — jednoduché vysvětlení textu.
- `Q8` — vytažení důležitých faktů.
- `Q9` — seznam potřebných kroků.
- `Q10` — oficiální dopis v němčině.

## Kontrola

Napište `Q1` v AI chatu. Pokud skript funguje, `Q1` se nahradí celým promptem.

## Možné problémy

Zkontrolujte, zda je skript zapnutý, stránka byla obnovena, `Q1` je zadáno bez dalšího textu, Tampermonkey má na webu povolení a kurzor je v editovatelném poli.

## Cíl projektu

Zrychlit opakovanou práci s AI chaty: překlad, shrnutí, analýzu dopisů, oficiální odpovědi a zpracování dokumentů.
