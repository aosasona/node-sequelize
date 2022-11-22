import {Sequelize} from "sequelize";

export default class Database {
    private readonly instance: Sequelize | null = null;

    public constructor() {
        this.instance = new Sequelize({
            dialect: "sqlite",
            storage: "../database.sqlite",
        })
    }

    public getInstance(): Sequelize {
        return <Sequelize>this.instance;
    }

    public async closeConnection(): Promise<void> {
        await this.instance!.close();
    }
}