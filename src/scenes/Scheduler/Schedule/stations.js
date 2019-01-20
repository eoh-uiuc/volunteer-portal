export const stations = [
  { name: 'Discover EOH', key: 'discover_eoh' },
  { name: 'Equipment Management', key: 'equipment_management' },
  { name: 'Exhibits', key: 'exhibits' },
  { name: 'General Volunteers', key: 'general_volunteers' },
  { name: 'HSDC', key: 'hsdc' },
  { name: 'Illini Engineering Challenge', key: 'illini_engineering_challenge' },
  { name: 'Judging Assitants', key: 'judging_assistant' },
  { name: 'Merchandise', key: 'merchandise' },
  { name: 'MRDC', key: 'mrdc' },
  { name: 'MSDC', key: 'msdc' },
  { name: 'Safety', key: 'safety' },
  { name: 'Traffic', key: 'traffic' },
  { name: 'Visitors Booth', key: 'visitors_booth' },
];

export const stationMap = {};
stations.forEach(f => { stationMap[f.key] = f.name; });
