import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, School, Edit } from "lucide-react";

export function Profile() {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg">JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">John Smith</h3>
                  <p className="text-muted-foreground">IB Diploma Student</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Edit size={14} className="mr-2" />
                    Change Photo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.smith@school.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input id="school" defaultValue="International School of Excellence" />
                </div>
              </div>

              <Button className="w-full md:w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School size={20} />
                  Academic Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">Graduation Year</span>
                  </div>
                  <p className="text-lg">2025</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span className="text-sm font-medium">IB Subjects</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Physics HL</Badge>
                    <Badge>Chemistry HL</Badge>
                    <Badge>Math AA HL</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall IA Progress</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }} />
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>• 3 subjects completed</p>
                  <p>• 2 drafts pending review</p>
                  <p>• Next deadline: Dec 15</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}