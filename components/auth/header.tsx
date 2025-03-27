import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-400 p-2 rounded-xl shadow-lg">
        <Building2 className="h-8 w-8 text-white" />
        <h1 className={cn(
          "text-3xl font-semibold text-white",
          font.className,
        )}>
          Gestão Simples
        </h1>
      </div>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>
    </div>
  );
}