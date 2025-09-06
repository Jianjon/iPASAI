import type { LearningContent } from '../types';
import { L11_CONTENT } from './content/L11';
import { L12_CONTENT } from './content/L12';
import { L21_CONTENT } from './content/L21';
import { L22_CONTENT } from './content/L22';
import { L23_CONTENT } from './content/L23';
import { L31_CONTENT } from './content/L31';
import { L32_CONTENT } from './content/L32';
import { L33_CONTENT } from './content/L33';
import { L34_CONTENT } from './content/L34';

export const PREGENERATED_CONTENT: Record<string, LearningContent> = {
  ...L11_CONTENT,
  ...L12_CONTENT,
  ...L21_CONTENT,
  ...L22_CONTENT,
  ...L23_CONTENT,
  ...L31_CONTENT,
  ...L32_CONTENT,
  ...L33_CONTENT,
  ...L34_CONTENT,
};