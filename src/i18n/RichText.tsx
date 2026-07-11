// src/i18n/RichText.tsx
//
// Rendu inline minimal pour les chaînes de strings.ts qui portent une mise en
// forme : **gras** → <strong>, `code` → <code>. Permet de garder UNE clé par
// phrase (traduisible librement, l'emphase pouvant se déplacer d'une langue à
// l'autre) plutôt que de fragmenter la phrase en segments fragiles.
import { Fragment, type ReactNode } from "react";

// Capture un segment **gras** OU `code`. Les contenus n'imbriquent pas de marqueur.
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

function parse(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(
        <code key={key++} className="bg-ink/10 px-1 rounded">
          {token.slice(1, -1)}
        </code>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function RichText({ text }: { text: string }) {
  return <Fragment>{parse(text)}</Fragment>;
}
