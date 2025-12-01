'use client';

// FIX 1: Change 'motion/react' to the correct standard import path: 'framer-motion/dist/cjs/motion'
import { AnimatePresence, motion } from 'framer-motion'; 
import { type ReceivedChatMessage } from '@livekit/components-react';
import { ShimmerText } from '@/components/livekit/shimmer-text';
import { cn } from '@/lib/utils';

// FIX 2: Create a generic motion component using 'p'
const MotionMessage = motion.p; // Changed from motion.create('p') to motion.p (standard Framer Motion usage)

const VIEW_MOTION_PROPS = {
  variants: {
    visible: {
      opacity: 1,
      // Simplified transition object to resolve type errors
      transition: { 
        duration: 0.5,
        delay: 0.8,
        // Removed 'ease: easeIn' or similar string if it conflicts with types
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0,
      },
    },
  },
  initial: 'hidden',
  animate: 'visible',
  exit: 'hidden',
};

interface PreConnectMessageProps {
  messages?: ReceivedChatMessage[];
  className?: string;
}

export function PreConnectMessage({ className, messages = [] }: PreConnectMessageProps) {
  return (
    // FIX 3: Removed redundant conditional check around AnimatePresence
    <AnimatePresence>
      {messages.length === 0 && (
        <MotionMessage
          {...VIEW_MOTION_PROPS}
          // The component's implicit type is now motion.p, which is correct JSX
          aria-hidden={messages.length > 0} 
          className={cn('pointer-events-none text-center', className)}
        >
          <ShimmerText className="text-sm font-semibold">
            Host is listening, show your talent
          </ShimmerText>
        </MotionMessage>
      )}
    </AnimatePresence>
  );
}
