"use client";

import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Clock, Users, MessageCircle, ArrowLeft, ExternalLink, CreditCard, Star } from 'lucide-react';
import Link from 'next/link';

export default function EventClient({ event }: { event: any }) {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hi! I'm interested in booking tickets for ${event.name}. Can you help me?`);
    window.open(`https://wa.me/${event.whatsapp.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleBookNow = () => {
    if (!selectedTier) {
      alert('Please select a ticket tier first!');
      return;
    }
    alert(`Redirecting to payment for ${selectedTier} ticket...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Events</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleWhatsAppClick}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={event.images[currentImageIndex]}
                  alt={event.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {event.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Live Event
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {event.name}
                </CardTitle>
                <CardDescription className="text-xl text-purple-600 font-medium">
                  {event.artist}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                    <div>
                      <div className="font-medium">
                        {new Date(event.date).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3 text-purple-600" />
                    <div className="font-medium">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-start text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-purple-600 mt-1" />
                  <div>
                    <div className="font-medium">{event.location}</div>
                    <div className="text-sm text-gray-500 mt-1">{event.address}</div>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-purple-600 hover:text-purple-700"
                      onClick={() => window.open(event.mapsLink, '_blank')}
                    >
                      View on Maps <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">About This Event</h3>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>

                <Separator />

                {/* Policies */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Event Policies</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium text-gray-800">Cancellation Policy:</span>
                      <p className="mt-1">{event.policies.cancellation}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Refund Policy:</span>
                      <p className="mt-1">{event.policies.refund}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Age Limit:</span>
                      <p className="mt-1">{event.policies.ageLimit}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Dress Code:</span>
                      <p className="mt-1">{event.policies.dress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Select Your Tickets
                </CardTitle>
                <CardDescription>
                  Choose your preferred ticket tier
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.pricing.map((tier: { tier: number | boolean | SetStateAction<string> | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | PromiseLikeOfReactNode | null | undefined; available: any; price: { toLocaleString: () => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }, index: Key | null | undefined) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTier === tier.tier
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    } ${!tier.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => tier.available && setSelectedTier(tier.tier != null ? String(tier.tier) : '')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="ticket-tier"
                          checked={selectedTier === tier.tier}
                          onChange={() => tier.available && setSelectedTier(tier.tier != null ? String(tier.tier) : '')}
                          disabled={!tier.available}
                          className="text-purple-600"
                        />
                        <span className="font-medium text-gray-800">
                          {typeof tier.tier === 'function' ? '' : tier.tier}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-purple-600">
                          ₹{tier.price.toLocaleString()}
                        </div>
                        {!tier.available && (
                          <Badge variant="destructive" className="text-xs">
                            Sold Out
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-3">
                  <Button
                    onClick={handleBookNow}
                    disabled={!selectedTier}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-lg font-semibold"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleWhatsAppClick}
                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Organizer
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Secure payment powered by Razorpay
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Event Organizer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{event.organizer.name}</div>
                    <div className="text-sm text-gray-600">{event.organizer.email}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold">GrabMySpot</h4>
              </div>
              <p className="text-gray-400">
                The ultimate GenZ event booking platform for concerts, shows, and experiences.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Users</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/events" className="hover:text-white transition-colors">Browse Events</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Support</Link></li>
                <li><Link href="/refunds" className="hover:text-white transition-colors">Refunds</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Organizers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/organizer" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/organizer/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/organizer/help" className="hover:text-white transition-colors">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 GrabMySpot. All rights reserved. Made with ❤️ for GenZ</p>
          </div>
        </div>
      </footer>
    </div>
  );
}