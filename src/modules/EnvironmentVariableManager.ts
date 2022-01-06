import "dotenv/config";

class EnvironmentVariableManager {
	public readonly PORT = process.env.PORT || 8000;
}

const EVM = new EnvironmentVariableManager();
export default EVM;
