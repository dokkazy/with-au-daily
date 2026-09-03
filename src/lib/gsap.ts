// Central GSAP singleton — every module must import gsap from here so that
// Vite/Rollup resolve exactly one gsap core instance. Registering plugins on
// separate core copies (ESM `gsap` vs UMD `dist/gsap.js`) silently breaks
// plugin-only props like Flip's `target`, so we funnel all imports through one
// module and register every plugin we use in one place.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export { gsap, ScrollTrigger, Flip, useGSAP };
export default gsap;
