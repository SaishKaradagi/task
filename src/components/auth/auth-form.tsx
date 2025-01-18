"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
//import { Google } from "lucide-react";
import { useEffect } from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
  }
}

export function AuthForm() {
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          //await signInWithGoogle(response.credential);
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleButton")!,
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, [signInWithGoogle]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div id="googleButton" className="flex justify-center"></div>
      </CardContent>
    </Card>
  );
}
