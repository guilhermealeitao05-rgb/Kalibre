export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-steel ${className}`}>
      Conteúdo educativo. Não substitui acompanhamento com nutricionista.
    </p>
  )
}
