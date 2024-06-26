import "dotenv/config";

class EnvironmentVariableManager {
	public readonly NODE_ENV = process.env.NODE_ENV || "development"; // 배포 환경

	public readonly PORT = process.env.PORT || 8000
	public readonly SECRET = process.env.SECRET || "SECRET"

	public readonly GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ""

	public readonly NODE_APP_INSTANCE: number = isNaN(Number(process.env.NODE_APP_INSTANCE)) ? 0 : Number(process.env.NODE_APP_INSTANCE) // 해당 인스턴스 번호
	public readonly SLACK_BOT_TOKEN: string = process.env.SLACK_BOT_TOKEN || "invalid"
	public readonly MUTE_LOG_MORGAN: boolean = !!process.env.MUTE_LOG_MORGAN || false

	public readonly MONGO_DB_URI: string = process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/siso_database"

}

const EVM = new EnvironmentVariableManager()

export default EVM
