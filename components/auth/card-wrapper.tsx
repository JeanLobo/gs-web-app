"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <Card className="w-[400px] shadow-xl border-emerald-100/20 backdrop-blur-sm bg-white/90">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {showSocial && (
          <CardFooter className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </CardFooter>
      </Card>
    </div>
  );
}