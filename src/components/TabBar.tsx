import { NavLink } from 'react-router-dom'
import { IconHome, IconLibrary, IconHistory, IconProfile } from './icons'

const tabs = [
  { to: '/home', label: 'Home', Icon: IconHome },
  { to: '/biblioteca', label: 'Biblioteca', Icon: IconLibrary },
  { to: '/historico', label: 'Histórico', Icon: IconHistory },
  { to: '/perfil', label: 'Perfil', Icon: IconProfile },
]

export function TabBar() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-md justify-around">
        {tabs.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-3 text-[11px] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-voltage' : 'text-steel hover:text-bone'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={isActive ? 'text-voltage' : 'text-steel'} />
                  <span className="uppercase">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
