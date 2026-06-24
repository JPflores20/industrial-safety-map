import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ShieldAlert, LogIn, Loader2 } from "lucide-react";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, AuthContext will handle state
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error al iniciar sesión.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center gap-4 mb-8 text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Acceso Restringido</h1>
            <p className="text-sm text-muted-foreground mt-1">Inicia sesión para continuar</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-4">
            
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center animate-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                placeholder="supervisor@planta.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-amber-950 transition-all hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
