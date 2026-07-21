// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands CS
// @namespace    local.tampermonkey.universal.ai.prompt.commands.cs
// @version      1.0.0
// @description  Nahrazuje krátké příkazy CS1-CS10 připravenými AI prompty v AI chatech.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Česká verze. Nahrazuje se pouze přesný příkaz úplným promptem.
    const COMMANDS = {
        'CS1': `Přelož poskytnutý text do češtiny úplně a přesně. Zachovej význam, pořadí informací, jména, data, částky, čísla dokumentů, organizace a důležité formulace. Nepřidávej vlastní závěry a nezkracuj obsah.`,
        'CS2': `Shrň poskytnutý text česky podle významu a kontextu. Vysvětli, o co jde, kdo komu píše, jaké je hlavní téma a jaké žádosti, rozhodnutí, data, lhůty, částky nebo důležité detaily jsou uvedeny.`,
        'CS3': `Vytvoř česky velmi krátké tematické shrnutí tohoto dopisu, přísně v jednom řádku. Uveď odesílatele, téma, co je sděleno nebo požadováno a jaká data, lhůty, částky, dokumenty nebo kroky jsou důležité.`,
        'CS4': `Přelož poskytnutý text do jednoduché a srozumitelné němčiny na úrovni A2-B1. Formuluj text zdvořile, úředně a gramaticky správně. Zachovej význam, jména, data, částky, adresy, organizace a důležité detaily.`,
        'CS5': `Oprav poskytnutý český text. Udělej ho gramaticky správný, jasný, logický a přirozený, ale zachovej původní význam. Odstraň chyby, opakování a nevhodné formulace. Nepřidávej fakta, která v původním textu nejsou.`,
        'CS6': `Napiš krátkou, zdvořilou a oficiální odpověď na tento dopis v češtině. Reaguj věcně a konkrétně, bez zbytečných vět. Pokud je potřeba, potvrď přijetí, požádej o upřesnění, uveď dokumenty nebo sděl požadované informace.`,
        'CS7': `Vysvětli česky jednoduchými slovy, co tento text znamená. Analyzuj kontext, kdo píše, komu, k jakému tématu, co se požaduje, co je třeba udělat a jaká data, lhůty, částky, dokumenty nebo podmínky jsou důležité.`,
        'CS8': `Vyber z textu všechna důležitá fakta a strukturovaně je uveď česky. Zvlášť uveď osoby, organizace, adresy, data, lhůty, částky, čísla dokumentů, požadavky, rozhodnutí, povinnosti, zmíněné dokumenty a další kroky. Nevymýšlej žádné informace.`,
        'CS9': `Vytvoř česky jasný seznam potřebných kroků podle tohoto textu. Uveď, co je třeba udělat, jaké dokumenty připravit, komu odpovědět, kam se obrátit, jaké lhůty dodržet a na co si dát pozor. Seřaď kroky podle priority.`,
        'CS10': `Na základě poskytnutého textu napiš zdvořilý oficiální dopis v jednoduché němčině na úrovni A2-B1. Zachovej jména, data, částky, adresy, organizace, čísla dokumentů a okolnosti. Dopis strukturovaně rozděl na oslovení, krátké vysvětlení, hlavní žádost a závěr. Ukonči: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];
    function isEditableElement(element) { if (!element || !element.matches) return false; if (element.disabled || element.readOnly) return false; const tagName = element.tagName ? element.tagName.toLowerCase() : ''; const inputType = (element.getAttribute('type') || '').toLowerCase(); if (tagName === 'input' && !['text', 'search'].includes(inputType)) return false; return EDITABLE_SELECTORS.some(selector => element.matches(selector)); }
    function findEditableElement(target) { if (!target) return null; if (isEditableElement(target)) return target; if (target.closest) { const element = target.closest(EDITABLE_SELECTORS.join(',')); if (isEditableElement(element)) return element; } return null; }
    function getText(element) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; return tagName === 'textarea' || tagName === 'input' ? element.value || '' : element.innerText || element.textContent || ''; }
    function normalizeCommand(text) { return String(text || '').trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element, text) { try { element.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertReplacementText', data: text })); } catch (error) { element.dispatchEvent(new Event('input', { bubbles: true })); } element.dispatchEvent(new Event('change', { bubbles: true })); }
    function setCursorToEnd(element) { element.focus(); if ('selectionStart' in element) { const length = element.value.length; element.setSelectionRange(length, length); return; } const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
    function replaceText(element, newText) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; element.focus(); if (tagName === 'textarea' || tagName === 'input') { element.value = newText; } else { try { const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText', false, newText); } catch (error) { element.textContent = newText; } } setCursorToEnd(element); dispatchInputEvents(element, newText); }
    function showNotification(message) { const oldBox = document.getElementById('tm-ai-prompt-commands-notification'); if (oldBox) oldBox.remove(); const box = document.createElement('div'); box.id = 'tm-ai-prompt-commands-notification'; box.textContent = message; box.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:420px;line-height:1.4'; document.body.appendChild(box); setTimeout(() => box.remove(), 2200); }
    function checkAndReplace(target) { const editable = findEditableElement(target); if (!editable) return; const command = normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return; replaceText(editable, COMMANDS[command]); showNotification(`Příkaz ${command} byl nahrazen připraveným AI promptem`); }
    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();