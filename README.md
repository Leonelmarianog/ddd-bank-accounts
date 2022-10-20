# DDD - Bank Accounts

Sample project where I implement DDD practices.

Based on [this repo](https://github.com/tugcekonuklar/account-service) from [Tugce Konuklar](https://github.com/tugcekonuklar).

## Tech stack

- NestJS as backend framework.
- TypeORM as ORM.
- SQLite as database.
- ESlint to enforce code quality rules.
- Prettier as code formatter.
- Jest and Supertest for Unit and Integration testing.

## Project setup

1. Copy and paste the contents of `.env.dist` into a `.env` file in the root directory. Values are already given but they can be modified if you like.
2. Run `npm install` to install all the require depedencies.

Now the project is ready to go and can be started by running `npm run start:dev`.

## Useful commands

- `npm run db:drop` - Drop database tables.
- `npm run db:sync` - Synchronize Typeorm entities with database.
- `npm run db:fixtures` - Insert test data into database (fixtures are located in `/data/fixtures`).

## Tests

- `npm run tests:e2e` - Run Integration tests.
- `npm run test` - Run Unit tests.

## References

- [Hexagonal (Ports & Adapters) Architecture Blog Post by Tugce Konuklar](https://medium.com/idealo-tech-blog/hexagonal-ports-adapters-architecture-e3617bcf00a0)
- [Hexagonal Architecture demystified by Zvonimir Spajic](https://madewithlove.com/blog/software-engineering/hexagonal-architecture-demystified/)
- [Mike Mogosanu's Blog Posts on DDD](http://blog.sapiensworks.com/tags.html)
- [Martin Fowler](https://martinfowler.com/) blog posts.
