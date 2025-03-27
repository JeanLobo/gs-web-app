"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "@/components/ui/beat-loader";
import { newVerification } from "@/actions/new-verification";
import { toast } from "sonner";

export default function VerifyPage() {
  const [isPending, setIsPending] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setIsPending(false);
      return;
    }

    try {
      const response = await newVerification(token);

      if (response?.error) {
        toast.error(response.error);
      }

      if (response?.success) {
        toast.success(response.success);
      }
    } finally {
      setIsPending(false);
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirmando seu e-mail"
      backButtonLabel="Voltar para o login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {isPending ? (
          <BeatLoader />
        ) : token ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-emerald-600 mb-2">
              E-mail confirmado!
            </h2>
            <p className="text-muted-foreground">
              Você já pode fazer login na plataforma.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-destructive mb-2">
              Token inválido!
            </h2>
            <p className="text-muted-foreground">
              O link de confirmação é inválido ou expirou.
            </p>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}