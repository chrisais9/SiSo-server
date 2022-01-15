import "dotenv/config";

class EnvironmentVariableManager {
	public readonly PORT = process.env.PORT || 8000
	public readonly SECRET = process.env.SECRET || "SECRET"

	public readonly NODE_APP_INSTANCE: number = isNaN(Number(process.env.NODE_APP_INSTANCE)) ? 0 : Number(process.env.NODE_APP_INSTANCE) // 해당 인스턴스 번호
}

const EVM = new EnvironmentVariableManager()

export default EVM
