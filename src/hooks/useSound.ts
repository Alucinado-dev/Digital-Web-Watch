import { Howl, Howler } from 'howler'
import { useCallback, useEffect, useRef } from 'react'

type UseSoundOptions = {
  src: string[] // ex: ['sounds/alerts.mp3', 'sounds/alerts.ogg']

  volume?: number // 0 a 1, padrão 0.7
  enabled?: boolean // se false, playAlert vira no-op
}

export const useSound = ({ src, volume = 0.7, enabled = true }: UseSoundOptions) => {
  // useRef porque não queremos re-render ao trocar o Howl
  const howlRef = useRef<Howl | null>(null)

  // Instancia o Howl uma única vez na montagem
  useEffect(() => {
    howlRef.current = new Howl({
      src,

      volume,
    })

    // Cleanup: quando o hook desmontar, para tudo e libera memória
    return () => {
      howlRef.current?.unload()
    }
    // Intencionalmente sem deps — o Howl é criado só uma vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sincroniza volume no Howl quando a prop mudar
  // sem precisar recriar o objeto inteiro
  useEffect(() => {
    howlRef.current?.volume(volume)
  }, [volume])

  // Sincroniza mute global quando enabled mudar
  // Howler (maiúsculo) controla TODOS os Howls do app de uma vez
  useEffect(() => {
    Howler.mute(!enabled)
  }, [enabled])

  // Função principal — chame no onComplete do useClock
  const playAlert = useCallback(() => {
    if (!enabled) return

    howlRef.current?.play()
  }, [enabled])

  // Controle de volume imperativo — útil pro slider em tempo real
  const setVolume = useCallback((v: number) => {
    // Clamp entre 0 e 1 para evitar valores inválidos
    const clamped = Math.min(1, Math.max(0, v))
    howlRef.current?.volume(clamped)
    // Também atualiza o volume global do Howler como fallback
    Howler.volume(clamped)
  }, [])

  const mute = useCallback(() => Howler.mute(true), [])
  const unmute = useCallback(() => Howler.mute(false), [])

  return { playAlert, setVolume, mute, unmute }
}
