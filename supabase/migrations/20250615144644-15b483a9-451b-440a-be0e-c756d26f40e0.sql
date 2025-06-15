
-- Supprimer toutes les mémofiches dont le titre, le sous-titre ou la description contient "test", "demo" ou "factice"
DELETE FROM memofiches
WHERE
  (
    lower(coalesce(title, '')) LIKE '%test%' OR
    lower(coalesce(title, '')) LIKE '%demo%' OR
    lower(coalesce(title, '')) LIKE '%factice%' OR
    lower(coalesce(subtitle, '')) LIKE '%test%' OR
    lower(coalesce(subtitle, '')) LIKE '%demo%' OR
    lower(coalesce(subtitle, '')) LIKE '%factice%' OR
    lower(coalesce(description, '')) LIKE '%test%' OR
    lower(coalesce(description, '')) LIKE '%demo%' OR
    lower(coalesce(description, '')) LIKE '%factice%'
  );
