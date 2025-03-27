"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center gap-2 group"
        variant="outline"
        onClick={() => {}}
      >
        <FcGoogle className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
        <span className="hidden sm:block">Google</span>
      </Button>
    </div>
  );
}