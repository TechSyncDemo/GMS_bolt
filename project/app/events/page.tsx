'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Star, Search, Filter, MessageCircle } from 'lucide-react';
import Link from 'next/link';

// Mock data for events (should match those in /event/[id])
const mockEvents = [
	{
		id: 1,
		name: 'Neon Nights Festival',
		artist: 'DJ Nucleya & Divine',
		date: '2025-02-15',
		time: '8:00 PM',
		location: 'Phoenix Marketcity, Mumbai',
		image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
		pricing: [
			{ tier: 'Early Bird', price: 1299, available: true },
			{ tier: 'General', price: 1599, available: true },
			{ tier: 'VIP', price: 2999, available: true }
		],
		whatsapp: '+918446522752',
		status: 'approved'
	},
	{
		id: 2,
		name: 'Indie Vibes Concert',
		artist: 'Prateek Kuhad',
		date: '2025-02-20',
		time: '7:30 PM',
		location: 'Hard Rock Cafe, Bangalore',
		image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
		pricing: [
			{ tier: 'Standing', price: 899, available: true },
			{ tier: 'Premium', price: 1499, available: false },
			{ tier: 'VIP', price: 2299, available: true }
		],
		whatsapp: '+918446522752',
		status: 'approved'
	},
	{
		id: 3,
		name: 'Comedy Night Live',
		artist: 'Zakir Khan',
		date: '2025-02-25',
		time: '9:00 PM',
		location: 'Amphitheatre, Delhi',
		image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg',
		pricing: [
			{ tier: 'Bronze', price: 599, available: true },
			{ tier: 'Silver', price: 899, available: true },
			{ tier: 'Gold', price: 1299, available: true }
		],
		whatsapp: '+918446522752',
		status: 'approved'
	}
];

export default function EventsPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [locationFilter, setLocationFilter] = useState('all');
	const [priceFilter, setPriceFilter] = useState('all');

	const filteredEvents = mockEvents.filter(event => {
		const matchesSearch =
			event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			event.artist.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesLocation =
			locationFilter === 'all' ||
			event.location.toLowerCase().includes(locationFilter.toLowerCase());
		const matchesPrice =
			priceFilter === 'all' ||
			(priceFilter === 'under1000' && Math.min(...event.pricing.map(p => p.price)) < 1000) ||
			(priceFilter === '1000-2000' &&
				Math.min(...event.pricing.map(p => p.price)) >= 1000 &&
				Math.min(...event.pricing.map(p => p.price)) <= 2000) ||
			(priceFilter === 'above2000' && Math.min(...event.pricing.map(p => p.price)) > 2000);
		return matchesSearch && matchesLocation && matchesPrice;
	});

	const handleWhatsAppClick = (whatsapp: string, eventName: string) => {
		const message = encodeURIComponent(
			`Hi! I'm interested in booking tickets for ${eventName}. Can you help me?`
		);
		window.open(
			`https://wa.me/${whatsapp.replace('+', '')}?text=${message}`,
			'_blank'
		);
	};

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
								All Events
							</h1>
						</div>
						<nav className="hidden md:flex items-center space-x-6">
							<Link
								href="/"
								className="text-gray-600 hover:text-purple-600 transition-colors"
							>
								Home
							</Link>
							<Link
								href="/organizer"
								className="text-gray-600 hover:text-purple-600 transition-colors"
							>
								For Organizers
							</Link>
							<Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
								Sign Up
							</Button>
						</nav>
					</div>
				</div>
			</header>

			{/* Filters */}
			<section className="py-8 px-4 bg-white/50">
				<div className="container mx-auto">
					<div className="flex flex-wrap gap-4 items-center justify-center">
						<div className="flex items-center gap-2">
							<Filter className="w-5 h-5 text-gray-600" />
							<span className="font-medium text-gray-700">Filters:</span>
						</div>
						<Input
							placeholder="Search events, artists, venues..."
							className="h-10 w-60"
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<Select value={locationFilter} onValueChange={setLocationFilter}>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Location" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Cities</SelectItem>
								<SelectItem value="mumbai">Mumbai</SelectItem>
								<SelectItem value="bangalore">Bangalore</SelectItem>
								<SelectItem value="delhi">Delhi</SelectItem>
								<SelectItem value="pune">Pune</SelectItem>
							</SelectContent>
						</Select>
						<Select value={priceFilter} onValueChange={setPriceFilter}>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Price Range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Prices</SelectItem>
								<SelectItem value="under1000">Under ₹1,000</SelectItem>
								<SelectItem value="1000-2000">₹1,000 - ₹2,000</SelectItem>
								<SelectItem value="above2000">Above ₹2,000</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</section>

			{/* Events Grid */}
			<section className="py-12 px-4">
				<div className="container mx-auto">
					<h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
						All Events
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredEvents.map(event => (
							<Card
								key={event.id}
								className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
							>
								<div className="relative">
									<img
										src={event.image}
										alt={event.name}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute top-4 right-4">
										<Badge className="bg-green-500 hover:bg-green-600">
											Live
										</Badge>
									</div>
								</div>
								<CardHeader className="pb-3">
									<CardTitle className="text-xl font-bold text-gray-800 line-clamp-1">
										{event.name}
									</CardTitle>
									<CardDescription className="text-purple-600 font-medium">
										{event.artist}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center text-gray-600 text-sm">
										<Calendar className="w-4 h-4 mr-2" />
										{new Date(event.date).toLocaleDateString('en-IN', {
											weekday: 'short',
											year: 'numeric',
											month: 'short',
											day: 'numeric'
										})}{" "}
										• {event.time}
									</div>
									<div className="flex items-center text-gray-600 text-sm">
										<MapPin className="w-4 h-4 mr-2" />
										{event.location}
									</div>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-gray-700">
												Starting from
											</span>
											<span className="text-2xl font-bold text-purple-600">
												₹{Math.min(...event.pricing.map(p => p.price)).toLocaleString()}
											</span>
										</div>
										<div className="flex flex-wrap gap-1">
											{event.pricing.map((tier, index) => (
												<Badge
													key={index}
													variant={tier.available ? 'secondary' : 'outline'}
													className="text-xs"
												>
													{tier.tier}: ₹{tier.price.toLocaleString()}
													{!tier.available && ' (Sold Out)'}
												</Badge>
											))}
										</div>
									</div>
									<div className="flex gap-2 pt-2">
										<Button
											className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
											asChild
										>
											<Link href={`/event/${event.id}`}>Book Now</Link>
										</Button>
										<Button
											variant="outline"
											size="icon"
											onClick={() => handleWhatsAppClick(event.whatsapp, event.name)}
											className="border-green-500 text-green-600 hover:bg-green-50"
										>
											<MessageCircle className="w-4 h-4" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

        {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto text-center text-white">
          <h3 className="text-4xl font-bold mb-6">Ready to Host Your Event?</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of organizers who trust GrabMySpot to manage their events and connect with their audience.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
            asChild
          >
            <Link href="/organizer">
              Become an Organizer
            </Link>
          </Button>
        </div>
      </section>

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
								The ultimate GenZ event booking platform for concerts, shows, and
								experiences.
							</p>
						</div>
						<div>
							<h5 className="font-semibold mb-4">For Users</h5>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link
										href="/events"
										className="hover:text-white transition-colors"
									>
										Browse Events
									</Link>
								</li>
								<li>
									<Link
										href="/support"
										className="hover:text-white transition-colors"
									>
										Support
									</Link>
								</li>
								<li>
									<Link
										href="/refunds"
										className="hover:text-white transition-colors"
									>
										Refunds
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h5 className="font-semibold mb-4">For Organizers</h5>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link
										href="/organizer"
										className="hover:text-white transition-colors"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										href="/organizer/signup"
										className="hover:text-white transition-colors"
									>
										Sign Up
									</Link>
								</li>
								<li>
									<Link
										href="/organizer/help"
										className="hover:text-white transition-colors"
									>
										Help Center
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h5 className="font-semibold mb-4">Company</h5>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link
										href="/about"
										className="hover:text-white transition-colors"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="/privacy"
										className="hover:text-white transition-colors"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="hover:text-white transition-colors"
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>
							&copy; 2025 GrabMySpot. All rights reserved. Made with ❤️ for GenZ
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
