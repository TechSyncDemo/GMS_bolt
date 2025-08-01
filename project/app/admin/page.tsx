'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Calendar, 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter
} from 'lucide-react';

// Mock data for admin dashboard
const mockStats = [
  { label: 'Total Events', value: '1,247', change: '+12%', icon: Calendar, color: 'text-blue-600' },
  { label: 'Active Users', value: '45,892', change: '+8%', icon: Users, color: 'text-green-600' },
  { label: 'Revenue', value: '₹12,45,890', change: '+15%', icon: CreditCard, color: 'text-purple-600' },
  { label: 'Pending Approvals', value: '23', change: '+5', icon: AlertTriangle, color: 'text-orange-600' }
];

const mockPendingEvents = [
  {
    id: 1,
    name: "Electronic Music Festival",
    organizer: "Mumbai Events Co.",
    date: "2025-03-15",
    location: "Mumbai",
    status: "pending",
    submittedAt: "2025-01-15T10:30:00Z",
    pricing: [
      { tier: "Early Bird", price: 1299 },
      { tier: "General", price: 1599 },
      { tier: "VIP", price: 2999 }
    ]
  },
  {
    id: 2,
    name: "Stand-up Comedy Night",
    organizer: "Laugh Factory",
    date: "2025-02-28",
    location: "Bangalore",
    status: "pending",
    submittedAt: "2025-01-14T15:45:00Z",
    pricing: [
      { tier: "Standard", price: 599 },
      { tier: "Premium", price: 899 }
    ]
  },
  {
    id: 3,
    name: "Rock Concert Live",
    organizer: "Rock Nation",
    date: "2025-04-10",
    location: "Delhi",
    status: "pending",
    submittedAt: "2025-01-13T09:15:00Z",
    pricing: [
      { tier: "General", price: 1199 },
      { tier: "VIP", price: 2499 }
    ]
  }
];

const mockRecentActions = [
  { action: "Event Approved", event: "Neon Nights Festival", time: "2 hours ago", type: "approval" },
  { action: "Event Rejected", event: "Unauthorized Concert", time: "4 hours ago", type: "rejection" },
  { action: "Refund Processed", event: "Comedy Show", time: "6 hours ago", type: "refund" },
  { action: "User Suspended", event: "Policy Violation", time: "1 day ago", type: "suspension" }
];

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleApproveEvent = (eventId: number) => {
    // In real app, make API call
    alert(`Event ${eventId} approved successfully!`);
  };

  const handleRejectEvent = (eventId: number) => {
    // In real app, make API call
    const reason = prompt("Please provide a reason for rejection:");
    if (reason) {
      alert(`Event ${eventId} rejected. Reason: ${reason}`);
    }
  };

  const filteredEvents = mockPendingEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Super Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-600">
                System Healthy
              </Badge>
              <Button variant="outline">
                Admin Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Event Approvals</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Event Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">Pending Event Approvals</CardTitle>
                    <CardDescription>
                      Review and approve events submitted by organizers
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-500">
                    {mockPendingEvents.length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search events or organizers..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                              <Badge variant="outline" className="text-orange-600 border-orange-500">
                                Pending Review
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <span className="font-medium">Organizer:</span> {event.organizer}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span> {event.location}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {event.pricing.map((tier, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tier.tier}: ₹{tier.price.toLocaleString()}
                                </Badge>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500">
                              Submitted: {new Date(event.submittedAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveEvent(event.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectEvent(event.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Successful Payments</p>
                        <p className="text-2xl font-bold text-green-600">₹8,45,230</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-800">Pending Refunds</p>
                        <p className="text-2xl font-bold text-orange-600">₹45,890</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Neon Festival Booking</p>
                        <p className="text-xs text-gray-600">2 hours ago</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+₹2,999</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Comedy Show Refund</p>
                        <p className="text-xs text-gray-600">4 hours ago</p>
                      </div>
                      <Badge variant="destructive">-₹899</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Rock Concert Booking</p>
                        <p className="text-xs text-gray-600">6 hours ago</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">+₹1,599</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage users, organizers, and enforce platform policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-blue-800">45,892</h3>
                    <p className="text-blue-600">Total Users</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-purple-800">1,247</h3>
                    <p className="text-purple-600">Organizers</p>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-red-800">23</h3>
                    <p className="text-red-600">Suspended</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>
                  Key metrics and insights about platform performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Categories</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Music Concerts</span>
                        <span className="font-bold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comedy Shows</span>
                        <span className="font-bold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Festivals</span>
                        <span className="font-bold">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Others</span>
                        <span className="font-bold">10%</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Cities</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Mumbai</span>
                        <span className="font-bold">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bangalore</span>
                        <span className="font-bold">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delhi</span>
                        <span className="font-bold">22%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Others</span>
                        <span className="font-bold">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentActions.map((action, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      action.type === 'approval' ? 'bg-green-500' :
                      action.type === 'rejection' ? 'bg-red-500' :
                      action.type === 'refund' ? 'bg-blue-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{action.action}</p>
                      <p className="text-xs text-gray-600">{action.event}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{action.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}