import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({
  href,
  label,
}: BackButtonProps) {
  return (
    <Button
      variant="link"
      className="font-normal w-full text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
      size="sm"
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
}