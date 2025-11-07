UPDATE basura
SET tipo = CASE
    WHEN tipo = 'Basura General' THEN 'Basura General'
    WHEN tipo = 'Carton' THEN 'Cartón / Papel'
    WHEN tipo = 'Metales' THEN 'Metales (Aluminio)'
    WHEN tipo = 'Plastico' THEN 'Plástico (PET)'
    WHEN tipo = 'Cristal' THEN 'Cristal'
    WHEN tipo = 'Aceite' THEN 'Aceite de Cocina'
    WHEN tipo = 'Organica' THEN 'Orgánica'
    WHEN tipo = 'Humeda' THEN 'Orgánica'
    ELSE tipo
END;


UPDATE basura
SET procedencia = CASE
    WHEN procedencia = 'Areas Publicas' THEN 'Áreas Públicas'
    WHEN procedencia = 'Cocinas' THEN 'Cocinas'
    WHEN procedencia = 'Lavanderia' THEN 'Lavandería'
    WHEN procedencia = 'Talleres' THEN 'Talleres'
    WHEN procedencia = 'Cuartos' THEN 'Cuartos'
    WHEN procedencia = 'Jardineria' THEN 'Jardinería'
    WHEN procedencia = 'Oficinas' THEN 'Oficinas'
    WHEN procedencia = 'Bares' THEN 'Bares'
    WHEN procedencia = 'Equipo' THEN 'Equipo'
    WHEN procedencia = 'Playa' THEN 'Playa'
    WHEN procedencia = 'SPA' THEN 'SPA'
    WHEN procedencia = 'Tiendas' THEN 'Tiendas'
    WHEN procedencia = 'UVC' THEN 'UVC'
    WHEN procedencia = 'Almacen' THEN 'Almacén'
    ELSE procedencia
END;


      