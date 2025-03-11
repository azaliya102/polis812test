#  Чек-лист для тестирования сайта **Vakuu**

##  **Функциональное тестирование**

| №  | Раздел | Что проверяется | Ожидаемый результат | Фактический результат | Статус |
|----|--------|----------------|----------------------|----------------------|---------|
| 1  | Флаг | Меняется ли флаг при смене языка | Должен меняться | Не меняется | ❌ |
| 2  | Язык | Меняется ли текст при смене языка | Должен меняться | Остается тем же | ❌ |
| 3  | Header | Кнопка "Get Started" | Должна менять содержимое страницы | Ничего не меняется | ❌ |
| 4  | Header | Ссылки (Insurance, About us, Blog, Review, Contact, My Account) | Должны вести на корректные страницы | Ведут на 404 | ❌ |
| 5  | Страница услуг | Кнопки "Calculate the price" (Car, Home, Travel, Pet insurance) | Должны вести на форму расчета | Ведут на 404 | ❌ |
| 6  | Блок "Reviews" | Правая стрелка для листания отзывов | Должна работать | Выглядит кликабельной, но не работает | ❌ |
| 7  | Footer | Ссылки (Car insurance, Home insurance, Travel insurance, Pet insurance, Blog, About us, Partners, Review, Contact us) | Должны вести на корректные страницы | Ведут на 404 | ❌ |
| 8  | Footer | Логотип Vakuu | Должен вести на главную страницу | Ведет на **sravni.ru** | ❌ |
| 9  | Footer | Ссылка "Terms" | Должна вести на страницу с условиями | Ведет на `#` | ❌ |
| 10 | Footer | Ссылки "Privacy" и "Cookies" | Должны вести на соответствующие страницы | Ведут на 404 | ❌ |
| 11 | Соцсети | Значки соцсетей | Должны вести на соцсети | Ведут на `#` | ❌ |

## 🔹 **Форма подписки (email)**

| №  | Проверка | Ожидаемый результат | Фактический результат | Статус |
|----|----------|----------------------|----------------------|---------|
| 12 | Отправка пустого email | Должно появляться сообщение об ошибке | Проходит без ошибки | ❌ |
| 13 | Ввод email без @ | Должно появляться сообщение об ошибке | Показывает ошибку с опечаткой **"WROG"** | ❌ |
| 14 | Ввод email с несуществующим доменом (test@invalid.domain) | Должно появляться сообщение об ошибке | Принимает как валидный email | ❌ |

---
##  **Итого**
25 Ошибок
