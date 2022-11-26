.PHONY: migrate
migrate:
	@echo "Migrating database..."
	npx sequelize-cli db:migrate
	@echo "Database migrated."

undo-migrate:
	@echo "Undoing migration..."
	npx sequelize-cli db:migrate:undo
	@echo "Migration undone."

start-prod:
	@echo "Removing old dist folder..."
	@rm -rf dist
	@echo "Compiling typescript and starting..."
	@NODE_ENV=production npm run start:prod

start-dev:
	@echo "Starting server in development mode..."
	NODE_ENV=development npm run start:dev
	@echo "Server started."

clean-dist:
	@echo "Removing old dist folder..."
	@rm -rf dist