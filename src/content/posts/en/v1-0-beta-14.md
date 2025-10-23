---
title: Transcord v1.0-beta.14
date: 2025-10-24
author: masaabu_
image: posts/v1-0-beta/cover.png
---

Transcord has been updated to v1.0-beta.14! The coverage of message translation has been expanded, the language settings UI has been improved, and translation functions have been unified to enhance stability. This release also includes faster startup and bug fixes.

## Changes

### Expanded message translation
It analyzes the structure of polls and forwarded messages and translates them while preserving context and layout. Even complex messages that include quotes and embeds can be output without losing meaning.

![forwardedMessage](/images/posts/v1-0-beta/forwardedMessage.png)

### Improved language settings screen
Pagination has been added to the bottom of the language dropdown, enabling quick access to languages that do not fit in a single list.

![languageDropdown](/images/posts/v1-0-beta/languageDropdown.png)

### Added feedback command
You can now use /feedback to easily send suggestions and bug reports to the developers. Your input is very welcome.

### Added language
- Esperanto

### Unified translation functions
The previously separate “message translation” and “text translation” functions have been consolidated. Shared processing and error handling have been applied to deliver stable and consistent translation results.

## Bug fixes
- Fixed an issue where the bot did not respond when output exceeded 2,000 characters. Long responses are now returned as an attachment.
- Fixed an issue where selecting polls or forwarded messages caused the bot not to respond.
- Fixed an issue where some languages could not be selected from settings.
- Reviewed setup code and fixed an issue that slowed down bot startup.

## About the temporary downtime
Recently, there were instances of the bot going down temporarily, and we apologize for the inconvenience. The cause was the migration of the bot’s execution servers, which led to delays in some reconnections. At present, the previous execution server is completely down, so responses may be temporarily slower. Thank you for your understanding and cooperation.

Thank you for continuing to use TransCord. Your requests and feedback will be reflected in future updates.
