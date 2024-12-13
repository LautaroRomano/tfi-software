import { authenticUser } from "@/app/dashboard/pacientes/functions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

// Import the storeToken function
import { storeToken } from "@/lib/utils"; // Adjust the path based on your structure // Adjust the path as necessary
interface DialogProps {
  router: ReturnType<typeof useRouter>;
}
const FormSchema = z.object({
  email: z.string().email("Debe ser un correo válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

export function AlertDestructive() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
      {/* Fondo semitransparente, pero interactuable */}
      <div className="absolute inset-0 bg-black opacity-50 pointer-events-auto" />

      {/* El alert no bloquea la interacción, tiene pointer-events-auto */}
      <Alert
        variant="destructive"
        className="mt-4 max-w-xs w-full pointer-events-auto"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Credenciales invalidas</AlertDescription>
      </Alert>
    </div>
  );
}

export const Dialog = ({ router }: DialogProps) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [error, setError] = useState<string | null>(null); // Estado para el error

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await authenticUser(data.email, data.password);

      if (result.success) {
        // guaradar en base de datos el token
        storeToken(result.token, result.user).then(() => {
          router.push("/dashboard");
        });
      } else {
        // Handle login failure
        setError("Login failed. Please check your credentials."); // Establece el error
        setTimeout(() => {
          setError(null); // Desaparece el alert después de 4 segundos
        }, 4000);
      }
    } catch (error) {
      console.log("el error es", error);
      setError("An unexpected error occurred. Please try again later."); // Establece el error
    }
  };

  return (
    <>
      {error && <AlertDestructive />}
      <AlertDialog>
        <AlertDialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Iniciar Sesion
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">
              Te damos la bienvenida a Medical Clínica
            </AlertDialogTitle>
            <AlertDialogDescription>
              <Form {...form}>
                {/* Formulario completo */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  {/* Campo de Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="tuemail@ejemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Campo de Contraseña */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="******"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Botón de Enviar */}
                  <AlertDialogAction
                    type="submit" // Define como botón de tipo submit
                    className="w-full rounded-md border border-gray-300 bg-blue-500 text-white"
                    disabled={!form.formState.isValid} // Deshabilita si el formulario no es válido
                  >
                    Iniciar sesion
                  </AlertDialogAction>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
