import type { PracticeQuestion } from '../types';
import { L11_PRACTICE } from './practiceQuestions/L11';
import { L12_PRACTICE } from './practiceQuestions/L12';
import { L21_PRACTICE } from './practiceQuestions/L21';
import { L22_PRACTICE } from './practiceQuestions/L22';
import { L23_PRACTICE } from './practiceQuestions/L23';
import { L31_PRACTICE } from './practiceQuestions/L31';
import { L32_PRACTICE } from './practiceQuestions/L32';
import { L33_PRACTICE } from './practiceQuestions/L33';
import { L34_PRACTICE } from './practiceQuestions/L34';

export const PREGENERATED_PRACTICE: Record<string, PracticeQuestion[]> = {
  ...L11_PRACTICE,
  ...L12_PRACTICE,
  ...L21_PRACTICE,
  ...L22_PRACTICE,
  ...L23_PRACTICE,
  ...L31_PRACTICE,
  ...L32_PRACTICE,
  ...L33_PRACTICE,
  ...L34_PRACTICE,
};