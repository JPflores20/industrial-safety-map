import { n as auth, t as Route$1 } from "./routes-JH-63Ccp.js";
import { createContext, useContext, useEffect, useState } from "react";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, createRouter, useRouter } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Loader2, LogIn, ShieldAlert } from "lucide-react";
//#region src/components/auth/AuthContext.tsx
var AuthContext = createContext({
	currentUser: null,
	loading: true,
	logout: async () => {}
});
function useAuth() {
	return useContext(AuthContext);
}
function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);
	const logout = async () => {
		await signOut(auth);
	};
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: {
			currentUser,
			loading,
			logout
		},
		children: !loading && children
	});
}
//#endregion
//#region src/components/auth/LoginScreen.tsx
function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.error(err);
			if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") setError("Correo o contraseña incorrectos.");
			else setError("Ocurrió un error al iniciar sesión.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx("div", {
		className: "dark min-h-screen bg-background text-foreground flex items-center justify-center p-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md animate-in fade-in zoom-in-95 duration-500",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-center gap-4 mb-8 text-center",
				children: [/* @__PURE__ */ jsx("div", {
					className: "relative flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
					children: /* @__PURE__ */ jsx(ShieldAlert, { className: "h-8 w-8" })
				}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Acceso Restringido"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Inicia sesión para continuar"
				})] })]
			}), /* @__PURE__ */ jsx("div", {
				className: "rounded-2xl border border-border bg-card p-6 shadow-xl backdrop-blur-xl",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: handleLogin,
					className: "space-y-4",
					children: [
						error && /* @__PURE__ */ jsx("div", {
							className: "rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center animate-in slide-in-from-top-2",
							children: error
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Correo Electrónico"
							}), /* @__PURE__ */ jsx("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50",
								placeholder: "supervisor@planta.com"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Contraseña"
							}), /* @__PURE__ */ jsx("input", {
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "w-full rounded-lg border border-border bg-background/50 px-4 py-2.5 text-sm transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50",
								placeholder: "••••••••"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: isLoading,
							className: "mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-amber-950 transition-all hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]",
							children: isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LogIn, { className: "h-5 w-5" }), "Iniciar Sesión"] })
						})
					]
				})
			})]
		})
	});
}
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-2QoV6gEz.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
function AuthWrapper() {
	const { currentUser, loading } = useAuth();
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex h-screen w-full items-center justify-center bg-background",
		children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" })
	});
	if (!currentUser) return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LoginScreen, {}), /* @__PURE__ */ jsx(Toaster, {
		position: "bottom-right",
		richColors: true,
		theme: "dark"
	})] });
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster, {
		position: "bottom-right",
		richColors: true,
		theme: "dark"
	})] });
}
function RootComponent() {
	const { queryClient } = Route.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(AuthWrapper, {}) })
	});
}
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
var Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = { IndexRoute: Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route
}) };
var routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
