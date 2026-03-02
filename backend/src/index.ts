import app from "./core/server";
import config from "./core/config";

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});