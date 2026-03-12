UPDATE stats
SET badge = 'По всей России'
WHERE label = 'Регионов присутствия'
  AND COALESCE(badge, '') = '';
