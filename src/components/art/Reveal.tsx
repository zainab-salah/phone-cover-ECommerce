'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className}
    initial={{ opacity: 1, y: 0 }}
    whileInView={reducedMotion ? {} : { y: [24, 0], opacity: [0.6, 1] }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
    {children}
  </motion.div>
}
