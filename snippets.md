# Random snippets

## Cooler way of doing the regex matching

```javascript
Patcher.after(meta.name, parser, 'parse', (_, __, message: ReactNode[]) => {
  const parsed = [];

  for (const element of message) {
    if (typeof element === "string") {
      let chunks: ReactNode[] = [element];

      for (const pattern of patterns) {
        const nextChunks: ReactNode[] = [];

        for (const chunk of chunks) {
          if (typeof chunk !== "string") {
            nextChunks.push(chunk);
            continue;
          }

          let lastMatchEnd = 0;
          let match = pattern.exec(element);

          if (match) {
            do {
              if (lastMatchEnd < match.index) {
                nextChunks.push(element.substring(lastMatchEnd, match.index));
              }
              nextChunks.push(<Copyable showOutline={settings.showOutline}>{match[0]}</Copyable>);
              lastMatchEnd = match.index + match[0].length;
            } while (pattern.global && (match = pattern.exec(element)));
          }

          if (lastMatchEnd < element.length) {
            nextChunks.push(element.substring(lastMatchEnd));
          }
        }

        chunks = nextChunks;
      }

      parsed.push(...chunks);
    } else {
      parsed.push(element);
    }
  }

  return parsed;
});
```
