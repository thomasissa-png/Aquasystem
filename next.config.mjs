/** @type {import('next').NextConfig} */

// Site vitrine umbrella — export statique pour Cloudflare Pages.
// Voir docs/dev-decisions.md (D-01, D-02) pour la justification de chaque option.
const nextConfig = {
  // Export 100% statique : génère le dossier `out/` servi par Cloudflare Pages.
  // Aucune API route Next n'est possible — le formulaire passe par functions/api/contact.ts.
  output: 'export',

  // trailingSlash requis par Cloudflare Pages : évite les 404 sur les URLs sans
  // slash final et garantit la cohérence des canonicals (functional-specs F-11).
  trailingSlash: true,

  // En export statique, l'optimiseur d'images Next ne tourne pas au runtime
  // (pas de serveur). On désactive l'optimisation runtime et on fournit des
  // assets pré-optimisés (AVIF/WebP) générés à la conception. Voir D-02.
  images: {
    unoptimized: true,
  },

  // Sécurité : pas d'exposition de la version Next dans les headers de réponse.
  poweredByHeader: false,

  // Échoue le build au moindre warning de type/lint plutôt que de laisser passer.
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
