import "dotenv/config";

class EnvironmentVariableManager {
	public readonly NODE_ENV = process.env.NODE_ENV || "development"; // 배포 환경

	public readonly PORT = process.env.PORT || 8000
	public readonly SECRET = process.env.SECRET || "SECRET"

	public readonly NODE_APP_INSTANCE: number = isNaN(Number(process.env.NODE_APP_INSTANCE)) ? 0 : Number(process.env.NODE_APP_INSTANCE) // 해당 인스턴스 번호

	public readonly SLACK_BOT_TOKEN: string = process.env.SLACK_BOT_TOKEN || "invalid"
	public readonly MUTE_LOG_MORGAN: boolean = !!process.env.MUTE_LOG_MORGAN || false
}

const EVM = new EnvironmentVariableManager()

export default EVM
