# Карта функций Sweet-lana

«Сохранено» означает, что код остался в проекте. Для полноценного подключения могут потребоваться сервис, контент и интеграция с текущими страницами.

## Уже используется

| Возможность | Код / источник |
| --- | --- |
| Главная на LV/RU/EN и выбор языка | `src/app/[locale]/page.tsx`, `src/proxy.ts` |
| Кабинеты Imanta и Center, услуги и WhatsApp | `src/app/[locale]/cabinet/[slug]/page.tsx` |
| Публичная галерея с пустым состоянием | `src/app/[locale]/gallery/page.tsx` |
| Слайдер до/после | `src/components/BeforeAfterSlider.tsx` |
| Фрагменты Google-отзывов | `src/components/GoogleReviews.tsx` |
| Тексты и данные кабинетов | `src/content/site.ts` |
| Бренд, контакты и внешние ссылки | `src/lib/business.ts` |

## Отложено, код сохранён

| Возможность | Где находится | Что потребуется |
| --- | --- | --- |
| Админка и вход | `src/components/admin/`, серверные `/admin` и `/login` | `ENABLE_ADMIN=true`, новые `ADMIN_USERNAME`/`ADMIN_PASSWORD`; для контента — новая MongoDB |
| Подписанные сессии | `src/lib/admin-auth.ts`, `src/proxy.ts`, `/api/auth/*` | Проверка доступа в proxy сохранена; cookie переименована в `sweet_lana_admin_session` |
| Редактор Hero и SEO | `AdminDashboard.tsx`, `/api/admin/content`, `src/lib/content.ts` | Сохранение в MongoDB, затем отдельная интеграция чтения в текущую главную и метаданные. Флаг admin этого не делает |
| Галерея, категории, переводы, сортировка | `GalleryAdmin.tsx`, `CategoriesAdmin.tsx`, `/api/admin/gallery*`, `src/lib/gallery*.ts` | Новая MongoDB, `ENABLE_ADMIN=true`; для публичного вывода отдельно `ENABLE_PUBLIC_GALLERY=true` |
| Фото, WebP и миниатюры | `src/lib/r2-storage.ts` | Новые R2 account/access/secret, bucket и public URL; обработка sharp сохранена |
| Клиентская галерея с категориями | `src/components/gallery/PublicGallery.tsx` | Передать данные и переводы, при необходимости заменить текущую разметку |
| Форма записи и Telegram | `src/components/sections/BookingForm.tsx`, `/api/booking` | Новые Telegram bot/chat, `ENABLE_BOOKING_API=true`, тексты в `messages/`, подключение формы |
| Аналитика после согласия | `CookieConsent.tsx`, `src/lib/analytics.ts` | Подключить компонент, передать новые ID через props `googleAnalyticsId` и `facebookPixelId`, заполнить переводы. Сейчас трекеров на сайте нет |
| Переключение темы | `ThemeToggle.tsx`, `globals.css` | Подключить переключатель, восстановление сохранённого выбора и проверить контраст новых страниц |
| Переключение языка и прежние Header/Footer | `LanguageSwitcher.tsx`, `Header.tsx`, `Footer.tsx`, `LanguageContext.tsx` | `LanguageProvider`, заполненные словари; якоря и ссылки адаптировать под текущие страницы |
| Анимации, UI, хуки | `Reveal`, `PageTransition`, `Button`, `Card`, `FormField`, `Skeleton`, `src/hooks/` | Подключать по мере необходимости; `useLanguage` требует провайдера |
| Секции Hero, Services, FAQ, Benefits, сравнения, карусель | `src/components/sections/`, `ProcedureCarousel.tsx` | Шаблоны с прежней специализацией: заменить демонстрационные тексты/изображения перед использованием |
| Частные отзывы со скриншотами | `src/lib/testimonials.ts`, `src/components/reviews/`, пустые JSON-манифесты | Только новые отзывы с разрешением и обезличенные изображения; скрипт подготовки уже отсутствовал в исходном Sweet-lana |
| Structured data и hreflang | `StructuredData.tsx`, `src/lib/seo/schema.ts`, `src/lib/i18n.ts` | Заполнить реальные данные, адаптировать схему услуг под новый бизнес; индексация пока выключена |

## Подключение сервисов позже

1. Создать отдельные ресурсы Sweet-lana и заполнить соответствующие переменные из `.env.example`.
2. Проверить сценарий в отдельной среде. `MONGODB_DB` поддерживает своё имя, по умолчанию `sweet_lana_prod`; публичная галерея использует тот же слой данных.
3. Включить только нужные флаги на сервере и перезапустить приложение. Для загрузки и редактирования достаточно `ENABLE_ADMIN=true`; `ENABLE_PUBLIC_GALLERY=true` отдельно публикует снимки на сайте. Для публичного чтения admin не нужен.
4. Перед открытием админки доработать защиту входа от перебора и повторяемость удаления фото при сбоях R2. Эти проблемы из ревью отложены вместе с подключением CMS.
5. Связать функцию с новым интерфейсом и добавить её браузерный сценарий. Для CMS отдельно подключить сохранённый контент к Hero/SEO.

Не включать все флаги ради сборки: сайт и CI работают без внешних сервисов. Сохранённые unit-тесты включают нужную функцию внутри теста и подменяют внешние вызовы.
