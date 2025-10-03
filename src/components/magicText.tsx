// MagicText.tsx
import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export interface MagicTextProps {
  text: string;
  indentClass?: string; // optional, e.g. "ml-12" or "ml-[3rem]"
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
  isFirst?: boolean;
  indentClass?: string;
}

/** Single animated word: fade + subtle slide-right.
 * If isFirst is true, we apply the provided indentClass (visual only)
 */
const Word: React.FC<WordProps> = ({ children, progress, range, isFirst, indentClass }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const x = useTransform(progress, range, [-12, 0]); // slide-right: start 12px left -> 0

  // Use provided indentClass when this is the first word
  const appliedIndent = isFirst && indentClass ? indentClass : "";

  return (
    <span className={`relative inline-block ${appliedIndent}`}>
      <span className="absolute left-0 top-0 opacity-20 pointer-events-none select-none">
        {children}
      </span>
      <motion.span style={{ opacity, x }} className="relative inline-block">
        {children}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text, indentClass = "ml-40 md:ml-70 xl:ml-98" }) => {
  const container = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.35", "start 0.15"],
  });

  const words = text.trim().split(/\s+/);

  return (
    <p
      ref={container}
      className="leading-snug gap-x-2 flex flex-wrap text-4xl md:text-5xl xl:text-5xl "
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const isFirst = i === 0;

        return (
          <React.Fragment key={i}>
            <Word
              progress={scrollYProgress}
              range={[start, end]}
              isFirst={isFirst}
              indentClass={indentClass}
            >
              {word}
            </Word>
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default MagicText;
