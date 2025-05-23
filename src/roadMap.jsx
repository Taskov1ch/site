// src/roadmapData.js

// Используем "enum" для статусов, чтобы избежать опечаток и упростить управление
export const STATUS_TYPES = {
  READY: 'готова',
  PAUSED: 'временно приостановлена',
  IN_PROGRESS: 'в процессе',
  PLANNED: 'планируется',
};

export const roadmapItems = [
  { id: 'idea', title: 'Идея сервера', status: STATUS_TYPES.READY },
  { id: "lore", title: "Расширения лора", status: STATUS_TYPES.PAUSED},
  { id: "visual_novel", title: "Создания визуальной новеллы (дополнение к лору)", status: STATUS_TYPES.PLANNED },
  { id: 'social_media', title: 'Создание соц. сетей', status: STATUS_TYPES.PAUSED },
  { id: 'server_design', title: 'Оформление сервера', status: STATUS_TYPES.IN_PROGRESS },
  { id: 'core_search', title: 'Поиск подходящего ядра', status: STATUS_TYPES.READY },
  { id: 'core_modification', title: 'Модификация ядра', status: STATUS_TYPES.IN_PROGRESS },
  { id: 'plugins_development', title: 'Разработка плагинов', status: STATUS_TYPES.IN_PROGRESS },
  { id: 'plugins_balancing', title: 'Балансировка плагинов', status: STATUS_TYPES.PLANNED },
  { id: 'plugins_testing', title: 'Тесты плагинов', status: STATUS_TYPES.PLANNED },
  { id: 'backend_development', title: 'Разработка бэкенда', status: STATUS_TYPES.IN_PROGRESS },
  { id: 'backend_testing', title: 'Тесты бэкенда', status: STATUS_TYPES.PLANNED },
  { id: 'anticheat_modification', title: 'Модификация античита', status: STATUS_TYPES.PLANNED },
  { id: 'anticheat_testing', title: 'Тестирование античита', status: STATUS_TYPES.PLANNED },
  { id: 'map_construction', title: 'Стройка карты', status: STATUS_TYPES.PLANNED },
  { id: 'resource_packs_creation', title: 'Создания ресурс паков', status: STATUS_TYPES.PLANNED },
  { id: 'donations_setup', title: 'Настройка донатов', status: STATUS_TYPES.PLANNED },
  { id: 'final_testing', title: 'Тестирование', status: STATUS_TYPES.PLANNED },
  { id: 'closed_beta_test', title: 'Закрытый бета тест', status: STATUS_TYPES.PLANNED },
  { id: 'final_touches', title: 'Финальные штрихи', status: STATUS_TYPES.PLANNED },
  { id: 'launch', title: 'Открытие', status: STATUS_TYPES.PLANNED },
  { id: 'marketing_promotion', title: 'Маркетинг и продвижение', status: STATUS_TYPES.PLANNED },
];