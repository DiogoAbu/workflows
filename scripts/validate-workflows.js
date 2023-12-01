import fs from 'fs';
import path from 'path';

import { validateWorkflow } from '@action-validator/core';

import { logger } from './logger.js';

const rootDir = path.join('.github', 'workflows');

const init = () => {
  const items = fs.readdirSync(rootDir);
  const validated = items.map((item) => {
    if (!item.endsWith('.yml')) {
      return true;
    }

    const filePath = path.join(rootDir, item);
    const isValid = validate(filePath);
    return isValid;
  });

  if (validated.some((e) => e === false)) {
    logger.error('Some workflows are invalid, check the output above!');
    process.exitCode = 2;
  } else {
    logger.success('All workflows are valid!');
  }
};

// Validate Workflow
const validate = (filepath) => {
  const workflowSource = fs.readFileSync(filepath, 'utf8');
  const state = validateWorkflow(workflowSource);

  const isValid = state.errors.length === 0;
  if (isValid) {
    logger.success('Valid workflow: %s', filepath);
  } else {
    logger.error('Invalid workflow: %s', filepath, JSON.stringify(state.errors, null, 2));
  }

  return isValid;
};

init();
