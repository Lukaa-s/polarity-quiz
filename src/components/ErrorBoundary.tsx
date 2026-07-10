// src/components/ErrorBoundary.tsx
// Garde-fou de rendu : capture les erreurs de rendu (dont l'échec d'un import
// dynamique après un redéploiement Vercel, une coupure réseau, etc.) et affiche
// un repli en français plutôt qu'un écran blanc.
//
// Deux usages :
//  - global (main.tsx) : entoure toute l'app ;
//  - local (App.tsx) : entoure le <Suspense> des résultats, avec `onReset` pour
//    retenter le chargement sans démonter le reste de l'app.
import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  // Appelé quand l'utilisateur clique « Réessayer » : permet au parent de
  // recréer le composant paresseux (nouvel import) pour un vrai nouvel essai.
  onReset?: () => void;
  title?: string;
  description?: string;
};

type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Journalisation console : pas de service externe (CSP stricte, zéro backend).
    console.error("[ErrorBoundary]", error, info);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const {
      title = "Une erreur est survenue",
      description = "Quelque chose n'a pas pu s'afficher. Votre progression enregistrée sur cet appareil est conservée.",
    } = this.props;

    return (
      <div className="min-h-[60vh] w-full bg-paper text-ink flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md card p-6 sm:p-8 text-center space-y-5">
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink">{title}</h1>
          <p className="text-sm text-ink2 leading-relaxed">{description}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={this.handleRetry}
              className="btn-ink w-full sm:w-auto px-6 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
            >
              Réessayer
            </button>
            <button
              onClick={() => window.location.reload()}
              className="btn-outline w-full sm:w-auto px-6 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-paper2 focus-visible:ring-ink"
            >
              Recharger la page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
