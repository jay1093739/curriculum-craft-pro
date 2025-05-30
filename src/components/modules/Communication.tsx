
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Bell, 
  Users,
  Video,
  Phone,
  Plus,
  Search,
  Pin,
  Archive
} from 'lucide-react';

interface CommunicationProps {
  user: {
    role: string;
    name: string;
  };
}

export const Communication = ({ user }: CommunicationProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);

  const discussions = [
    {
      id: 1,
      title: 'React Hooks Best Practices',
      course: 'Advanced React Development',
      participants: 23,
      lastMessage: 'Great question about useEffect dependencies!',
      lastActivity: '2 hours ago',
      unread: 3,
      pinned: true
    },
    {
      id: 2,
      title: 'Project Management Assignment Help',
      course: 'Project Management Fundamentals',
      participants: 15,
      lastMessage: 'I can help you with the Gantt chart section.',
      lastActivity: '5 hours ago',
      unread: 0,
      pinned: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      role: 'instructor',
      message: 'Welcome to the React Hooks discussion! Feel free to ask any questions.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'Mike Wilson',
      role: 'student',
      message: 'I\'m having trouble understanding when to use useCallback vs useMemo.',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: 3,
      sender: user.name,
      role: user.role,
      message: 'useCallback is for memoizing functions, while useMemo is for memoizing values.',
      timestamp: '10:40 AM',
      isOwn: true
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New Course Module Released',
      content: 'The Advanced React Patterns module is now available.',
      course: 'Advanced React Development',
      timestamp: '1 day ago',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Maintenance Window Scheduled',
      content: 'System maintenance scheduled for this weekend.',
      course: 'System',
      timestamp: '2 days ago',
      priority: 'medium'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication Tools</h1>
          <p className="text-gray-600 mt-1">Connect with instructors and fellow learners</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Discussion
        </Button>
      </div>

      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="messages">Direct Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="meetings">Virtual Meetings</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Discussion List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Course Discussions</CardTitle>
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {discussions.map((discussion) => (
                    <div
                      key={discussion.id}
                      onClick={() => setSelectedChat(discussion.id)}
                      className={`p-4 cursor-pointer border-b hover:bg-gray-50 ${
                        selectedChat === discussion.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          {discussion.pinned && <Pin className="h-3 w-3 text-blue-600" />}
                          {discussion.title}
                        </h4>
                        {discussion.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {discussion.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{discussion.course}</p>
                      <p className="text-xs text-gray-500 truncate">{discussion.lastMessage}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <span>{discussion.participants} participants</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">React Hooks Best Practices</CardTitle>
                    <CardDescription>Advanced React Development • 23 participants</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col h-[400px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[70%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${
                          message.isOwn 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">
                              {message.sender}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {message.role}
                            </Badge>
                          </div>
                          <p className="text-sm">{message.message}</p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="resize-none"
                      rows={2}
                    />
                    <Button onClick={handleSendMessage} className="self-end">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Direct Messages</CardTitle>
              <CardDescription>Private conversations with instructors and peers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No direct messages yet. Start a conversation with an instructor or classmate.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-6">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{announcement.title}</h3>
                        <Badge 
                          variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                        >
                          {announcement.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{announcement.course}</span>
                        <span>{announcement.timestamp}</span>
                      </div>
                    </div>
                    <Bell className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">React Review Session</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Weekly review and Q&A session
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Tomorrow, 2:00 PM</span>
                      <Button size="sm">
                        <Video className="h-3 w-3 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Video className="h-4 w-4 mr-2" />
                    Start Instant Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Join Meeting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
