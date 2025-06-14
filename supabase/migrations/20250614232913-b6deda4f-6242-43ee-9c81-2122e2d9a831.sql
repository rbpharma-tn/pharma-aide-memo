
-- 1. Création d'une enum pour les rôles
CREATE TYPE public.app_role AS ENUM ('admin', 'apprenant');

-- 2. Table des rôles attribués aux utilisateurs
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 3. Activation de la RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Fonction utilitaire (vérifie si un utilisateur a un rôle)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- 5. Politique : un utilisateur peut voir/modifier ses propres rôles
CREATE POLICY "Utilisateur: gère ses rôles" ON public.user_roles
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

