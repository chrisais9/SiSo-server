/**
 * @author KooHyongMo
 * @email chrisais9@playground.party
 * @create date 2022-01-15
 * @modify date 2022-01-15
 */

import { WebClient } from "@slack/web-api";
import EVM from "./EnvironmentVariableManager";

class SlackManager {

    private webClient = new WebClient(EVM.SLACK_BOT_TOKEN)

    /**
     * @description dev_server 채널에 간단하게 보내기
     * @param text 내용
     */
    async sendSimpleMessage(text: string) {
        return await this.webClient.chat.postMessage({
            text,
            mrkdwn: true,
            channel: "#dev_server",
        });
    }
}

export default new SlackManager();