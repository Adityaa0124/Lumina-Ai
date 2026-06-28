import { motion } from 'framer-motion'
import { FileCode2, LineChart, Code2, PenTool } from 'lucide-react'

const SUGGESTIONS = [
  {
    icon: Code2,
    label: 'Explain concept',
    prompt: 'Explain the concept of React Server Components and how they differ from Client Components.',
  },
  {
    icon: FileCode2,
    label: 'Code review',
    prompt: 'Review the following code for performance and security vulnerabilities:',
  },
  {
    icon: PenTool,
    label: 'Write tests',
    prompt: 'Write comprehensive unit tests for a utility function that parses deep JSON objects.',
  },
  {
    icon: LineChart,
    label: 'Optimize architecture',
    prompt: 'Suggest a scalable system architecture for a real-time collaborative text editor.',
  },
]

interface PromptSuggestionsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function PromptSuggestions({ onSelect, disabled }: PromptSuggestionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
      {SUGGESTIONS.map((suggestion, i) => (
        <motion.button
          key={suggestion.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          onClick={() => onSelect(suggestion.prompt)}
          disabled={disabled}
          className="flex flex-col items-start gap-2 p-4 rounded-[8px] bg-surface border border-border hover:bg-surface-elevated hover:border-text-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group text-left"
        >
          <div className="flex items-center gap-2">
            <suggestion.icon className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
            <span className="text-[13px] font-medium text-text-primary">
              {suggestion.label}
            </span>
          </div>
          <span className="text-[12px] text-text-secondary line-clamp-2">
            {suggestion.prompt}
          </span>
        </motion.button>
      ))}
    </div>
  )
}
