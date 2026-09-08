import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useKalibreStore } from './store/useKalibreStore'
import { Splash } from './screens/Splash'
import { Onboarding } from './screens/Onboarding'
import { Assessment } from './screens/Assessment'
import { RaioXScreen } from './screens/RaioXScreen'
import { AdjustmentPick } from './screens/AdjustmentPick'
import { Home } from './screens/Home'
import { CheckIn } from './screens/CheckIn'
import { ReviewScreen } from './screens/ReviewScreen'
import { Library } from './screens/Library'
import { History } from './screens/History'
import { Paywall } from './screens/Paywall'
import { Profile } from './screens/Profile'
import { AppLayout } from './app/AppLayout'

function Gate({ children }: { children: React.ReactNode }) {
  const hydrated = useKalibreStore((s) => s.hydrated)
  if (!hydrated) return null
  return <>{children}</>
}

export function App() {
  const hydrate = useKalibreStore((s) => s.hydrate)
  const onboardingDone = useKalibreStore((s) => s.onboardingDone)
  const [booted, setBooted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return (
    <>
      <div className="calibration-frame" />
      <div className="grain" />
      <Gate>
        {!booted ? (
          <Splash onDone={() => setBooted(true)} />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Navigate to={onboardingDone ? '/home' : '/onboarding'} replace />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/autoavaliacao" element={<Assessment />} />
              <Route path="/raio-x" element={<RaioXScreen />} />
              <Route path="/ajuste" element={<AdjustmentPick />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/reavaliacao/:cycleId" element={<ReviewScreen />} />
              <Route path="/paywall" element={<Paywall />} />

              <Route element={<AppLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/biblioteca" element={<Library />} />
                <Route path="/historico" element={<History />} />
                <Route path="/perfil" element={<Profile />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        )}
      </Gate>
    </>
  )
}
