import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Agencia, NovaAgencia } from "@/services/agenciaService";
import { useEffect } from "react";

const formSchema = z.object({
  nome_fantasia: z.string().min(2, { message: "O nome fantasia é obrigatório." }),
  razao_social: z.string().min(2, { message: "A razão social é obrigatória." }),
  cnpj: z.string().min(14, { message: "O CNPJ é obrigatório e deve ter 14 ou 18 caracteres." }),
  email_principal: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  telefone_principal: z.string().optional(),
  endereco: z.string().optional(),
});

interface AgenciaFormProps {
  onSubmit: (data: NovaAgencia) => void;
  isLoading: boolean;
  agencia?: Agencia | null;
}

export function AgenciaForm({ onSubmit, isLoading, agencia }: AgenciaFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome_fantasia: "",
      razao_social: "",
      cnpj: "",
      email_principal: "",
      telefone_principal: "",
      endereco: "",
    },
  });

  useEffect(() => {
    if (agencia) {
      form.reset(agencia);
    } else {
      form.reset({
        nome_fantasia: "",
        razao_social: "",
        cnpj: "",
        email_principal: "",
        telefone_principal: "",
        endereco: "",
      });
    }
  }, [agencia, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="nome_fantasia" render={({ field }) => (<FormItem><FormLabel>Nome Fantasia</FormLabel><FormControl><Input placeholder="Agência Criativa" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="razao_social" render={({ field }) => (<FormItem><FormLabel>Razão Social</FormLabel><FormControl><Input placeholder="Criativa Publicidade Ltda." {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="cnpj" render={({ field }) => (<FormItem><FormLabel>CNPJ</FormLabel><FormControl><Input placeholder="00.000.000/0001-00" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="email_principal" render={({ field }) => (<FormItem><FormLabel>E-mail Principal</FormLabel><FormControl><Input type="email" placeholder="contato@agencia.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="telefone_principal" render={({ field }) => (<FormItem><FormLabel>Telefone</FormLabel><FormControl><Input placeholder="(11) 98765-4321" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="endereco" render={({ field }) => (<FormItem><FormLabel>Endereço</FormLabel><FormControl><Input placeholder="Rua das Ideias, 123" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Salvando...' : 'Salvar'}</Button>
      </form>
    </Form>
  )
}