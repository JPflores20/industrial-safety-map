import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
//#region src/lib/firebase.ts
var app = initializeApp({
	apiKey: "AIzaSyClNERVfb4usDE8jML6AGrNTO_SX3qOLE4",
	authDomain: "safety-map-907c2.firebaseapp.com",
	projectId: "safety-map-907c2",
	storageBucket: "safety-map-907c2.firebasestorage.app",
	messagingSenderId: "242232667601",
	appId: "1:242232667601:web:366b190eb4eb7e1ad284f0",
	measurementId: "G-7TRZDXFD6V"
});
typeof window !== "undefined" && getAnalytics(app);
var db = getFirestore(app);
var auth = getAuth(app);
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-DI6OHLSA.js");
var Route = createFileRoute("/")({
	validateSearch: (search) => ({
		area: typeof search.area === "string" ? search.area : void 0,
		vista: search.vista === "tabla" ? "tabla" : search.vista === "ranking" ? "ranking" : search.vista === "mapa" ? "mapa" : void 0
	}),
	head: () => ({ meta: [
		{ title: "Mapa Interactivo de Seguridad Industrial" },
		{
			name: "description",
			content: "Visualiza áreas de la planta, responsables y riesgos de seguridad asociados."
		},
		{
			property: "og:title",
			content: "Mapa Interactivo de Seguridad Industrial"
		},
		{
			property: "og:description",
			content: "Visualiza áreas de la planta, responsables y riesgos de seguridad asociados."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { auth as n, db as r, Route as t };
