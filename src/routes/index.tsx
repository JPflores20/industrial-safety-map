import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, ShieldAlert } from "lucide-react";
import { PlantMap } from "@/components/security-map/PlantMap";
import { DetailsPanel } from "@/components/security-map/DetailsPanel";
import { areas } from "@/components/security-map/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa Interactivo de Seguridad Industrial" },
      {
        name: "description",
        content:
          "Visualiza áreas de la planta, responsables y riesgos de seguridad asociados.",
      },
      { property: "og:title", content: "Mapa Interactivo de Seguridad Industrial" },
      {
        property: "og:description",
        content:
          "Visualiza áreas de la planta, responsables y riesgos de seguridad asociados.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedArea = areas.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/40 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-safety-warning/40 bg-safety-warning/10 text-safety-warning">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">
                Mapa Interactivo de Seguridad
              </h1>
              <p className="text-xs text-muted-foreground">
                Plano de planta · Responsables y riesgos por área
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Configuración"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-[7fr_3fr]">
          <PlantMap
            areas={areas}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <DetailsPanel area={selectedArea} />
        </div>
      </main>
    </div>
  );
}
