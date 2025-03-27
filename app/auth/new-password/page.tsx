"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { newPassword } from "@/actions/new-password";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    if (!token) {
      toast.error("Token não encontrado!");
      return;
    }

    setIsPending(true);

    try {
      const response = await newPassword(values, token);

      if (response?.error) {
        toast.error(response.error);
      }

      if (response?.success) {
        toast.success(response.success);
        router.push("/auth/login");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="Nova senha"
      backButtonLabel="Voltar para o login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="••••••"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            Redefinir senha
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}