# notify-pr-review

🌏 [**한국어**](README.md) | English

GitHub Actions to notify on Slack when a PR is created.

<img src="https://github.com/user-attachments/assets/e68ffed1-678e-4d16-92dd-555c2ffe3e3b" width="500" alt="intro">

## Usage

1. Set up a secret named `SLACK_BOT_TOKEN` to send the message.

> Go to the Repo > Settings > Secrets > New repository secret

For the value, use a Slack token that starts with `xoxb-`.

2. Create a `.github/workflow/notify-pr-review.yml` file:

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

**Required** slack channel name

### `slackBotToken`

**Required** Slack bot token to send messages

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
