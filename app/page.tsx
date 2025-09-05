"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, Users, BarChart3, Zap, Shield, Clock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto text-center dark:text-black">
          <div className="max-w-3xl mx-auto space-y-8">
            <Badge variant="outline" className="text-sm px-4 py-2 dark:text-black">
              🎉 Welcome to Alx Polly
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {loading
                ? "..."
                : user
                  ? `Welcome, ${user.email}`
                  : "Create Polls,"}
              <br />
              <span className="text-primary">Gather Opinions</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build engaging polls to collect feedback, make decisions, and
              understand your community better. Simple, fast, and powerful.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/create-poll">
                <Button size="lg" className="w-full sm:w-auto">
                  <Vote className="h-5 w-5 mr-2" />
                  Create Your First Poll
                </Button>
              </Link>
              <Link href="/polls">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Browse Polls
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Alx Polly?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, share, and analyze polls
              effectively
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Create polls in seconds with our intuitive interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Quick poll creation</li>
                  <li>• Real-time results</li>
                  <li>• Instant sharing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Community Driven</CardTitle>
                <CardDescription>
                  Engage your audience and build stronger communities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Public & private polls</li>
                  <li>• Multiple vote options</li>
                  <li>• Anonymous voting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Powerful Analytics</CardTitle>
                <CardDescription>
                  Get insights with detailed results and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Visual results</li>
                  <li>• Vote tracking</li>
                  <li>• Export data</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
                <CardDescription>
                  Set expiry dates and control when polls are active
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Custom expiry dates</li>
                  <li>• Auto-close polls</li>
                  <li>• Schedule publishing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is safe with enterprise-grade security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Data encryption</li>
                  <li>• Privacy controls</li>
                  <li>• GDPR compliant</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Vote className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>
                  Intuitive design that anyone can master in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• No learning curve</li>
                  <li>• Mobile friendly</li>
                  <li>• Clean interface</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with Alx Polly in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Your Poll</h3>
              <p className="text-muted-foreground">
                Add your question, options, and customize settings like multiple
                votes or expiry dates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Share & Collect</h3>
              <p className="text-muted-foreground">
                Share your poll link and watch as responses come in real-time
                from your audience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Analyze Results</h3>
              <p className="text-muted-foreground">
                View detailed results with charts and insights to make informed
                decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of users who trust Alx Polly for their polling
              needs. Create your first poll today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Sign Up Free
                </Button>
              </Link>
              <Link href="/polls">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Explore Polls
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}