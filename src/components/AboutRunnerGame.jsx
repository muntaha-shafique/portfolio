import React, { useEffect, useRef, useState } from 'react';

const ABOUT_FACTS = [
  'I’m Muntaha Shafique, an Agentic AI engineer and full-stack developer.',
  'I’m based in Pakistan and work with clients around the world.',
  'I build digital products from the first screen through to the backend.',
  'I create AI agents and automations for practical, everyday work.',
  'I turn complex ideas into clear and useful digital experiences.',
  'I enjoy working directly with clients to shape their ideas.',
  'I bring thoughtful design and careful engineering together.',
  'I focus on making websites easy to use on every screen.',
  'I like solving the problem before choosing the technology.',
  'I build with room for a product to grow over time.',
  'I work across AI systems, workflows, and full-stack web.',
  'I value clear communication throughout a project.',
  'I collaborate with local and international businesses.',
  'I care about the small details that make a product feel right.',
  'I help turn a promising idea into something people can use.',
];

const MATCH_PAIRS = [
  { pair: 'ai', mark: '✦', label: 'AGENTIC AI', tone: 'blue' },
  { pair: 'web', mark: '⌘', label: 'FULL STACK', tone: 'ink' },
  { pair: 'design', mark: '◉', label: 'EXPERIENCE', tone: 'clay' },
  { pair: 'global', mark: '↗', label: 'WORLDWIDE', tone: 'sand' },
  { pair: 'workflow', mark: '⌁', label: 'AUTOMATION', tone: 'sage' },
  { pair: 'product', mark: '▣', label: 'DIGITAL PRODUCT', tone: 'blue' },
  { pair: 'creative', mark: '✳', label: 'CREATIVE THINKING', tone: 'clay' },
  { pair: 'care', mark: '＋', label: 'BUILT WITH CARE', tone: 'sage' },
];

function shuffleCards() {
  const cards = MATCH_PAIRS.flatMap((item) => [
    { ...item, id: `${item.pair}-a` },
    { ...item, id: `${item.pair}-b` },
  ]);
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function AboutRunnerGame() {
  const [deck, setDeck] = useState(shuffleCards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [factCount, setFactCount] = useState(0);
  const [currentFact, setCurrentFact] = useState('');
  const lockRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const chooseCard = (index) => {
    if (lockRef.current || matched.includes(index) || flipped.includes(index)) return;
    if (flipped.length === 0) {
      setFlipped([index]);
      return;
    }

    const firstIndex = flipped[0];
    const isMatch = deck[firstIndex].pair === deck[index].pair;
    setMoves((count) => count + 1);
    setFlipped([firstIndex, index]);
    lockRef.current = true;

    if (isMatch) {
      setMatched((cards) => [...cards, firstIndex, index]);
      setCurrentFact(ABOUT_FACTS[factCount % ABOUT_FACTS.length]);
      setFactCount((count) => count + 1);
      timeoutRef.current = window.setTimeout(() => {
        setFlipped([]);
        lockRef.current = false;
      }, 420);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        setFlipped([]);
        lockRef.current = false;
      }, 850);
    }
  };

  const restartRound = () => {
    window.clearTimeout(timeoutRef.current);
    lockRef.current = false;
    setDeck(shuffleCards());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setCurrentFact('');
  };

  const matchedPairs = matched.length / 2;
  const gameComplete = matchedPairs === MATCH_PAIRS.length;
  return <section className="about-runner-section about-memory-section" aria-labelledby="aboutRunnerTitle">
    <div className="about-runner-heading about-memory-heading">
      <div><p>A LITTLE ABOUT ME · A QUICK MEMORY GAME</p><h2 id="aboutRunnerTitle">Match my <em>work.</em></h2></div>
      <p className="about-runner-description">Find the matching pairs. Each match reveals one more line about what I do and how I work.</p>
    </div>
    <div className="about-memory-layout">
      <div className="about-memory-board-wrap">
        <div className="about-memory-hud">
          <span><i className={matchedPairs > 0 ? 'is-live' : ''} />{gameComplete ? 'ALL PAIRS FOUND' : 'FIND THE MATCHES'}</span>
          <span>PAIRS <b>{matchedPairs}/{MATCH_PAIRS.length}</b><span className="about-memory-moves">MOVES <b>{moves}</b></span></span>
        </div>
        <div className="about-memory-board" role="group" aria-label="Memory matching game cards">
          {deck.map((card, index) => {
            const isMatched = matched.includes(index);
            const isFlipped = flipped.includes(index) || isMatched;
            return <button type="button" key={card.id} className={`about-memory-card tone-${card.tone}${isFlipped ? ' is-flipped' : ''}${isMatched ? ' is-matched' : ''}`} onClick={() => chooseCard(index)} disabled={isMatched} aria-label={isFlipped ? `${card.label}${isMatched ? ', matched' : ''}` : `Face-down card ${index + 1}`} aria-pressed={isFlipped}>
              <span className="about-memory-card-inner">
                <span className="about-memory-card-back" aria-hidden="true"><img src="assets/images/ms-monogram-logo.png" alt="" /><small>FLIP TO FIND</small></span>
                <span className="about-memory-card-front"><b>{card.mark}</b><small>{card.label}</small></span>
              </span>
            </button>;
          })}
        </div>
        <div className="about-memory-board-footer"><span>CHOOSE TWO CARDS TO FIND A PAIR</span><button type="button" onClick={restartRound}>{gameComplete ? 'Play again' : 'Shuffle cards'} <span aria-hidden="true">↻</span></button></div>
      </div>
      <aside className={`about-memory-fact${currentFact ? ' has-fact' : ''}`} aria-live="polite">
        <span className="about-memory-fact-kicker">{gameComplete ? 'YOU KNOW MY STORY' : 'A LINE ABOUT MUNTAHA'}</span>
        <div className="about-memory-fact-mark" aria-hidden="true">{currentFact ? '✦' : 'MS'}</div>
        <p>{currentFact || 'Every matching pair uncovers another detail about my work, experience, and approach.'}</p>
        <div className="about-memory-fact-progress"><span style={{ width: `${Math.min(100, (factCount / MATCH_PAIRS.length) * 100)}%` }} /></div>
        <small>{factCount} {factCount === 1 ? 'line' : 'lines'} revealed</small>
      </aside>
    </div>
  </section>;
}
