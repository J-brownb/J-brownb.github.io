import { motion } from 'motion/react'

export const ease = [0.2, 0.7, 0.1, 1]

export default function Reveal({ as = 'div', delay = 0, y = 32, children, ...props }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...props}
    >
      {children}
    </Tag>
  )
}
