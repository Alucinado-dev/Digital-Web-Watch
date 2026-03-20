import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Ordem das rotas — define o eixo espacial da navegação
const ROUTE_ORDER: Record<string, number> = {
  '/': 0,
  '/timer': 1,
  '/stopwatch': 2,
}

/**
 * Retorna a direção da navegação atual.
 * -1 = indo para esquerda (rota de índice maior)
 *  1 = indo para direita  (rota de índice menor)
 *  0 = primeira carga, sem direção
 */
export const useNavigationDirection = () => {
  const location = useLocation()
  const prevPathRef = useRef<string | null>(null)

  const prevIndex = prevPathRef.current !== null ? (ROUTE_ORDER[prevPathRef.current] ?? 0) : null

  const currIndex = ROUTE_ORDER[location.pathname] ?? 0

  // Calcula direção antes de atualizar o ref
  const direction =
    prevIndex === null ? 0
    : currIndex > prevIndex ?
      -1 // avançando: slide para esquerda
    : 1 // voltando: slide para direita

  // Atualiza após calcular — ordem importa
  useEffect(() => {
    prevPathRef.current = location.pathname
  }, [location.pathname])

  return { direction, pathname: location.pathname }
}
