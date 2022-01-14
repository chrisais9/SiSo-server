import "dotenv/config";

class EnvironmentVariableManager {
	public readonly PORT = process.env.PORT || 8000;
	public readonly SECRET = process.env.SECRET || "SECRET";
}

const EVM = new EnvironmentVariableManager();
export default EVM;
