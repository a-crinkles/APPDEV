import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const Header = ({ sidebarCollapsed }: HeaderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, logout } = useAuth();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
  };
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <header className={`h-16 fixed top-0 right-0 z-30 bg-background border-b border-border transition-all duration-300 ${sidebarCollapsed ? 'left-20' : 'left-64'}`}>
      <div className="h-full flex items-center justify-between px-6">
        <div className="relative w-96 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 bg-muted border-none h-9"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
          >
            <Bell size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme} 
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          
          <div className="h-8 w-px bg-border mx-1"></div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center ml-4 cursor-pointer">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg" 
                  alt="User" 
                  className="h-9 w-9 rounded-full border-2 border-primary/20" 
                />
                <div className="ml-3 hidden md:block">
                  <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'admin@example.com'}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="font-medium">{user?.name || 'Admin User'}</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
