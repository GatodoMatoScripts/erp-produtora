import { useEffect, useState } from 'react';
import { fetchAgencias, createAgencia, updateAgencia, deleteAgencia, Agencia, NovaAgencia } from '@/services/agenciaService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AgenciaForm } from '@/components/shared/forms/AgenciaForm';
import { toast } from "sonner";
import { MoreHorizontal } from 'lucide-react';

export function AgenciasPage() {
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [editingAgencia, setEditingAgencia] = useState<Agencia | null>(null);
  const [deletingAgencia, setDeletingAgencia] = useState<Agencia | null>(null);

  const carregarAgencias = async () => {
    try {
      setLoading(true);
      const data = await fetchAgencias();
      setAgencias(data);
    } catch (err) { setError('Falha ao carregar agências.'); } 
    finally { setLoading(false); }
  };

  useEffect(() => { carregarAgencias(); }, []);

  const handleFormSubmit = async (data: NovaAgencia) => {
    setSubmitting(true);
    try {
      if (editingAgencia) {
        await updateAgencia(editingAgencia.id, data);
        toast.success("Agência atualizada com sucesso.");
      } else {
        await createAgencia(data);
        toast.success("Agência criada com sucesso.");
      }
      setFormOpen(false);
      setEditingAgencia(null);
      carregarAgencias();
    } catch (error) {
      toast.error(`Falha ao ${editingAgencia ? 'atualizar' : 'criar'} agência.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (agencia: Agencia) => {
    setEditingAgencia(agencia);
    setFormOpen(true);
  };

  const handleDeleteClick = (agencia: Agencia) => {
    setDeletingAgencia(agencia);
    setAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingAgencia) return;
    try {
      await deleteAgencia(deletingAgencia.id);
      toast.success("Agência removida com sucesso.");
      setAlertOpen(false);
      setDeletingAgencia(null);
      carregarAgencias();
    } catch (error) {
      toast.error("Falha ao remover agência.");
    }
  };

  if (loading && !agencias.length) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className='space-y-4'>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Agências</h1>
        <Button onClick={() => { setEditingAgencia(null); setFormOpen(true); }}>Adicionar Agência</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Fantasia</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="w-[64px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agencias.map((agencia) => (
                <TableRow key={agencia.id}>
                  <TableCell className="font-medium">{agencia.nome_fantasia}</TableCell>
                  <TableCell>{agencia.cnpj}</TableCell>
                  <TableCell>{agencia.email_principal}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleEditClick(agencia)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleDeleteClick(agencia)} className="text-destructive">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAgencia ? 'Editar Agência' : 'Adicionar Nova Agência'}</DialogTitle>
          </DialogHeader>
          <AgenciaForm onSubmit={handleFormSubmit} isLoading={isSubmitting} agencia={editingAgencia} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A agência "{deletingAgencia?.nome_fantasia}" será marcada como inativa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}