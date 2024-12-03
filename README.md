# notify-pr-review

🌏 한국어 | [**English**](README.en.md)

PR 데이터를 Slack으로 알리는 Github Actions

<img src="https://github.com/user-attachments/assets/e68ffed1-678e-4d16-92dd-555c2ffe3e3b" width="500" alt="intro">

## Usage

1. 메시지 전달을 위해 `SLACK_BOT_TOKEN` 이름의 secret을 세팅하세요.

> 세팅할 Repo > Settings > Secrets > New repository secret

이때, Value는 슬랙에서 제공하는 `xoxb-` 형태의 토큰이어야 합니다.

2. `.github/workflow/notify-pr-review.yml` 파일을 만드세요:

```yml
name: notify pr review

on:
  pull_request:
    types: [opened]
    
jobs:
  notify:
    runs-on: [ubuntu-latest]
    steps:
      - name: Notify PR Review
        uses: soldoc-kr/notify-pr@v1.0.0
        with:
          slackChannel: ${{ secrets.SLACK_CHANNEL }}
          slackBotToken: ${{ secrets.SLACK_BOT_TOKEN }}
```

## Inputs

### `slackChannel`

**Required** slack 채널 이름명

### `slackBotToken`

**Required** Slack bot을 통해 메시지를 보내기 위한 토큰

e.g. `xoxb-798572638592-435243279588-9aCaWNnzVYelK9NzMMqa1yxz`

## License
```
Copyright (c) 2023-present NAVER Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
