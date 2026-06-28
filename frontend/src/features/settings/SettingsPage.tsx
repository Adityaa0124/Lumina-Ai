import { motion } from 'framer-motion'
import { ArrowLeft, User, Shield, Bell, Palette, ChevronRight, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils'

const sections = [
  {
    id: 'profile',
    title: 'Account',
    icon: User,
    items: [
      { label: 'Display name', value: 'Your Account', action: 'Edit' },
      { label: 'Email', value: 'Linked on sign up', action: null },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: Palette,
    items: [
      { label: 'Theme', value: 'Dark', action: 'Change' },
      { label: 'Font size', value: 'Default', action: 'Change' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    items: [
      { label: 'Email updates', value: 'Off', action: 'Toggle' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    items: [
      { label: 'Password', value: '••••••••', action: 'Change' },
      { label: 'Active sessions', value: '1 session', action: 'Manage' },
    ],
  },
]

export default function SettingsPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans selection:bg-[#222222] selection:text-[#FFFFFF]">
      {/* ─── Ambient Top Glow (Linear Style) ─── */}
      <div className="pointer-events-none fixed inset-0 flex justify-center overflow-hidden">
        <div className="w-[800px] h-[300px] bg-white opacity-[0.03] blur-[100px] -translate-y-1/2 rounded-[100%]" />
      </div>

      <div className="relative z-10 max-w-[640px] mx-auto px-6 py-12 lg:py-20">
        
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <Link
            to="/chat"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#8A8F98] hover:text-[#EDEDED] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to app
          </Link>
          
          <h1 className="text-[28px] font-semibold tracking-tight text-[#FFFFFF] mb-2">
            Settings
          </h1>
          <p className="text-[14px] text-[#8A8F98]">
            Manage your account and preferences.
          </p>
        </motion.div>

        {/* ─── Profile Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 p-1 rounded-xl bg-gradient-to-b from-[#222222] to-[#111111] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-4 bg-[#0A0A0A] p-4 rounded-[10px] border border-[#27272A]/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#333333] to-[#1A1A1A] border border-[#333333] flex items-center justify-center text-[#FFFFFF] font-medium text-lg shadow-inner">
              {user?.userId?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-medium text-[15px] text-[#FFFFFF]">My Account</p>
              <p className="text-[13px] text-[#8A8F98]">Pro Plan · Active</p>
            </div>
          </div>
        </motion.div>

        {/* ─── Settings Sections ─── */}
        <div className="flex flex-col gap-6">
          {sections.map((section, si) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + si * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <section.icon className="w-4 h-4 text-[#8A8F98]" />
                <h2 className="text-[13px] font-medium text-[#EDEDED]">
                  {section.title}
                </h2>
              </div>

              {/* Items Container */}
              <div className="bg-[#0A0A0A] rounded-xl border border-[#27272A]/80 shadow-sm overflow-hidden relative">
                {/* Subtle top inner highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none" />
                
                {section.items.map((item, ii) => (
                  <div
                    key={item.label}
                    className={cn(
                      'flex items-center justify-between p-4 group transition-colors duration-200',
                      item.action && 'hover:bg-[#111111] cursor-pointer',
                      ii < section.items.length - 1 && 'border-b border-[#27272A]/50'
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-[14px] text-[#EDEDED] font-medium leading-none">{item.label}</p>
                      <p className="text-[13px] text-[#8A8F98] leading-none">{item.value}</p>
                    </div>
                    {item.action && (
                      <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[13px] text-[#8A8F98] hover:text-[#FFFFFF] transition-all duration-200"
                      >
                        {item.action}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Danger Zone ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 pt-10 border-t border-[#27272A]/50"
        >
          <div className="bg-[#0A0A0A] rounded-xl border border-[#ef4444]/20 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ef4444]/10 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-col gap-1">
                <p className="text-[14px] text-[#EDEDED] font-medium leading-none">Sign out</p>
                <p className="text-[13px] text-[#8A8F98] leading-none">Log out of your current session.</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-[6px] border border-[#ef4444]/20 bg-[#ef4444]/10 hover:bg-[#ef4444] text-[#ef4444] hover:text-[#FFFFFF] text-[13px] font-medium transition-all duration-200 shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
