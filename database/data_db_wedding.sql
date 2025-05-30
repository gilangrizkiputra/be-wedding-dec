-- Engagement Packages
INSERT INTO decorations (title, description, base_price, category, created_at, updated_at) VALUES
-- Engagement
('Mimosa Package', 
'ENTRANCE\n- Welcome Sign\n\nMAIN BACKDROP\n- Backdrop 3 x 2,5m (Artificial Flowers Arrangement)\n- 1 Set of Spotlight\n- Flower Table\n- Rug 2 x 3m', 
4000000, 'engagement', NOW(), NOW()),

('Caspea Package', 
'ENTRANCE\n- Welcome Sign\n\nBACKDROP\n- Backdrop 3 x 2.5m (Mix Artificial & Fresh Flowers Arrangement)\n- Wooden Laser Cutting Name\n- 1 Set of Spotlight\n- Flower Table\n- Rug 2 x 3m', 
5000000, 'engagement', NOW(), NOW()),

('Calla Lily Package', 
'ENTRANCE\n- Welcome Sign\n\nMAIN BACKDROP\n- Backdrop 4 x 2,5m (Mix Artificial & Fresh Flowers Arrangement)\n- 1 Set of Spotlight\n- Flower Table\n- Rug 2 x 3m\n\nCOMPLEMENTARY\n- Hand Bouquet', 
6500000, 'engagement', NOW(), NOW());

INSERT INTO decorations (title, description, base_price, category, created_at, updated_at) VALUES
-- Wedding
('Akad Package',
'ENTRANCE\n- Welcome Sign\n\nMAIN BACKDROP\n- Backdrop 3.5–4 x 2.5m (Mix Artificial & Fresh Flowers Arrangement)\n- Wooden Laser Cutting Name\n- 1 Set of Spotlight\n\nAKAD SET\n- 6 pcs Tiffany Chair\n- 1 pcs Akad Table & Table Cloth\n- Flower Table, 2 pcs Chair Decoration\n- Rug 2 x 3m',
7000000, 'wedding', NOW(), NOW()),

('Holy Matrimony Package',
'ENTRANCE\n- Welcome Sign\n- Welcome Gate\n\nAISLE\n- 10 point Peacock Arrangement\n- Rose Petal Carpet 10 meter\n\nALTAR DECORATION\n- 4 pcs Standing Flowers\n- Pulpit Decoration',
7000000, 'wedding', NOW(), NOW()),

('Jasmine Wedding Package',
'ENTRANCE\n- Welcome Sign\n- Welcome Gate\n- 2 pcs Angpao Table\n\nAISLE\n- 4 pcs Standing Flower (Standard)\n- 4 pcs Peacock Arrangement\n\nMAIN BACKDROP\n- Backdrop 4 x 2.5m (Mix Artificial & Fresh Flowers Arrangement)\n- Wooden Laser Cutting Name\n- 1 Set of Spotlight\n- Bridal Chair (Sofa Kerang)\n- Mini Garden\n\nAKAD SET\n- 6 pcs Tiffany Chair\n- 1 pcs Akad Table & Table Cloth\n- Flower Table, 2 pcs Chair Decoration\n- Rug 2 x 3m\n\nEXCLUDE\n- Stage/level (if venue not available)\n- Melamine bridal path / rose petal carpet',
10000000, 'wedding', NOW(), NOW()),

('Orchid Wedding Package',
'ENTRANCE\n- Welcome Sign\n- Welcome Gate\n- 2 pcs Angpao Table\n\nAISLE\n- 6 pcs Standing Flowers\n- 6 pcs Peacock Arrangement\n- 2-3 pcs Photo Gallery\n\nMAIN BACKDROP\n- Backdrop 6 x 2.5–3m (Mix Artificial & Fresh Flowers Arrangement)\n- Wooden Laser Cutting Name\n- 1 Set of Spotlight\n- Bridal Chair\n- Mini Garden\n\nAKAD SET\n- 6 pcs Tiffany Chair\n- 1 pcs Akad Table & Table Cloth\n- Flower Table, 6 pcs Chair Decoration\n- Rug 2 x 3m\n\nEXCLUDE\n- Stage/level (if venue not available)\n- Melamine bridal path / rose petal carpet',
14000000, 'wedding', NOW(), NOW()),

('Peony Wedding Package',
'ENTRANCE\n- Welcome Sign\n- Welcome Gate\n- 2 pcs Angpao Table\n- Receptionist Backdrop 2.5 x 2.5m\n\nAISLE\n- 8 pcs Standing Flowers\n- 8 pcs Peacock Arrangement\n- 4 pcs Photo Gallery\n- Gazebo 3 x 3m\n\nMAIN BACKDROP\n- Backdrop 8 x 2.5–3.6m (Mix Artificial & Fresh Flowers Arrangement)\n- Wooden Laser Cutting Name\n- 1 Set of Spotlight\n- Bridal Chair\n- Mini Garden\n\nAKAD SET\n- 6 pcs Tiffany Chair\n- 1 pcs Akad Table & Table Cloth\n- Flower Table, 6 pcs Chair Decoration\n- Rug 2 x 3m\n\nENTERTAINMENT/PHOTOBOOTH BACKDROP\n- Backdrop 2.5 x 2.5m\n\nEXCLUDE\n- Stage/level (if the venue not available)\n- Melamine bridal path / rose petal carpet',
26000000, 'wedding', NOW(), NOW());

INSERT INTO additional_services (name, price, unit, created_at, updated_at) VALUES
('Peacock Per Titik', 100000, 'pcs', NOW(), NOW()),
('Peacock Per Meter', 250000, 'm', NOW(), NOW()),
('Dekorasi Tangga', 250000, 'm', NOW(), NOW()),
('Mini Garden Peacock', 250000, 'm', NOW(), NOW()),
('Standing Peacock', 250000, 'pcs', NOW(), NOW()),
('Standing Flower (Fresh)', 500000, 'pcs', NOW(), NOW()),
('Wooden Laser Cutting Name', 250000, 'pcs', NOW(), NOW()),
('Rose Petal Carpet', 100000, 'm', NOW(), NOW()),
('Tenda Plafon', 35000, 'm', NOW(), NOW()),
('Tenda Serut', 50000, 'm', NOW(), NOW()),
('Tenda Balon', 65000, 'm', NOW(), NOW()),
('Tiffany Chair', 50000, 'pcs', NOW(), NOW()),
('Futura Chair+Stretch Cover', 18000, 'pcs', NOW(), NOW()),
('Backwall Kain', 150000, 'm', NOW(), NOW()),
('Misty Fan', 450000, 'pcs', NOW(), NOW()),
('AC', 750000, 'pcs', NOW(), NOW()),
('Akad Set & Dekor Meja Kursi', 500000, 'set', NOW(), NOW()),
('Handbouquet Standart', 250000, 'unit', NOW(), NOW()),
('Handbouquet Custom', 500000, 'unit', NOW(), NOW()),
('Wooden Floor', 100000, 'm2', NOW(), NOW()),
('Melamine Floor T10', 125000, 'm2', NOW(), NOW()),
('Melamine Stage T30-40', 250000, 'm2', NOW(), NOW()),
('Wood Step', 20000, 'pcs', NOW(), NOW()),
('Lantai Kaca Cherry Blossom/Maple', 500000, 'm2', NOW(), NOW()),
('Liang Liu Tree', 2000000, 'unit', NOW(), NOW());


-- DELETE FROM decorations;

SELECT * FROM decorations