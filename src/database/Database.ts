export default abstract class Database {
  public abstract connect(): void;
  public abstract disconnect(): void;
}