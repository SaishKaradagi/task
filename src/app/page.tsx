"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState("");
  const authContext = useAuth();

  useEffect(() => {
    if (authContext) {
      setIsLoading(false);
    }
  }, [authContext]);

  if (!authContext) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const { user, signInWithGoogle, logOut } = authContext;

  const handleSignIn = async () => {
    try {
      setLoginError("");
      await signInWithGoogle();
    } catch (error) {
      setLoginError("Failed to sign in. Please try again.");
    }
  };

  const handleGetStarted = async () => {
    try {
      setLoginError("");
      await signInWithGoogle();
      // After successful login, you can redirect to onboarding or dashboard
      // window.location.href = '/onboarding'; // Uncomment and modify as needed
    } catch (error) {
      setLoginError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="w-full max-w-md mx-4 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Logo and Title */}
            <div className="space-y-2">
              <div className="flex justify-center">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">TaskBuddy</h1>
              <p className="text-gray-500 text-sm">
                Streamline your workflow and track progress effortlessly
              </p>
            </div>

            {user ? (
              // Logged in state
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Signed in as</p>
                  <p className="font-medium text-gray-900">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={logOut}
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              // Login state
              <div className="space-y-6">
                <div className="space-y-4">
                  <Button
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </Button>

                  <Button
                    onClick={handleGetStarted}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Get Started
                  </Button>
                </div>

                {loginError && (
                  <div className="text-red-600 text-sm text-center">
                    {loginError}
                  </div>
                )}

                <div className="text-xs text-gray-500 space-y-2">
                  <p>
                    By signing in, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-purple-600 hover:underline"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-purple-600 hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
