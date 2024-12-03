// Notify PR Review
// Copyright (c) 2023-present NAVER Corp.
// Apache-2.0

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const ENCODE_PAIR = {
    "<": "&lt;",
    ">": "&gt;"
};
const encodeText = text => text.replace(/[<>]/g, matched => ENCODE_PAIR[matched]);

const D0 = "D-0";
const sendSlack = ({repoName, labels, title, url}) => {
    const d0exists = labels.some(label => label.name === D0);

    return axios({
        method: "post",
        headers: {
            Authorization: `Bearer ${core.getInput("slackBotToken")}`,
            "Content-Type": "application/json"
        },
        url: "https://slack.com/api/chat.postMessage",
        data: {
            channel: `${core.getInput("slackChannel")}`,
            text: "리뷰 요청을 받았어요! 😊",
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `📬 <새로운 리뷰 요청이 도착했어요! 가능한 빠르게 리뷰에 참여해 주세요:@here`
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*${repoName}:*\n<${url}|${encodeText(title)}>`
                    }
                },
                ...labels.length ? [{
                    type: "actions",
                    elements: labels.map(({name}) => ({
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: name
                        },
                        ...name === D0 ? {style: "danger"} : {}
                    }))
                }] : [],
                ...d0exists ? [{
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*🚨 \`${D0}\` PR로 매우 긴급한 PR입니다! 지금 바로 리뷰에 참여해 주세요! 🚨*`
                    }
                }] : [],
                {
                    type: "divider"
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: "💪 코드 리뷰는 코드 품질을 향상시키고, 버그를 줄이며, 팀원 간의 지식 공유와 협업을 촉진하는 핵심 프로세스입니다.\n🙏 적극적인 참여와 의견을 부탁드립니다."
                        }
                    ]
                }
            ]
        }
    });
};
(async () => {
    try {
        const {
            context: {
                payload: {
                    pull_request: {
                        title,
                        html_url: prUrl,
                        labels
                    },
                    sender,
                    requested_reviewer: requestedReviewer,
                    requested_team: requestedTeam,
                    repository: {
                        full_name: repoName
                    }
                }
            }
        } = github;

        core.info(`'${sender.login}' requests a pr review for ${title}(${prUrl})`);

        await sendSlack({repoName, labels, title, url: prUrl});

        core.info("Successfully sent");
        core.notice("Successfully sent");
    } catch (error) {
        core.setFailed(error.message);
    }
})();
