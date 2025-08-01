'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Upload, Plus, Trash2, Star, BarChart3, Users, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
  tier: string;
  price: string;
  description: string;
}

export default function OrganizerDashboard() {
  const [eventForm, setEventForm] = useState({
    name: '',
    artist: '',
    date: '',
    time: '',
    location: '',
    address: '',
    mapsLink: '',
    description: '',
    whatsapp: '',
    cancellationPolicy: '',
    refundPolicy: '',
    ageLimit: '',
    dressCode: ''
  });

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    { tier: '', price: '', description: '' }
  ]);

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const addPricingTier = () => {
    if (pricingTiers.length < 5) {
      setPricingTiers([...pricingTiers, { tier: '', price: '', description: '' }]);
    }
  };

  const removePricingTier = (index: number) => {
    if (pricingTiers.length > 1) {
      setPricingTiers(pricingTiers.filter((_, i) => i !== index));
    }
  };

  const updatePricingTier = (index: number, field: keyof PricingTier, value: string) => {
    const updated = pricingTiers.map((tier, i) => 
      i === index ? { ...tier, [field]: value } : tier
    );
    setPricingTiers(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In real app, upload to cloud storage
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages].slice(0, 5));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app, submit to API
    alert('Event submitted for approval! You will receive a confirmation email shortly.');
  };

  // Mock stats for dashboard
  const stats = [
    { label: 'Total Events', value: '12', icon: Calendar, color: 'text-blue-600' },
    { label: 'Active Events', value: '3', icon: Star, color: 'text-green-600' },
    { label: 'Total Bookings', value: '1,247', icon: Users, color: 'text-purple-600' },
    { label: 'Revenue', value: '₹2,45,890', icon: CreditCard, color: 'text-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Organizer Dashboard
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Back to Site
              </Link>
              <Button variant="outline">
                Profile
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Event Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Create New Event
                </CardTitle>
                <CardDescription>
                  Fill in the details below to create your event. All events require admin approval before going live.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Event Name *</Label>
                        <Input
                          id="name"
                          value={eventForm.name}
                          onChange={(e) => setEventForm({...eventForm, name: e.target.value})}
                          placeholder="e.g., Neon Nights Festival"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="artist">Artist/Performer *</Label>
                        <Input
                          id="artist"
                          value={eventForm.artist}
                          onChange={(e) => setEventForm({...eventForm, artist: e.target.value})}
                          placeholder="e.g., DJ Nucleya & Divine"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Event Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Event Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={eventForm.time}
                          onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Event Description *</Label>
                      <Textarea
                        id="description"
                        value={eventForm.description}
                        onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                        placeholder="Describe your event, what makes it special, what attendees can expect..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Location Details</h3>
                    
                    <div>
                      <Label htmlFor="location">Venue Name *</Label>
                      <Input
                        id="location"
                        value={eventForm.location}
                        onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                        placeholder="e.g., Phoenix Marketcity, Mumbai"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Full Address *</Label>
                      <Textarea
                        id="address"
                        value={eventForm.address}
                        onChange={(e) => setEventForm({...eventForm, address: e.target.value})}
                        placeholder="Complete address with pincode"
                        rows={2}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="mapsLink">Google Maps Link (Optional)</Label>
                      <Input
                        id="mapsLink"
                        value={eventForm.mapsLink}
                        onChange={(e) => setEventForm({...eventForm, mapsLink: e.target.value})}
                        placeholder="https://maps.app.goo.gl/..."
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing Tiers */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Pricing Tiers</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPricingTier}
                        disabled={pricingTiers.length >= 5}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Tier
                      </Button>
                    </div>

                    {pricingTiers.map((tier, index) => (
                      <Card key={index} className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Tier Name *</Label>
                            <Input
                              value={tier.tier}
                              onChange={(e) => updatePricingTier(index, 'tier', e.target.value)}
                              placeholder="e.g., Early Bird, VIP"
                              required
                            />
                          </div>
                          <div>
                            <Label>Price (₹) *</Label>
                            <Input
                              type="number"
                              value={tier.price}
                              onChange={(e) => updatePricingTier(index, 'price', e.target.value)}
                              placeholder="1299"
                              required
                            />
                          </div>
                          <div className="flex items-end">
                            {pricingTiers.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removePricingTier(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <Label>Description</Label>
                          <Input
                            value={tier.description}
                            onChange={(e) => updatePricingTier(index, 'description', e.target.value)}
                            placeholder="What's included in this tier?"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  {/* Event Images */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Event Images</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload event images (Max 5 images, 5MB each)</p>
                      <p className="text-sm text-gray-500 mb-4">Supported formats: JPG, PNG</p>
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                      >
                        Choose Images
                      </Button>
                    </div>
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Contact & Policies */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Contact & Policies</h3>
                    
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Support Number *</Label>
                      <Input
                        id="whatsapp"
                        value={eventForm.whatsapp}
                        onChange={(e) => setEventForm({...eventForm, whatsapp: e.target.value})}
                        placeholder="+918446522752"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cancellationPolicy">Cancellation Policy *</Label>
                        <Textarea
                          id="cancellationPolicy"
                          value={eventForm.cancellationPolicy}
                          onChange={(e) => setEventForm({...eventForm, cancellationPolicy: e.target.value})}
                          placeholder="Describe your cancellation policy..."
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="refundPolicy">Refund Policy *</Label>
                        <Textarea
                          id="refundPolicy"
                          value={eventForm.refundPolicy}
                          onChange={(e) => setEventForm({...eventForm, refundPolicy: e.target.value})}
                          placeholder="Describe your refund policy..."
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ageLimit">Age Limit</Label>
                        <Input
                          id="ageLimit"
                          value={eventForm.ageLimit}
                          onChange={(e) => setEventForm({...eventForm, ageLimit: e.target.value})}
                          placeholder="e.g., 18+ event"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dressCode">Dress Code</Label>
                        <Input
                          id="dressCode"
                          value={eventForm.dressCode}
                          onChange={(e) => setEventForm({...eventForm, dressCode: e.target.value})}
                          placeholder="e.g., Smart casual"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Submit for Approval
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Bookings
                </Button>
                <Button className="w-full" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment History
                </Button>
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Summer Music Fest</div>
                    <div className="text-xs text-gray-600">245 bookings</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Live</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Comedy Night</div>
                    <div className="text-xs text-gray-600">89 bookings</div>
                  </div>
                  <Badge variant="secondary">Ended</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Rock Concert</div>
                    <div className="text-xs text-gray-600">Pending approval</div>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Get support for your events and account management.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}