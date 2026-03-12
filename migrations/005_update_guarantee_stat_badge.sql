UPDATE stats
SET badge = 'Системный контроль'
WHERE label = 'Гарантия результата'
  AND COALESCE(badge, '') = '';
