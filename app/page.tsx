"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Building2, BarChart, Clock, Shield } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-emerald-600" />,
    title: "Gestão Financeira",
    description: "Controle completo das suas finanças com relatórios detalhados e insights valiosos"
  },
  {
    icon: <Clock className="h-8 w-8 text-emerald-600" />,
    title: "Economia de Tempo",
    description: "Automatize processos e ganhe mais tempo para focar no crescimento do seu negócio"
  },
  {
    icon: <Shield className="h-8 w-8 text-emerald-600" />,
    title: "Segurança Total",
    description: "Seus dados protegidos com as mais avançadas tecnologias de segurança"
  },
  {
    icon: <Building2 className="h-8 w-8 text-emerald-600" />,
    title: "Multi-empresas",
    description: "Gerencie múltiplas empresas em uma única plataforma de forma simples e organizada"
  }
];

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50"
      >
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.h1
            variants={fadeIn}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Simplifique a
            <span className="gradient-text"> gestão </span>
            do seu negócio
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Transforme a maneira como você gerencia sua empresa com nossa plataforma
            intuitiva e completa. Tenha tudo sob controle em um só lugar.
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="space-y-4 md:space-y-0 md:space-x-4"
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              asChild
            >
              <Link href="/auth/register">
                Começar Gratuitamente
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
              asChild
            >
              <Link href="/auth/login">
                Acessar Sistema
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Por que escolher a
            <span className="gradient-text"> Gestão Simples</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="py-20 bg-emerald-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Comece a simplificar sua gestão hoje
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experimente gratuitamente por 14 dias e descubra como podemos
            transformar a gestão do seu negócio.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
            asChild
          >
            <Link href="/auth/register">
              Criar Conta Grátis
            </Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
}