export function SessionExpiredNotice({ reason }: { reason?: string }) {
  if (reason !== 'expired') return null

  return (
    <p
      role="alert"
      className="rounded-sm border border-yellow-500/30 bg-yellow-500/10 p-3 text-center text-sm text-yellow-300"
    >
      Aapka session expire ho gaya hai. Dobara login karo.
    </p>
  )
}
