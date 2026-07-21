// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands CS
// @namespace    local.tampermonkey.universal.ai.prompt.commands.cs
// @version      1.1.0
// @description  Česká verze: nahrazuje univerzální spouštěče Q1-Q10 připravenými AI prompty pro rychlé zadávání v AI chatech
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){'use strict';
/* Účel: rychlejší práce s ChatGPT, Gemini, Claude, Copilot a dalšími AI chaty. Q1-Q10 jsou univerzální spouštěče a lze je změnit na vlastní slova nebo fráze. */
const COMMANDS={
'Q1':`Přelož poskytnutý text úplně a přesně do češtiny.
Zachovej význam, pořadí informací, jména, data, částky, čísla dokumentů, názvy organizací a důležité formulace.
Nepřidávej vlastní závěry, text nezkracuj a neměň obsah.`,
'Q2':`Shrň poskytnutý text česky podle významu a kontextu.
Vysvětli, o čem text je, kdo komu píše, jaké je hlavní téma a jaké požadavky, žádosti, rozhodnutí, data, lhůty, částky nebo důležité podrobnosti jsou uvedeny.`,
'Q3':`Vytvoř krátké tematické shrnutí dopisu v češtině přesně v jednom řádku.
Uveď odesílatele, téma, co je sdělováno nebo požadováno a jaká data, lhůty, částky, dokumenty nebo kroky jsou důležité.`,
'Q4':`Přelož poskytnutý text do jednoduché a srozumitelné němčiny na úrovni A2-B1.
Text musí být zdvořilý, úřední a gramaticky správný.
Zachovej původní význam, data, jména, částky, adresy, organizace a důležité detaily.`,
'Q5':`Oprav poskytnutý český text.
Udělej ho gramaticky správný, jasný a logický, ale zachovej původní význam.
Odstraň chyby, opakování, nevhodné formulace a příliš hovorové části.
Nepřidávej fakta, která nejsou v původním textu.`,
'Q6':`Napiš krátkou, zdvořilou a oficiální odpověď na tento dopis v češtině.
Odpověď má být jasná a věcná, bez zbytečných vět.
Pokud je třeba potvrdit přijetí, upřesnit dokumenty, požádat o vysvětlení nebo sdělit informace, formuluj to správně.`,
'Q7':`Vysvětli česky jednoduchými slovy, co tento text znamená.
Analyzuj kontext: kdo píše, v jaké věci, co se požaduje, co je třeba udělat a jaké lhůty, data, částky, dokumenty nebo podmínky jsou důležité.`,
'Q8':`Vytáhni z poskytnutého textu všechna důležitá fakta a strukturovaně je uveď česky.
Uveď zvlášť: osoby, organizace, adresy, data, lhůty, částky, čísla dokumentů, požadavky, rozhodnutí, povinnosti, zmíněné dokumenty a další kroky.
Nevymýšlej informace. Pokud něco chybí, napiš: neuvedeno.`,
'Q9':`Vytvoř česky jasný seznam kroků, které je třeba na základě tohoto textu provést.
Urči, co je třeba udělat, jaké dokumenty připravit, komu odpovědět, kam se obrátit, jaké lhůty dodržet a na co dát pozor.
Rozděl kroky podle priority: naléhavé, důležité, možné později.`,
'Q10':`Vytvoř na základě poskytnutého textu zdvořilý oficiální dopis v němčině.
Dopis má být jednoduchý, srozumitelný a správný, úroveň A2-B1.
Zachovej všechna důležitá fakta: jména, data, částky, adresy, organizace, čísla dokumentů a okolnosti.
Na konci uveď: Mit freundlichen Grüßen`};
const S=['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
function ie(e){if(!e||!e.matches)return false;if(e.disabled||e.readOnly)return false;const t=e.tagName?e.tagName.toLowerCase():'';const y=(e.getAttribute('type')||'').toLowerCase();if(t==='input'&&!['text','search'].includes(y))return false;return S.some(s=>e.matches(s));}
function fe(t){if(!t)return null;if(ie(t))return t;if(t.closest){const e=t.closest(S.join(','));if(ie(e))return e;}return null;}
function gt(e){const t=e.tagName?e.tagName.toLowerCase():'';return(t==='textarea'||t==='input')?(e.value||''):(e.innerText||e.textContent||'');}
function nc(x){return String(x||'').trim().replace(/\s+/g,'').toUpperCase();}
function end(e){e.focus();const t=e.tagName?e.tagName.toLowerCase():'';if(t==='textarea'||t==='input'){const l=e.value.length;e.setSelectionRange(l,l);return;}const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);r.collapse(false);s.removeAllRanges();s.addRange(r);}
function ev(e,text){try{e.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text}));}catch(_){e.dispatchEvent(new Event('input',{bubbles:true}));}e.dispatchEvent(new Event('change',{bubbles:true}));}
function rt(e,text){const t=e.tagName?e.tagName.toLowerCase():'';e.focus();if(t==='textarea'||t==='input'){e.value=text;end(e);ev(e,text);return;}try{const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,text);}catch(_){e.textContent=text;}end(e);ev(e,text);}
function note(m){const o=document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');if(o)o.remove();const b=document.createElement('div');b.id='tampermonkey-universal-ai-prompt-commands-notification';b.textContent=m;b.style.cssText='position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35)';document.body.appendChild(b);setTimeout(()=>b.remove(),2200);}
function cr(t){const e=fe(t);if(!e)return;const c=nc(gt(e));if(!Object.prototype.hasOwnProperty.call(COMMANDS,c))return;rt(e,COMMANDS[c]);note(`Spouštěč ${c} byl nahrazen připraveným AI promptem`);}
document.addEventListener('input',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('keyup',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('paste',e=>setTimeout(()=>cr(e.target),50),true);
})();