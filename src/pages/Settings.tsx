import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/ThemeContext";
import { 
  Settings as SettingsIcon, 
  Moon, 
  Bell, 
  Globe, 
  Shield, 
  Download,
  Trash2
} from "lucide-react";

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your IB Master experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon size={20} />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>IA Deadline Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about upcoming deadlines
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Milestone Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when milestones are completed
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Weekly Progress Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Summary of your weekly IA progress
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">English</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Timezone</Label>
                  <p className="text-sm text-muted-foreground">UTC+3 (Dubai)</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">
                    Download your data
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Download size={14} className="mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 size={20} />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}