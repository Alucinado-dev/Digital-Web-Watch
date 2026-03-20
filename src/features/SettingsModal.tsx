import { useEffect, useState } from 'react'
import { X, Settings } from 'lucide-react'
import Glass from '../components/ui/Glass'
import useSettingsStore, { DEFAULTS, minToMs } from '../stores/settingsStore'
import usePomodoroStore from '../stores/pomodoroStore'
import useTimerStore from '../stores/timerStore'
import { useTranslation } from 'react-i18next'


// --- Sub-componente: campo de minutos ---
type MinuteFieldProps = {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}

const MinuteField = ({ label, value, onChange, min = 1, max = 180 }: MinuteFieldProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    <label
      style={{
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        fontWeight: 500,
      }}
      className='silkscreen-regular'
    >
      {label}
    </label>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type='number'
        value={value}
        min={min}
        max={max}
        onChange={e => {
          const parsed = parseInt(e.target.value)
          if (!isNaN(parsed) && parsed >= min && parsed <= max) onChange(parsed)
        }}
        className='audiowide-regular'
        style={{
          width: '72px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px',
          padding: '8px 10px',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '15px',
          fontWeight: 600,
          textAlign: 'center',
          outline: 'none',
        }}
      />
      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>min</span>
    </div>
  </div>
)

// --- Divisor de seção ---
const SectionLabel = ({ children }: { children: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '16px',
    }}
  >
    <span
      style={{
        fontSize: '10px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
        fontWeight: 600,
      }}
      className='quantico-regular'
    >
      {children}
    </span>
    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.07)' }} />
  </div>
)

// --- Modal principal ---
const SettingsModal = () => {

    const {t} = useTranslation() 
     
  const { isOpen, pomodoro, timer, actions } = useSettingsStore(s => s)
  const pomodoroActions = usePomodoroStore(s => s.actions)
  const timerActions = useTimerStore(s => s.actions)

  // Estado local do form 
  const [pomForm, setPomForm] = useState(pomodoro)
  const [timerForm, setTimerForm] = useState(timer)

  // Sincroniza form quando o modal abre 
  useEffect(() => {
    if (isOpen) {
      setPomForm(pomodoro)
      setTimerForm(timer)
    }
  }, [isOpen, pomodoro, timer])

  // Fecha com Esc
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') actions.closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, actions])

  const handleSave = () => {
    // 1. Persiste na settingsStore 
    actions.saveSettings(pomForm, timerForm)

    // 2. Aplica imediatamente nas stores funcionais
    pomodoroActions.setDurations({
      workTime: minToMs(pomForm.workTime),
      shortBreak: minToMs(pomForm.shortBreak),
      longBreak: minToMs(pomForm.longBreak),
    })
    timerActions.setDuration(minToMs(timerForm.duration))
  }

  const handleReset = () => {
    setPomForm(DEFAULTS.pomodoro)
    setTimerForm(DEFAULTS.timer)
  }

  if (!isOpen) return null

  return (
    // Overlay
    <div
      onClick={e => {
        if (e.target === e.currentTarget) actions.closeModal()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(2px)',
        animation: 'overlayIn 0.2s ease',
        padding: '16px',
      }}
    >
      <Glass
        variant='heavy'
        tint='neutral'
        rounded='20px'
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '28px 28px 24px',
          animation: 'modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'rgba(255,255,255,0.9)',
            }}
            className='audiowide-regular'
          >
            {t('settings.title')}
          </span>
          <button
            onClick={actions.closeModal}
            aria-label={t('settings.close')}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '6px',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Seção Pomodoro */}
        <div style={{ marginBottom: '28px' }}>
          <SectionLabel>{t('settings.pomodoro')}</SectionLabel>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <MinuteField
              label={t('settings.workTime')}
              value={pomForm.workTime}
              onChange={v => setPomForm(p => ({ ...p, workTime: v }))}
            />
            <MinuteField
              label={t('settings.shortBreak')}
              value={pomForm.shortBreak}
              onChange={v => setPomForm(p => ({ ...p, shortBreak: v }))}
            />
            <MinuteField
              label={t('settings.longBreak')}
              value={pomForm.longBreak}
              onChange={v => setPomForm(p => ({ ...p, longBreak: v }))}
            />
          </div>
        </div>

        {/* Seção Timer */}
        <div style={{ marginBottom: '32px' }}>
          <SectionLabel>{t('settings.timer')}</SectionLabel>
          <MinuteField
            label={t('settings.duration')}
            value={timerForm.duration}
            onChange={v => setTimerForm({ duration: v })}
          />
        </div>

        {/* Ações */}
        <div
          style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}
          className='audiowide-regular'
        >
          <button
            onClick={handleReset}
            className='btn btn-ghost btn-sm'
            style={{ fontSize: '12px', opacity: 0.6 }}
          >
            {t('settings.reset')}
          </button>
          <button onClick={handleSave} className='btn btn-primary btn-sm'>
            {t('settings.save')}
          </button>
        </div>
      </Glass>

      <style>{`
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}

// --- Botão que vai na navbar ---
 const SettingsBtn = () => {
  const openModal = useSettingsStore(s => s.actions.openModal)
    const {t} = useTranslation()
  return (
    <button
      onClick={openModal}
      className='btn btn-ghost btn-sm'
      aria-label={t('settings.ariaLabel')}
      title={t('settings.title')}
    >
      <Settings size={18} />
    </button>
  )
}

export { SettingsModal, SettingsBtn }
