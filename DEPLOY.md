# Регламент публикации презентаций на GitHub Pages

Здесь описано, как правильно класть новые презентации в эту папку,
чтобы они автоматически становились доступны по публичной ссылке.

---

## 0. Базовые правила

**Адрес репозитория:** `github.com/Dredd-NPC/presentations`
**Адрес публикации:** `https://dredd-npc.github.io/presentations/`
**Хостинг:** GitHub Pages, ветка `main`, корень
**Локальная папка:** `/Users/vitaly/Documents/LASER REMOVAL PROJECT/PRESENTATIONS/`

Файл, который лежит в этой папке и попадает в `main`, автоматически становится
доступен по URL `https://dredd-npc.github.io/presentations/<имя-файла>`.
Сборка GitHub Pages занимает 30–90 секунд после `git push`.

---

## 1. Структура папки

```
PRESENTATIONS/
├── index.html                       ← landing-page с карточками всех презентаций
├── README.md                        ← локальный индекс для нас
├── DEPLOY.md                        ← этот документ
├── robots.txt                       ← блокировка поисковых ботов
├── .gitignore                       ← системные файлы
├── <slug-name>.html                 ← каждая презентация — отдельный HTML-файл
└── <slug-name>_files/               ← (опц.) папка с локальными ресурсами рядом
```

---

## 2. Правила именования файлов

**Используем slug-формат:** только латиница, цифры, дефис или подчёркивание.

| ✅ Правильно | ❌ Неправильно |
|---|---|
| `picosecond_lasers_rejuvenation.html` | `Пикосекундные лазеры.html` |
| `botox-vs-fillers-2026.html` | `Botox & Fillers (FINAL!).html` |
| `clinic-pricing-deck.html` | `clinic pricing deck.html` |

**Почему важно:**
- Кириллица в URL превращается в `%D0%9F%D0%B8%D0%BA%D0%BE...` — нечитаемо
- Пробелы дают `%20` — неудобно копировать
- Спецсимволы (&, !, скобки) ломают ссылки в некоторых мессенджерах

Любая русскоязычная подпись или название идут **внутрь HTML** (`<title>`, заголовки) —
там кириллица работает корректно.

---

## 3. Чек-лист новой презентации перед публикацией

Перед коммитом проверь, что в HTML есть:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex,nofollow,noarchive">  ← обязательно
<title>Название · Dr. Vitaly Mikryukov</title>
<!-- ... -->
```

**Зачем `noindex`:** репозиторий публичный (требование Free плана GitHub),
поэтому мы скрываем презентации от поисковых ботов через мета-тег.
Без него Google рано или поздно проиндексирует страницу.

---

## 4. Как опубликовать новую презентацию

### Вариант А: через Claude Code (рекомендуемый)

Просто скажи: «опубликуй новую презентацию X». Claude:
1. Положит файл в `PRESENTATIONS/`
2. Добавит `<meta name="robots" content="noindex,nofollow,noarchive">`
3. Обновит `index.html` и `README.md`
4. Сделает `git add`, `commit`, `push`
5. Дождётся сборки Pages
6. Вернёт прямую ссылку

### Вариант Б: вручную из терминала

```bash
cd "/Users/vitaly/Documents/LASER REMOVAL PROJECT/PRESENTATIONS"

# 1. Скопируй новый HTML в эту папку
cp ~/Downloads/new-presentation.html ./new-presentation.html

# 2. Проверь, что в нём есть meta name="robots"
grep -c 'noindex' new-presentation.html  # должно быть >= 1

# 3. Коммит и пуш
git add new-presentation.html
git commit -m "Add new-presentation"
git push

# 4. Через ~60 секунд ссылка живая
echo "https://dredd-npc.github.io/presentations/new-presentation.html"
```

---

## 5. Как обновить существующую презентацию

```bash
cd "/Users/vitaly/Documents/LASER REMOVAL PROJECT/PRESENTATIONS"
# Меняй HTML локально как обычно
git add picosecond_lasers_rejuvenation.html
git commit -m "Update pico presentation: add MDF slide"
git push
```

Ссылка остаётся той же. Старая версия в браузере может закешироваться —
Cmd+Shift+R принудительно обновляет.

---

## 6. Как давать ссылку коллегам

**Один файл = одна ссылка.** Формат:

```
https://dredd-npc.github.io/presentations/<имя-файла>.html
```

**Текущие активные ссылки:**

| Презентация | Ссылка для отправки |
|---|---|
| Пикосекундные лазеры | `https://dredd-npc.github.io/presentations/picosecond_lasers_rejuvenation.html` |

Можно сразу указать слайд через якорь: `…/picosecond_lasers_rejuvenation.html#s30`

---

## 7. Что НЕ публиковать через эту папку

- ❌ Файлы с персональными данными пациентов (имена, фото без согласия)
- ❌ Внутренние финансовые данные клиники, цены поставщиков
- ❌ Файлы с встроенными API-ключами или токенами
- ❌ Защищённые авторским правом изображения без правильной лицензии
- ❌ Драфты — публикуем только финальные версии

Репозиторий **публичный** (см. раздел 8), даже с `noindex` любой,
кто получит URL, может посмотреть. Поэтому: only final, only safe content.

---

## 8. Текущий уровень приватности

**Что есть сейчас (GitHub Free):**
- Репо публичный
- Все презентации помечены `noindex,nofollow,noarchive`
- `robots.txt` блокирует поисковых ботов
- Описание и темы репозитория отсутствуют
- Эффект: **«unlisted»** — работает только по прямой ссылке

**Что было бы по-настоящему приватно:**
- GitHub Pro ($4/мес) + приватный репо + Pages → ссылка работает, репо скрыт
- Cloudflare Pages (бесплатно) с приватным GitHub-репо как источником

Если решишь перейти — отдельный план миграции, ссылки не сломаются.

---

## 9. Безопасность учётных данных

`gh` CLI хранит токен в keyring macOS, не в файлах. Команда `git push`
использует токен через `gh auth setup-git`. После завершения работы можно:

```bash
gh auth logout     # выйти из gh
# либо отозвать токен на github.com/settings/tokens
```

При следующей публикации потребуется новая авторизация — через 7-дневный
Personal Access Token или device flow.

---

## 10. Полезные команды

```bash
# Статус Pages
gh api /repos/Dredd-NPC/presentations/pages --jq '"\(.status) · \(.html_url)"'

# Логи последнего билда
gh api /repos/Dredd-NPC/presentations/pages/builds/latest --jq '.status,.error.message'

# Список файлов в репо
gh api /repos/Dredd-NPC/presentations/contents/ --jq '.[].name'

# Принудительно пересобрать Pages (если не обновляется)
gh api -X POST /repos/Dredd-NPC/presentations/pages/builds
```
