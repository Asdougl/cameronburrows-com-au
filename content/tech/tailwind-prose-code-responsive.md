---
title: 'Fix prose pre responsiveness in tailwind'
date: '2022-11-26T07:35:06.000Z'
tags:
  - react
  - tailwind
  - blog
summary: 'How I fixed tailwind css prose <pre> width when inserting code snippets'
packages:
  - react@18
  - tailwindcss@3.2
---

Ok this is how I fixed it...

```
a small code block breaks the width if it goes wider than the view
```

By adding the prose class: `prose-pre:whitespace-pre-wrap` we can stop this from happening,

For example, in the code for this blog I use:

```tsx
return (
  <ReactMarkdown
    className="prose prose-invert prose-pre:whitespace-pre-wrap lg:prose-xl mx-auto max-w-prose text-justify"
    components={MarkdownComponents}
    remarkPlugins={[remarkGfm]}
  >
    {children}
  </ReactMarkdown>
)
```

This means the mobile code-reading experience is somewhat sub-par, but at least this way all the content is on the screen. It's also safe to say that a code-reading experience on mobile is never going to be as good as on desktop, which is where users are probably far more likely to read and copy the code snippets.

And yes, I do justify all the blog posts. I find it far more readable.
