import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'
import { useState } from 'react'

export function Header() {
  const { user, logout } = useAuth()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Mobile nav trigger */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <Sidebar showLogo onNavClick={() => setSheetOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1" />

      {/* User info + logout */}
      {user && (
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm text-muted-foreground">
            {user.name}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            aria-label="Sign out"
            className="gap-2"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      )}
    </header>
  )
}
