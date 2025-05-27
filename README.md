# DATA PRODUCT CATALOG
**AUTODOC INTERNAL PLATFORM**

## Overview

This project was inspired by the **Data Mesh** concept and created as a prototype for a **data product catalog** — a centralized internal tool for managing and discovering data products within the company. The catalog serves as a **single source of truth** for all internal data products, making them accessible, understandable, and improvable for all employees and data consumers. The presented interface primarily demonstrates the catalog from the perspective of a **data product consumer**. For **product creators and owners**, an expanded functionality within their personal dashboard is envisioned, including management of their products, access moderation, and usage statistics.

## Goal

The main objectives of the platform are:
- **Information Sharing** — Ensure all employees are aware of existing data products, and product developers can share their products with a wider audience.
- **Convenient Search** — Enable quick discovery of necessary data products through descriptions, metadata, and owners.
- **Access Management** — Simplify the process of requesting and obtaining access to products.
- **Evaluation and Feedback** — Allow users to rate products and leave comments after gaining access.
- **Product Status Tracking** — Monitor usage and satisfaction, identifying areas for improvement.

## Target Audience

- **Managers and Business Stakeholders** — To understand what data products are available and how to use them.
- **Analysts and Data Scientists** — For finding ready-to-use datasets and metrics.
- **BI Developers and Data Product Owners** — For managing and promoting their products, and receiving feedback.
- **Data Engineers** — For ensuring technical quality and product accountability.

## Access and Permissions

- Access to the service via **SSO**.
- Access to data products is **not granted by default** — users must request access via the product card.
- After access approval by the product owner:
  - ⭐ Product rating functionality becomes available.
  - 💬 Users can leave comments and suggestions for improvement.
- Product owners can manage access to their products, respond to feedback, and update product information through their expanded personal dashboard.

## Core Functionality (Implemented in Prototype)

- Interactive product cards with key information: name, category, description, owner, rating, user count, last updated date, tags, access level.
- Dynamic filtering by categories and text search across multiple product attributes.
- Switchable product display view: grid or list.
- Modal window with detailed product information: characteristics, features, user comments.
- Mock notification system for the user.
- Mock user profile with tabs: "My Profile," "Favorites," "My Access," "Settings."
- Ability to add products to favorites and request access (simulated).
- User interface adapted for Autodoc (using the company logo).

## Potential Improvements (Future Development)

- Automatic metadata synchronization from BI systems and existing data catalog tools (e.g., Alation).
- Product versioning and display of change history.
- Integration of notifications (e.g., for access grants, new comments, product updates) with Slack or Microsoft Teams.
- Dashboard for product owners with analytics on usage, popularity, and feedback for their products.
- Implementation of a full-fledged authentication and role management system.
- Development of a comprehensive backend for data storage and business logic management.

## Technology Stack (Used in Prototype)

- **Frontend**: React with Vite (functional components, hooks), Tailwind CSS for styling.
- **Icons**: Lucide React.
- **Demo Hosting**: GitHub Pages.

*(For a full-scale implementation, a broader stack is envisioned, as previously mentioned: Backend/API (Node.js/Python), Database (PostgreSQL/Supabase/Firebase), Authentication (SSO/role-based model)).*

---

## Author of the Concept and Contact Information

This project was developed and is presented as a **conceptual prototype** to demonstrate a possible implementation of a data product catalog at Autodoc. Active development and implementation are not currently planned or underway without a corresponding decision from the company.

Concept initiator and author:
**Andrei Gromov**

For additional information, questions, or discussion regarding the concept:
* **Email**: [a.gromov@autodoc.eu](mailto:a.gromov@autodoc.eu)
* **LinkedIn**: [linkedin.com/in/andrei-gromov](https://www.linkedin.com/in/andrei-gromov/)

---
*Conceptual prototype developed for Autodoc, May 2025.*

---

---

# DATA PRODUCT CATALOG
**ВНУТРЕННЯЯ ПЛАТФОРМА AUTODOC**

Этот проект был вдохновлён концепцией **Data Mesh** и создан как прототип **каталога дата продуктов** — централизованного внутреннего инструмента для управления и поиска дата продуктов в компании. Каталог выступает как **единый источник правды** о всех внутренних дата продуктах, делая их доступными, понятными и улучшаемыми для всех сотрудников и потребителей данных. Представленный интерфейс демонстрирует каталог преимущественно с точки зрения **потребителя дата продуктов**. Для **создателей и владельцев продуктов** предполагается расширенный функционал в рамках их личного кабинета, включающий управление своими продуктами, модерацию доступа и статистику использования.

## Цель

Основные задачи платформы:
- **Информирование** — сделать так, чтобы все сотрудники знали о существующих дата продуктах, а разработчики продуктов могли поделиться продуктами с широкой публикой.
- **Удобный поиск** — позволить быстро находить нужные дата продукты по описаниям, метаданным и владельцам.
- **Управление доступом** — упростить процесс запроса и получения доступа к продуктам.
- **Оценка и обратная связь** — дать возможность пользователям оценивать продукты и оставлять комментарии после получения доступа.
- **Отслеживание состояния продуктов** — мониторинг использования и удовлетворенности, выявление зон для улучшения.

## Целевая аудитория

- **Менеджеры и бизнес-стейкхолдеры** — понимание, какие дата продукты доступны и как их использовать.
- **Аналитики и Data Scientists** — поиск готовых датасетов и метрик.
- **BI-разработчики и владельцы дата-продуктов** — управление и продвижение своих продуктов, получение обратной связи.
- **Инженеры данных** — обеспечение технического качества и ответственности за продукт.

## Доступ и разрешения

- Доступ к сервису через **SSO**.
- Доступ к дата продуктам **не предоставляется по умолчанию** — пользователь должен запросить доступ через карточку продукта.
- После одобрения доступа владельцем продукта:
  - ⭐ Становится доступна функция оценки продукта.
  - 💬 Можно оставлять комментарии и предложения по улучшению.
- Владельцы продуктов могут управлять доступами к своим продуктам, отвечать на обратную связь и обновлять информацию о продукте через свой расширенный личный кабинет.

## Основной функционал (реализован в прототипе)

- Интерактивные карточки продуктов с ключевой информацией: название, категория, описание, владелец, рейтинг, количество пользователей, дата обновления, теги, уровень доступа.
- Динамическая фильтрация по категориям и текстовый поиск по нескольким атрибутам продукта.
- Переключение вида отображения продуктов: сетка или список.
- Модальное окно с детальной информацией о продукте: характеристики, особенности, комментарии пользователей.
- Система мок-уведомлений для пользователя.
- Мок-профиль пользователя с вкладками: "Мой профиль", "Избранное", "Мои доступы", "Настройки".
- Возможность добавлять продукты в избранное и запрашивать доступ (имитация).
- Пользовательский интерфейс, адаптированный для Autodoc (с использованием логотипа).

## Возможные улучшения (будущее развитие)

- Автоматическая синхронизация метаданных из BI-систем и существующих data catalog-инструментов (например, Alation).
- Версионирование продуктов и отображение истории изменений.
- Интеграция уведомлений (например, о предоставлении доступа, новых комментариях, обновлениях продуктов) со Slack или Microsoft Teams.
- Дашборд для владельцев продуктов с аналитикой использования, популярности и обратной связи по их продуктам.
- Реализация полнофункциональной системы аутентификации и управления ролями.
- Разработка полноценного бэкенда для хранения данных и управления бизнес-логикой.

## Технологический стек (использован в прототипе)

- **Frontend**: React с использованием Vite (функциональные компоненты, хуки), Tailwind CSS для стилизации.
- **Иконки**: Lucide React.
- **Хостинг демо**: GitHub Pages.

*(Для полноценной реализации предполагается более широкий стек, указанный ранее: Backend/API (Node.js/Python), База данных (PostgreSQL/Supabase/Firebase), Аутентификация (SSO/ролевая модель)).*

---

## Автор Концепции и Контактная Информация

Данный проект был разработан и представлен в виде **концептуального прототипа** для демонстрации возможной реализации каталога дата-продуктов в Autodoc. Работа над его активной разработкой и внедрением в данный момент не запланирована и не ведется без соответствующего решения со стороны компании.

Инициатор и автор концепции:
**Андрей Громов**

Для дополнительной информации, вопросов или обсуждения концепции:
* **Email**: [a.gromov@autodoc.eu](mailto:a.gromov@autodoc.eu)
* **LinkedIn**: [linkedin.com/in/andrei-gromov](https://www.linkedin.com/in/andrei-gromov/)

---
*Концептуальный прототип разработан для Autodoc, Май 2025 г.*