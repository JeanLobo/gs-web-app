"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import { toast } from "sonner";
import Link from "next/link";
import { Building2, Mail, Lock, KeyRound } from "lucide-react";
import { Social } from "@/components/auth/social";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "E-mail já está em uso com outro provedor!"
    : "";

  const [isPending, setIsPending] = React.useState(false);
  const [showTwoFactor, setShowTwoFactor] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (values: any) => {
    setIsPending(true);

    try {
      const response = await login(values, callbackUrl);

      if (response?.error) {
        form.reset();
        toast.error(response.error);
      }

      if (response?.success) {
        form.reset();
        toast.success(response.success);
      }

      if (response?.twoFactor) {
        setShowTwoFactor(true);
        toast.info("Código de verificação enviado para seu e-mail!");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-white">
              <Building2 className="size-4" />
            </div>
            <span className="text-lg">Gestão Simples</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
              <p className="text-gray-500">
                Entre com suas credenciais para acessar sua conta
              </p>
            </div>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {showTwoFactor ? (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de Verificação</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="123456"
                              className="pl-9"
                              disabled={isPending}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                placeholder="seu@email.com"
                                type="email"
                                className="pl-9"
                                disabled={isPending}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                placeholder="••••••"
                                type="password"
                                className="pl-9"
                                disabled={isPending}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      variant="link"
                      asChild
                      className="px-0 font-normal"
                      size="sm"
                    >
                      <Link href="/auth/reset">
                        Esqueceu sua senha?
                      </Link>
                    </Button>
                  </>
                )}
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isPending}
                >
                  {showTwoFactor ? "Confirmar" : "Entrar"}
                </Button>
              </form>
            </Form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Ou continue com
                </span>
              </div>
            </div>
            <Social />
            <p className="text-center text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link 
                href="/auth/register" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="Office"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-600/20 backdrop-blur-sm" />
      </div>
    </div>
  );
}