import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Brain, Calendar, Heart, Target, User } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Track Your Fitness Journey with AI-Powered Insights
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                FitTrack AI helps you achieve your fitness goals with personalized workout plans, detailed activity
                tracking, and smart progress analysis.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Fitness tracking dashboard"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Fitness Journey</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-gray-600 mb-4">
                Secure registration, profile customization, and account management to keep your fitness data safe.
              </p>
              <Link href="/register" className="text-emerald-600 font-medium inline-flex items-center">
                Create account <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Activity Tracking</h3>
              <p className="text-gray-600 mb-4">
                Log workouts manually or sync with wearable devices to track your progress in real-time.
              </p>
              <Link href="/activities" className="text-emerald-600 font-medium inline-flex items-center">
                Explore tracking <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600 mb-4">
                Get personalized workout plans and recommendations based on your goals and performance.
              </p>
              <Link href="/ai-features" className="text-emerald-600 font-medium inline-flex items-center">
                See AI features <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Goal Management</h3>
              <p className="text-gray-600 mb-4">
                Set SMART fitness goals, track your progress, and celebrate achievements along the way.
              </p>
              <Link href="/goals" className="text-emerald-600 font-medium inline-flex items-center">
                Set goals <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Visualization</h3>
              <p className="text-gray-600 mb-4">
                View your fitness data through intuitive charts and graphs to understand your progress.
              </p>
              <Link href="/stats" className="text-emerald-600 font-medium inline-flex items-center">
                View statistics <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Workout Planning</h3>
              <p className="text-gray-600 mb-4">
                Plan your workouts in advance and get reminders to stay consistent with your routine.
              </p>
              <Link href="/planner" className="text-emerald-600 font-medium inline-flex items-center">
                Plan workouts <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have achieved their fitness goals with FitTrack AI.
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
            <Link href="/register">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">FitTrack AI</h3>
              <p className="text-gray-400 max-w-md">
                Your all-in-one fitness companion for tracking workouts, setting goals, and achieving results.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-lg mb-4">Features</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/activities" className="text-gray-400 hover:text-white">
                      Activity Tracking
                    </Link>
                  </li>
                  <li>
                    <Link href="/goals" className="text-gray-400 hover:text-white">
                      Goal Setting
                    </Link>
                  </li>
                  <li>
                    <Link href="/ai-features" className="text-gray-400 hover:text-white">
                      AI Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/stats" className="text-gray-400 hover:text-white">
                      Statistics
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Account</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/register" className="text-gray-400 hover:text-white">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-gray-400 hover:text-white">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="text-gray-400 hover:text-white">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="text-gray-400 hover:text-white">
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">Support</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/help" className="text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-400 hover:text-white">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-400 hover:text-white">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-400 hover:text-white">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} FitTrack AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
