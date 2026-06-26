import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { collection, query as firestoreQuery, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Settings,
  ShieldAlert,
  Activity,
  Download,
  Moon,
  Sun,
  TableIcon,
  MapIcon,
  FileDown,
} from "lucide-react";
import { toast } from "sonner";
import { PlantMap } from "@/components/security-map/PlantMap";
import { DetailsPanel } from "@/components/security-map/DetailsPanel";
import { FilterBar } from "@/components/security-map/FilterBar";
import { TableView } from "@/components/security-map/TableView";
import { StatsPanel } from "@/components/security-map/StatsPanel";
import { RankingView } from "@/components/security-map/RankingView";
import {
  areas,
  getRiskCategory,
  getAreaStatus,
  type RiskCategory,
  type EstadoArea,
} from "@/components/security-map/data";
import { exportCSV, exportPDF } from "@/lib/export";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Route with URL search params ─────────────────────────────────────────────
export const Route = createFileRoute("/")({
  validateSearch: (
    search: Record<string, unknown>
  ): { area?: string; vista?: "mapa" | "tabla" | "ranking" } => ({
    area: typeof search.area === "string" ? search.area : undefined,
    vista:
      search.vista === "tabla" ? "tabla" : search.vista === "ranking" ? "ranking" : search.vista === "mapa" ? "mapa" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "PRO ONE VIEW" },
      {
        name: "description",
        content:
          "Visualiza áreas de la planta, responsables y riesgos de seguridad asociados.",
      },
      {
        property: "og:title",
        content: "PRO ONE VIEW",
      },
      {
        property: "og:description",
        content:
          "Visualiza áreas de la planta, responsables y riesgos de seguridad asociados.",
      },
    ],
  }),
  component: Index,
});

// ─── Main component ────────────────────────────────────────────────────────────
function Index() {
  const { area: initialArea, vista: initialVista } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  // UI state
  const [selectedId, setSelectedId] = useState<string | null>(
    initialArea ?? null
  );
  const [vista, setVista] = useState<"mapa" | "tabla" | "ranking">(initialVista ?? "mapa");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Filter state
  const [query, setQuery] = useState("");
  const [activeEquipos, setActiveEquipos] = useState<Set<string>>(new Set());
  const [activeCategorias, setActiveCategorias] = useState<Set<RiskCategory>>(
    new Set()
  );
  const [activeResponsable, setActiveResponsable] = useState("");
  const [activeEstados, setActiveEstados] = useState<Set<EstadoArea>>(new Set());
  const [activeTerritorios, setActiveTerritorios] = useState<Set<string>>(new Set());

  // Firebase dynamic areas
  const [dynamicAreas, setDynamicAreas] = useState(areas);

  useEffect(() => {
    const q = firestoreQuery(collection(db, "evaluaciones"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Find the most recent evaluation for each area
      const latestByArea = new Map<string, Date>();
      
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const fecha = data.fecha?.toDate();
        if (fecha && data.areaId) {
          const currentLatest = latestByArea.get(data.areaId);
          if (!currentLatest || fecha > currentLatest) {
            latestByArea.set(data.areaId, fecha);
          }
        }
      });
      
      // Update areas
      setDynamicAreas(areas.map(a => {
        const latest = latestByArea.get(a.id);
        if (latest) {
          // Ajustamos la fecha localmente para evitar desfases horarios UTC
          const localDate = new Date(latest.getTime() - latest.getTimezoneOffset() * 60000);
          return {
            ...a,
            ultimaInspeccion: localDate.toISOString().split('T')[0]
          };
        }
        return {
          ...a,
          ultimaInspeccion: ""
        };
      }));
    });
    return () => unsubscribe();
  }, []);

  // ── Computed filtered areas ──
  const filteredAreas = useMemo(() => {
    let result = dynamicAreas;
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (a) =>
          a.nombre.toLowerCase().includes(q) ||
          a.responsable.toLowerCase().includes(q) ||
          a.equipo.toLowerCase().includes(q) ||
          a.territorio.toLowerCase().includes(q) ||
          a.riesgos.some((r) => r.toLowerCase().includes(q))
      );
    }
    if (activeEquipos.size > 0) {
      result = result.filter((a) => activeEquipos.has(a.equipo));
    }
    if (activeCategorias.size > 0) {
      result = result.filter((a) =>
        a.riesgos.some((r) => activeCategorias.has(getRiskCategory(r)))
      );
    }
    if (activeResponsable) {
      result = result.filter((a) => a.responsable === activeResponsable);
    }
    // ── Estado filter (Mejora 1) ──
    if (activeEstados.size > 0) {
      result = result.filter((a) => activeEstados.has(getAreaStatus(a.ultimaInspeccion)));
    }
    // ── Territorio filter ──
    if (activeTerritorios.size > 0) {
      result = result.filter((a) => activeTerritorios.has(a.territorio));
    }
    return result;
  }, [query, activeEquipos, activeCategorias, activeResponsable, activeEstados, activeTerritorios, dynamicAreas]);

  const selectedArea = dynamicAreas.find((a) => a.id === selectedId) ?? null;

  // ── Handlers ──
  function handleSelect(id: string) {
    setSelectedId(id);
    navigate({ search: (prev) => ({ ...prev, area: id }), resetScroll: false });
  }

  function handleVistaChange(v: "mapa" | "tabla" | "ranking") {
    setVista(v);
    navigate({ search: (prev) => ({ ...prev, vista: v }), resetScroll: false });
  }

  function handleToggleEquipo(equipo: string) {
    setActiveEquipos((prev) => {
      const next = new Set(prev);
      next.has(equipo) ? next.delete(equipo) : next.add(equipo);
      return next;
    });
  }

  function handleToggleCategoria(cat: RiskCategory) {
    setActiveCategorias((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  function handleToggleEstado(estado: EstadoArea) {
    setActiveEstados((prev) => {
      const next = new Set(prev);
      next.has(estado) ? next.delete(estado) : next.add(estado);
      return next;
    });
  }

  function handleToggleTerritorio(territorio: string) {
    setActiveTerritorios((prev) => {
      const next = new Set(prev);
      next.has(territorio) ? next.delete(territorio) : next.add(territorio);
      return next;
    });
  }

  function clearAll() {
    setQuery("");
    setActiveEquipos(new Set());
    setActiveCategorias(new Set());
    setActiveResponsable("");
    setActiveEstados(new Set());
    setActiveTerritorios(new Set());
  }

  function handleExportCSV() {
    exportCSV(filteredAreas);
    toast.success("CSV exportado", {
      description: `${filteredAreas.length} áreas · seguridad-industrial.csv`,
      duration: 3000,
    });
  }

  function handleExportPDF() {
    exportPDF();
    toast.info("Abriendo diálogo de impresión…", { duration: 2000 });
  }

  return (
    <div className={`${theme} min-h-screen bg-background text-foreground`}>
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
              <img src="/logos/BREWMAN.jpeg" alt="BREWMAN" className="h-full w-full object-cover rounded-lg" />
              <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-green-400 ring-2 ring-background" />
            </div>
            <div>
              <h1 className="hidden sm:block text-lg font-black tracking-tight text-foreground">
                PRO ONE VIEW
              </h1>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Activity className="h-3 w-3 text-green-400" />
                {areas.length} áreas · Sistema activo
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Vista toggle */}
            <div className="flex items-center rounded-lg border border-border bg-surface-zone p-0.5">
              <button
                id="vista-mapa-btn"
                type="button"
                onClick={() => handleVistaChange("mapa")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  vista === "mapa"
                    ? "bg-amber-500/20 text-amber-300"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" />
                Mapa
              </button>
              <button
                id="vista-tabla-btn"
                type="button"
                onClick={() => handleVistaChange("tabla")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  vista === "tabla"
                    ? "bg-amber-500/20 text-amber-300"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
                Tabla
              </button>
              <button
                id="vista-ranking-btn"
                type="button"
                onClick={() => handleVistaChange("ranking")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  vista === "ranking"
                    ? "bg-amber-500/20 text-amber-300 shadow-[0_0_15px_-3px_rgba(245,158,11,0.4)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                🏆 Ranking
              </button>
            </div>

            <button
              id="settings-btn"
              type="button"
              aria-label="Configuración"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Main layout ── */}
      <main className="mx-auto max-w-7xl space-y-4 px-6 py-6">
        {vista === "ranking" ? (
          <RankingView />
        ) : (
          <>
            {/* Stats dashboard (collapsible) */}
            <StatsPanel />

            {/* Filters */}
            <FilterBar
              query={query}
              onQueryChange={setQuery}
              activeEquipos={activeEquipos}
              onToggleEquipo={handleToggleEquipo}
              activeCategorias={activeCategorias}
              onToggleCategoria={handleToggleCategoria}
              activeResponsable={activeResponsable}
              onResponsableChange={setActiveResponsable}
              activeEstados={activeEstados}
              onToggleEstado={handleToggleEstado}
              activeTerritorios={activeTerritorios}
              onToggleTerritorio={handleToggleTerritorio}
              totalVisible={filteredAreas.length}
              onClearAll={clearAll}
            />

            {/* Two-column layout */}
            <div className="flex gap-6 lg:items-start">
              {/* Left — scrollable content */}
              <div className="min-w-0 flex-1">
                {vista === "mapa" ? (
                  <PlantMap
                    areas={filteredAreas}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                ) : (
                  <TableView
                    areas={filteredAreas}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                  />
                )}
              </div>

              {/* Right — sticky details panel (desktop only) */}
              <div className="no-print hidden w-80 shrink-0 lg:sticky lg:top-[65px] lg:block lg:self-start">
                <DetailsPanel area={selectedArea} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* ── Mobile bottom Sheet ── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="no-print h-[72vh] overflow-y-auto rounded-t-2xl lg:hidden"
        >
          <SheetHeader className="pb-2">
            <SheetTitle className="text-left text-sm text-muted-foreground">
              Detalle del área
            </SheetTitle>
          </SheetHeader>
          <DetailsPanel area={selectedArea} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
