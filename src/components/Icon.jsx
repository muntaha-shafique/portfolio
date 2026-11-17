const paths = {
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  mail: <><rect x="3.25" y="5.25" width="17.5" height="13.5" rx="3" /><path d="m4.5 7 7.5 6 7.5-6" /></>,
  phone: <path d="M7.2 3.8h2.3l1.4 4.1-1.8 1.7a15.3 15.3 0 0 0 5.3 5.3l1.7-1.8 4.1 1.4v2.3a2 2 0 0 1-2.2 2C10.3 18.2 5.8 13.7 5.2 6a2 2 0 0 1 2-2.2Z" />,
  message: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-3.5 2v-5A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8 11h.01M12 11h.01M16 11h.01" /></>,
  plan: <><path d="M7 4.75h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2Z" /><path d="M9 4.75v-1h6v1M8.5 10h7M8.5 14h4.5M8.5 17h3" /></>,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12.3 2.5 2.5 5.5-5.6" /></>,
  sparkles: <><path d="m12 3 1.65 5.35L19 10l-5.35 1.65L12 17l-1.65-5.35L5 10l5.35-1.65L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /><path d="m5 3 .6 1.7L7.3 5.3l-1.7.6L5 7.6l-.6-1.7-1.7-.6 1.7-.6L5 3Z" /></>,
  send: <><path d="m21 3-7.2 18-3.8-7-7-3.8L21 3Z" /><path d="M10 14 21 3" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  return (
    <svg
      className={('ui-icon ' + className).trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] || paths.sparkles}
    </svg>
  );
}
