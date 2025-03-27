"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";
import { toast } from "sonner";

export default function ResetPage() {
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsPending(true);

    try {
      const response = await reset(values);

      if (response?.error) {
        toast.error(response.error);
      }

      if (response?.success) {
        toast.success(response.success);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="Esqueceu sua senha?"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="seu@email.com"
                      type="email"
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
            Enviar link de redefinição
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}