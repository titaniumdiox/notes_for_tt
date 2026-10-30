(function (root) {
  const META = {
    voice: { speaker: 'Bella' },
    style: 'warm-story',
    title: '阿姨 / AUNTIE',
    name: 'auntie-test',
    lang: 'en',
    gap: 0.3,
  };
  const PAGES = [
    {
      id: 'p01',
      section: '称呼',
      title: '阿姨 / AUNTIE',
      after: 0.4,
      cues: [
        "Three everyday moments in China that aren't about being polite.",
        'Names first.',
        "In the US, using your friend's mom's first name sounds friendly.",
        'In many Chinese families, the name you choose maps the relationship.',
      ],
    },
  ];
  root.SCRIPT = { META, PAGES };
})(typeof window !== 'undefined' ? window : globalThis);
