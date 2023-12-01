import figures from 'figures';
import signaleLogger from 'signale-logger';

const { Signale } = signaleLogger;

export const logger = new Signale({
  config: { displayLabel: false, displayTimestamp: true, underlineMessage: false },
  disabled: false,
  interactive: false,
  scope: 'validate-workflows',
  stream: [process.stdout],
  types: {
    debug: { badge: figures.info, color: 'magenta', label: '', stream: [process.stdout] },
    success: { badge: figures.tick, color: 'green', label: '', stream: [process.stdout] },
    error: { badge: figures.cross, color: 'red', label: '', stream: [process.stderr] },
  },
});
