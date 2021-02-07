SELECT * 
FROM "Sample" s
INNER JOIN "Major" m ON (s.major_id = m.major_id)
INNER JOIN "Trace" t ON (s.trace_id = t.trace_id)
INNER JOIN "Computed" c ON (s.comp_id = c.comp_id)
ORDER BY s.sample_id;