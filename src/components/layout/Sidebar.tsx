import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Package, Package2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/products', label: 'Products', icon: Package },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
]

interface SidebarProps {
  onNavClick?: () => void
  showLogo?: boolean
}

export function Sidebar({ onNavClick, showLogo = false }: SidebarProps) {
  const { pathname } = useLocation()

  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-1 p-4">
      {showLogo && (
        <div className="flex items-center gap-2 px-3 py-3 mb-2">
          <Package2 className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
          <span className="font-semibold text-lg">Prodexa</span>
        </div>
      )}
      <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Navigation
      </p>
      {navItems.map(({ to, label, icon: Icon }) => {
        const active = pathname.startsWith(to)
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavClick}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
