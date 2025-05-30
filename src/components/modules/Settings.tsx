
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Download,
  Trash2,
  Save
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SettingsProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export const Settings = ({ user }: SettingsProps) => {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    bio: '',
    timezone: 'UTC-5',
    language: 'English'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    courseUpdates: true,
    assignments: true,
    achievements: true,
    marketing: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    shareProgress: true,
    allowMessages: true,
    showOnlineStatus: true
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-sm text-gray-600 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={profile.timezone}
                    onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    value={profile.language}
                    onChange={(e) => setProfile({...profile, language: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  placeholder="Tell us about yourself..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>

              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Notification Methods</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive text message notifications</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Course Updates</p>
                      <p className="text-sm text-gray-600">New content and announcements</p>
                    </div>
                    <Switch
                      checked={notifications.courseUpdates}
                      onCheckedChange={(checked) => setNotifications({...notifications, courseUpdates: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Assignment Reminders</p>
                      <p className="text-sm text-gray-600">Due dates and deadlines</p>
                    </div>
                    <Switch
                      checked={notifications.assignments}
                      onCheckedChange={(checked) => setNotifications({...notifications, assignments: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Achievements</p>
                      <p className="text-sm text-gray-600">Certificates and milestones</p>
                    </div>
                    <Switch
                      checked={notifications.achievements}
                      onCheckedChange={(checked) => setNotifications({...notifications, achievements: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-gray-600">New courses and promotions</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="w-full md:w-auto">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription>Control your privacy and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-gray-600">Who can see your profile</p>
                  </div>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                  >
                    <option value="public">Public</option>
                    <option value="registered">Registered Users Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Share Progress</p>
                    <p className="text-sm text-gray-600">Allow others to see your course progress</p>
                  </div>
                  <Switch
                    checked={privacy.shareProgress}
                    onCheckedChange={(checked) => setPrivacy({...privacy, shareProgress: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Messages</p>
                    <p className="text-sm text-gray-600">Let other users send you messages</p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) => setPrivacy({...privacy, allowMessages: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Online Status</p>
                    <p className="text-sm text-gray-600">Display when you're online</p>
                  </div>
                  <Switch
                    checked={privacy.showOnlineStatus}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showOnlineStatus: checked})}
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Security Actions</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full md:w-auto">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full md:w-auto">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full md:w-auto">
                    View Login History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how the platform looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Theme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-full h-8 bg-white border rounded mb-2"></div>
                      <p className="text-sm">Light</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                      <p className="text-sm">Dark</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                      <p className="text-sm">Auto</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Display</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Compact Mode</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Animations</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High Contrast</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your account data and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Download all your course data, progress, and certificates
                  </p>
                  <Button variant="outline">Request Data Export</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Account Deactivation
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Temporarily disable your account (can be reactivated)
                  </p>
                  <Button variant="outline">Deactivate Account</Button>
                </div>

                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium mb-2 flex items-center gap-2 text-red-700">
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-600 mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
