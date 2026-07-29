help:
	@echo "Available commands:"
	@echo "make install"
	@echo "make start"
	@echo "make stop"
	@echo "make migrate name=<name>  # Run prisma migrate dev with a name"

install:
	npm install

	
start:
	cd cmd && node main.js

	
stop:
	pkill -f node

migrate:
	npx prisma migrate dev --name $(name)

migrate-dev:
	npx prisma migrate dev --name $(ARGS)

