import { Button } from "@/components/ui/button";
import { Search, User, BookOpen, FileText, Settings, Target, Moon, Sun, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { NotificationsPopover } from "@/components/NotificationsPopover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-primary p-2 rounded-xl flex items-center justify-center">
            <img 
              src="/src/assets/ib-logo.png" 
              alt="IB Logo" 
              className="h-6 w-6 object-contain filter invert"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              IB Master
            </h1>
            <p className="text-xs text-muted-foreground">Internal Assessment Planner</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Button asChild variant="ghost" className="font-medium">
            <Link to="/dashboard">
              <BookOpen size={16} className="mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="font-medium">
            <Link to="/ia">
              <Target size={16} className="mr-2" />
              IA Planning
            </Link>
          </Button>
          <Button asChild variant="ghost" className="font-medium">
            <Link to="/past-papers">
              <FileText size={16} className="mr-2" />
              Past Papers
            </Link>
          </Button>
          <Button variant="ghost" className="font-medium">
            <Search size={16} className="mr-2" />
            Search
          </Button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button (Mobile) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search size={18} />
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-muted transition-colors"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          {/* Notifications */}
          <NotificationsPopover />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border border-border z-50">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};